const peopleService = require('../services/people.Service');
const { Log } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const people = await peopleService.GetAll();
        return res.status(200).json(people); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const people = await peopleService.GetById(id);
        if (!people) {
            return res.status(404).json({ error: 'People not found' });
        }
        return res.status(200).json(people);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
exports.create = async (req, res) => {
    const PersonData = req.body;
    try {
        const people = await peopleService.Create(PersonData);

        // Ghi log nếu là admin
        if (req.user && req.user.role === 'admin') {
            await Log.create({
                userId: req.user.id,
                action: `Admin tạo People mới: ${JSON.stringify(PersonData)}`,
                time: new Date()
            });
        }

        return res.status(201).json(people);
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};

exports.update = async (req, res) => {
    const { id } = req.params; 
    const PersonData = req.body; 
    try {
        const people = await peopleService.Update(id, PersonData);

        // Ghi log nếu là admin
        if (req.user && req.user.role === 'admin') {
            await Log.create({
                userId: req.user.id,
                action: `Admin cập nhật People ${id}: ${JSON.stringify(PersonData)}`,
                time: new Date()
            });
        }

        return res.status(200).json(people);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params; 
    const { profile_url } = req.body; 
    try {
        const people = await peopleService.Update_Profile(id, profile_url);

        // Ghi log nếu là admin
        if (req.user && req.user.role === 'admin') {
            await Log.create({
                userId: req.user.id,
                action: `Admin cập nhật profile People ${id}: ${profile_url}`,
                time: new Date()
            });
        }

        return res.status(200).json(people);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await peopleService.Delete(id);

        // Ghi log nếu là admin
        if (req.user && req.user.role === 'admin') {
            await Log.create({
                userId: req.user.id,
                action: `Admin xóa People ${id}`,
                time: new Date()
            });
        }

        return res.status(200).json({ message: "People deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};