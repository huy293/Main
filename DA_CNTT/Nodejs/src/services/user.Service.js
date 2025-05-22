const {User} = require('../models');

exports.Changerole = async (id, role) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update({ role });
    return user;
  }

exports.GetAll = async () => {
    return await User.findAll();
}
exports.GetById = async (id) => {
    return await User.findByPk(id);
}
exports.updateAvatar = async (id, avatar) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update({ avatar });
    return user;
}