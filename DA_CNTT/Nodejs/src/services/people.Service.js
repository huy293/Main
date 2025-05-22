const {People} = require('../models');

exports.GetAll = async () => {
    return await People.findAll();
}
exports.GetById = async (id) => {
    return await People.findByPk(id);
}
exports.Create = async (PersonData) => {
    const Person = await People.create(PersonData);
    return Person;
}
exports.Update_Profile = async (id, profile_url) => {
    const Person = await People.findByPk(id);
    if (!Person) return null;
    await Person.update({ profile_url });
    return Person;
}
exports.Update = async (id, PersonData) => {
    const Person = await People.findByPk(id);
    if (!Person) return null;
    await Person.update(PersonData);
    return Person;
}
exports.Delete = async (id) => {
    const Person = await People.findByPk(id);
    if (!Person) return null;
    await Person.destroy();
    return Person;
}