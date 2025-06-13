const userService = require("../services/user.Service");
const { User, Permission } = require('../models');
const bcrypt = require('bcryptjs');
const { generateRandomPassword } = require('../utils/password');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Log } = require("../models");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads/avatars');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif)'));
        }
    }
}).single('avatar');

exports.changeRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body;
        const user = await userService.Changerole(id, role);
        if (!user) return res.status(404).json({ message: "User not found" });
        await Log.create({
            userId: req.user.id,
            action: `Thay đổi role cho user ${req.params.userId}: ${JSON.stringify(req.body)}`,
            time: new Date()
        });
        res.status(200).json({ message: "Role updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'user' },
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: {
                role: {
                    [Op.in]: ['admin', 'moderator']
                }
            },
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error in getAllAdmins:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách admin' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
    }
};

exports.updateAvatar = async (req, res) => {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'Kích thước file quá lớn. Giới hạn là 5MB' });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            // Kiểm tra quyền: chỉ cho phép admin hoặc chính user đó cập nhật
            if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
                return res.status(403).json({ message: 'Không có quyền cập nhật avatar' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Vui lòng chọn file ảnh' });
            }

            // Delete old avatar if exists
            if (user.avatar) {
                const oldAvatarPath = path.join(__dirname, '../../', user.avatar);
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath);
                }
            }

            // Update avatar path in database
            const avatarPath = `/uploads/avatars/${req.file.filename}`;
            await user.update({ avatar: avatarPath });
            
            res.status(200).json({ 
                message: 'Cập nhật avatar thành công',
                avatar: avatarPath
            });
        } catch (error) {
            console.error('Error in updateAvatar:', error);
            // Delete uploaded file if there was an error
            if (req.file) {
                const filePath = path.join(uploadsDir, req.file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            res.status(500).json({ message: 'Lỗi khi cập nhật avatar' });
        }
    });
};

exports.toggleLockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Không thể khóa tài khoản admin' });
        }

        const newStatus = user.status === 'active' ? 'locked' : 'active';
        await user.update({ status: newStatus });
        await Log.create({
            userId: req.user.id,
            action: `${newStatus === 'locked' ? 'Khóa' : 'Mở khóa'} tài khoản user ${user.id} (${user.email})`,
            time: new Date()
        });
        res.status(200).json({ 
            message: newStatus === 'active' ? 'Đã mở khóa người dùng' : 'Đã khóa người dùng',
            status: newStatus
        });
    } catch (error) {
        console.error('Error in toggleLockUser:', error);
        res.status(500).json({ message: 'Lỗi khi thay đổi trạng thái người dùng' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Kiểm tra quyền: chỉ cho phép admin hoặc chính user đó cập nhật
        if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
            return res.status(403).json({ message: 'Không có quyền cập nhật thông tin' });
        }

        await user.update({ username });

        // Nếu là admin thì ghi log
        if (req.user.role === 'admin') {
            await Log.create({
                userId: req.user.id,
                action: `Admin cập nhật thông tin user ${user.id} (${user.email}): đổi username thành "${username}"`,
                time: new Date()
            });
        }

        res.status(200).json({ 
            message: 'Cập nhật thông tin thành công',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Error in updateUser:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật thông tin' });
    }
};
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
      limit: 100
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy log" });
  }
};
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findOne({ where: { userId: req.params.userId } });
    res.json(permissions || {});
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy phân quyền" });
  }
};
exports.updatePermissions = async (req, res) => {
  try {
    const perm = await userService.updatePermissions(req.params.userId, req.body);

    // Ghi log khi cập nhật phân quyền
    await Log.create({
      userId: req.user.id,
      action: `Cập nhật phân quyền chi tiết cho user ${req.params.userId}: ${JSON.stringify(req.body)}`,
      time: new Date()
    });

    res.json(perm);
  } catch (err) {
    res.status(500).json({ message: "Không thể cập nhật phân quyền" });
  }
};