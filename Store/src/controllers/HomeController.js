const CRUD_Service = require('../services/CRUD_Service')

const HomePageFactory = {
    create: async (userId) => {
        let data = await CRUD_Service.getAllProduct();
        const dataCart = [];
        let totalQuantity = 0;
        const productNames = [];
        let SumTotalPrice = 0;
        if (userId != 0) {
            const cart = await CRUD_Service.getAllCartByUser(userId);
            const caculator = calculateProductQuantity(JSON.stringify(cart));

            for (const productId in caculator) {
                const number = caculator[productId];
                const cartItem = { productId, number };
                dataCart.push(cartItem);
                totalQuantity += number;
            }
            // Lấy tên sản phẩm dựa vào productId trong dataCart
            for (const cartItem of dataCart) {
                const productId = cartItem.productId;
                const number = cartItem.number;
                const product = await CRUD_Service.getProductById(productId);
                if (product) {
                    const productName = product.nameProduct;
                    const totalPrice_product = parseInt(product.price) * number;
                    const information = { productName, totalPrice_product }
                    productNames.push(information);
                    SumTotalPrice += totalPrice_product;
                }
            }
        }
        return {
            dataProd: data,
            dataCart: dataCart,
            total: totalQuantity,
            productNames: productNames,
            SumTotalPrice: SumTotalPrice,
        };
    }
};

function calculateProductQuantity(cartListJson) {
    const cartList = JSON.parse(cartListJson);
    const productQuantityMap = {};

    for (const cart of cartList) {
        const productId = cart.ProductId;
        const number = cart.number;

        if (productId in productQuantityMap) {
            productQuantityMap[productId] += number;
        } else {
            productQuantityMap[productId] = number;
        }
    }

    return productQuantityMap;
}

const GetHomePage = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('index-2.ejs', homePageData);
}

const SessionHomePage = async (req, res) => {
    if (req.body.email) {
        req.session.authenticated = true;
    }
    let user = await CRUD_Service.findUserByEmail(req.body.email);
    req.session.user = user;
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('index-2.ejs', homePageData);
}
const PostUser = async (req, res) => {
    if (req.body.email) {
        req.session.authenticated = true;
    }
    let user = await CRUD_Service.create_User(req.body);
    req.session.user = user;
    let userId = 0;
    if (req.session.authenticated) {
        userId = req.session.user.id;
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('index-2.ejs', homePageData);
}
const GetAccount = async (req, res) => {
    if (req.session.authenticated) {
        let userId = req.session.user.id;
        const homePageData = await HomePageFactory.create(userId);
        return res.render('account_user.ejs', {
            dataUser: req.session.user,
            homePageData: homePageData,
        });
    } else {
        let userId = 0;
        const homePageData = await HomePageFactory.create(userId);
        return res.render('account.ejs', homePageData);
    }
}

const Logout = async (req, res) => {
    req.session.authenticated = false;
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('account.ejs', homePageData);
}
const GetAbout = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('about.ejs', homePageData);
}
const GetCart = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('cart.ejs', homePageData);
}
const GetCheckout = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('checkout.ejs', homePageData);
}
const GetContact = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('contact.ejs', homePageData);
}
const GetError = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('error.ejs', homePageData);
}
const GetFaqs = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('faqs.ejs', homePageData);
}

function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        if (endIndex < model.length)
            results.next = {
                page: page + 1,
                limit: limit
            }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.totalPage = {
            total: Math.ceil(model.length / limit),
            page: page,
            limit: limit
        };
        results.results = model.slice(startIndex, endIndex);
        res.paginatedResults = results;
        next();
    }
}
const GetShop = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    let data = await CRUD_Service.getAllProduct();
    const homePageData = await HomePageFactory.create(userId);
    paginatedResults(data)(req, res, async () => {
        return res.render('shop.ejs', {
            dataProd: res.paginatedResults.results,
            dataPage: res.paginatedResults,
            homePageData: homePageData
        });
    });
}
const SearchShop = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    let data = await CRUD_Service.searchProducts(req.query.searchKeyword, req.query.min, req.query.max);
    if (req.body.searchKeyword) {
        data = await CRUD_Service.searchProducts(req.body.searchKeyword, req.query.min, req.query.max);
    }
    const homePageData = await HomePageFactory.create(userId);
    paginatedResults(data)(req, res, async () => {
        return res.render('shop.ejs', {
            dataProd: res.paginatedResults.results,
            dataPage: res.paginatedResults,
            homePageData: homePageData
        });
    });
}
const GetSinglePr = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    let data = await CRUD_Service.getProductById(req.query.id);
    const homePageData = await HomePageFactory.create(userId);
    return res.render('single-product.ejs', {
        dataProd: data,
        homePageData: homePageData
    });
}

const GetThanks = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('thank-you.ejs', homePageData);
}
const GetWish = async (req, res) => {
    let userId = 0;
    if (req.session.authenticated) {
        userId = parseInt(req.session.user.id);
    }
    const homePageData = await HomePageFactory.create(userId);
    return res.render('wishlist.ejs', homePageData);
}
const EditUser_Info = async (req, res) => {
    let userId = req.session.user.id;
    let data = await CRUD_Service.updateUser(userId, req.body);
    req.session.user = data;
    const homePageData = await HomePageFactory.create(userId);
    return res.render('account_user.ejs', {
        dataUser: req.session.user,
        homePageData: homePageData,
    });
}


// Đăng ký

const PostProd = async (req, res) => {
    await CRUD_Service.createProduct(req.body);
    let data = await CRUD_Service.getAllProduct();
    return res.render('AD-table-data-product.ejs', {
        dataProd: data
    });
}
const EditProd = async (req, res) => {
    let id = req.query.id;
    await CRUD_Service.updateProduct(id, req.query);
    let data = await CRUD_Service.getAllProduct();
    return res.render('AD-table-data-product.ejs', {
        dataProd: data
    });
}
const DeleteProd = async (req, res) => {
    await CRUD_Service.deleteProduct(req.query.id);
    let data = await CRUD_Service.getAllProduct();
    return res.render('AD-table-data-product.ejs', {
        dataProd: data
    });
}
const EditUser = async (req, res) => {
    let id = req.query.id;
    await CRUD_Service.updateUser(id, req.query);
    let data = await CRUD_Service.getAllUser();
    return res.render('AD-table-data-table.ejs', {
        dataUser: data
    });
}
const DeleteUser = async (req, res) => {
    await CRUD_Service.deleteUser(req.query.id);
    let data = await CRUD_Service.getAllUser();
    return res.render('AD-table-data-table.ejs', {
        dataUser: data
    });
}

const PostOrder = (req, res) => {
    return res.render('AD-form-add-order.ejs')
}
const PostAd_Prod = (req, res) => {
    return res.render('AD-form-add-product.ejs')
}
const AdminPage = (req, res) => {
    return res.render('AD-index.ejs')
}
const GetReport = (req, res) => {
    return res.render('AD-Report.ejs')
}
const GetOrder = (req, res) => {
    return res.render('AD-table-data-order.ejs')
}
const GetProd = async (req, res) => {
    let data = await CRUD_Service.getAllProduct();
    return res.render('AD-table-data-product.ejs', {
        dataProd: data
    });
}
const GetCustomer = async (req, res) => {
    let data = await CRUD_Service.getAllUser();
    return res.render('AD-table-data-table.ejs', {
        dataUser: data
    });
}
module.exports = {
    GetHomePage, GetAccount, GetAbout, GetCart, SessionHomePage,
    GetCheckout, GetContact, GetError, GetFaqs, GetShop, SearchShop,
    GetSinglePr, GetThanks, GetWish,
    PostOrder, PostAd_Prod, AdminPage, GetReport, GetOrder, GetProd, GetCustomer, EditUser_Info, Logout,
    PostUser, PostProd,
    EditProd, DeleteProd, EditUser, DeleteUser
}