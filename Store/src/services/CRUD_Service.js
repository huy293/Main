
const { raw } = require('body-parser');
const db = require('../models/index');
const userService = require('../services/userService');
const { Op } = require('sequelize');
class CRUD_Service {
    constructor() {
        if (CRUD_Service.instance) {
            return CRUD_Service.instance;
        }
        CRUD_Service.instance = this;

        this.create_User = async (data) => {
            return new Promise(async (resovle, reject) => {
                try {
                    let hashPasswordbyBCRYPT = await userService.hashPassword(data.password);
                    await db.User.create({
                        fullname: data.fullname,
                        email: data.email,
                        password: hashPasswordbyBCRYPT,
                    })
                    resovle('Create User succeeded')
                } catch (e) {
                    reject(e);
                };
            });
        };
        this.getAllUser = () => {
            return new Promise(async (resovle, reject) => {
                try {
                    let users = db.User.findAll({
                        raw: true,
                    });
                    resovle(users);
                } catch (e) {
                    reject(e);
                };
            });
        }
        this.getAllUserEmails = () => {
            return new Promise(async (resovle, reject) => {
                try {
                    const users = await db.User.findAll({ raw: true });
                    const useremails = users.map(user => user.email);
                    resovle(useremails);
                } catch (e) {
                    reject(e);
                }
            });
        };
        this.getUserById = (userId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let user = await db.User.findByPk(userId, {
                        raw: true,
                    });
                    resolve(user);
                } catch (e) {
                    reject(e);
                }
            });
        };

        // Hàm cập nhật thông tin người dùng
        this.updateUser = (userId, userData) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let user = await db.User.findByPk(userId);
                    if (user) {
                        await user.update(userData);
                        resolve(user);
                    } else {
                        reject("User not found");
                    }
                } catch (e) {
                    reject(e);
                }
            });
        };

        // Hàm xóa người dùng
        this.deleteUser = (userId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let user = await db.User.findByPk(userId, {
                        raw: true,
                    });
                    if (user) {
                        await user.destroy();
                        resolve("User deleted successfully");
                    } else {
                        reject("User not found");
                    }
                } catch (e) {
                    reject(e);
                }
            });
        };

        // Hàm tìm kiếm người dùng theo từ khóa
        this.searchUsers = (keyword) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let users = await db.User.findAll({
                        raw: true,
                        where: {
                            [Op.or]: {
                                name: {
                                    [Op.like]: `%${keyword}%`,
                                },
                                email: {
                                    [Op.like]: `%${keyword}%`,
                                },
                            },
                        },
                    });
                    resolve(users);
                } catch (e) {
                    reject(e);
                }
            });
        };

        // Hàm xác thực thông tin người dùng
        this.findUserByEmail = (email) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let user = await db.User.findOne({
                        raw: true,
                        where: {
                            email: email,
                        },
                    });
                    resolve(user);
                } catch (e) {
                    reject(e);
                }
            });
        };


        this.getAllProduct = () => {
            return new Promise(async (resovle, reject) => {
                try {
                    let prod = db.Product.findAll({
                        raw: true,
                    });
                    resovle(prod);
                } catch (e) {
                    reject(e);
                };
            });
        };
        this.getProductById = (productId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let product = await db.Product.findByPk(productId, {
                        raw: true,
                    });
                    resolve(product);
                } catch (e) {
                    reject(e);
                }
            });
        };
        this.createProduct = (productData) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let product = await db.Product.create(productData, {
                        raw: true,
                    });
                    resolve(product);
                } catch (e) {
                    reject(e);
                }
            });
        };

        this.updateProduct = (productId, productData) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let product = await db.Product.findByPk(productId);
                    if (product) {
                        await product.update(productData);
                        resolve(product);
                    } else {
                        reject("Product not found");
                    }
                } catch (e) {
                    reject(e);
                }
            });
        };
        this.deleteProduct = (productId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let product = await db.Product.findByPk(productId, { raw: true, });
                    if (product) {
                        await product.destroy();
                        resolve("Product deleted successfully");
                    } else {
                        reject("Product not found");
                    }
                } catch (e) {
                    reject(e);
                }
            });
        };
        this.searchProducts = (keyword, minPrice, maxPrice) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let products = await db.Product.findAll({
                        raw: true,
                        where: {
                            [Op.or]: {
                                nameProduct: {
                                    [Op.like]: `%${keyword}%`,
                                },
                                categories: {
                                    [Op.like]: `%${keyword}%`,
                                },
                                tags: {
                                    [Op.like]: `%${keyword}%`,
                                },
                                brands: {
                                    [Op.like]: `%${keyword}%`,
                                },
                                price: {
                                    [Op.between]: [minPrice, maxPrice], // Điều kiện tìm kiếm theo giá
                                },
                            },
                        },
                    });
                    resolve(products);
                } catch (e) {
                    reject(e);
                }
            });
        };
        this.createCart = (cartData) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const cart = await db.Cart.create(cartData, {
                        raw: true,
                    });
                    resolve(cart);
                } catch (error) {
                    reject(error);
                }
            });
        };
        this.getAllCartByUser = async (userId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let cart = await db.Cart.findAll({
                        where: {
                            userId: userId,
                        }
                    });
                    resolve(cart);
                } catch (e) {
                    reject(e);
                }
            });
        };
    }
}
const singletonInstance = new CRUD_Service();
module.exports = singletonInstance;