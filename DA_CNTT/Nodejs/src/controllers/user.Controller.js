const userService = require("../services/user.Service");

exports.changeRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body;
        const user = await userService.Changerole(id, role);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Role updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.GetAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.GetById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.updateAvatar = async (req, res) => {
    try {
        const id = req.params.id;
        const { avatar } = req.body;
        const user = await userService.updateAvatar(id, avatar);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Avatar updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}   