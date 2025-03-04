const express = require('express');
const { GetHomePage, GetAccount, GetAbout, GetCart,
    GetCheckout, GetContact, GetError, GetFaqs, GetShop, SearchShop,
    GetSinglePr, GetThanks, GetWish, SessionHomePage,
    PostOrder, PostAd_Prod, AdminPage, GetReport, GetOrder, GetProd, GetCustomer, EditUser_Info, Logout,
    PostUser, PostProd,
    EditProd, DeleteProd, EditUser, DeleteUser } = require('../controllers/HomeController');

const router = express.Router();
router.get('/', GetHomePage);
router.get('/about', GetAbout);
router.get('/account', GetAccount);
router.post('/loginSC', SessionHomePage);
router.get('/cart', GetCart);
router.get('/checkout', GetCheckout);
router.get('/contact', GetContact);
router.get('/error', GetError);
router.get('/faqs', GetFaqs);
router.get('/shop', GetShop);
router.get('/search', SearchShop);
router.post('/search', SearchShop);
router.get('/single-product', GetSinglePr);
router.get('/thank-you', GetThanks);
router.get('/wishlist', GetWish);
router.post('/account-edit', EditUser_Info)
router.get('/logout', Logout)

router.get('/add_Order', PostOrder);
router.get('/add_Prod', PostAd_Prod);
router.get('/Home', AdminPage);
router.get('/Report', GetReport);
router.get('/Order', GetOrder);
router.get('/Product', GetProd);
router.get('/Customer', GetCustomer);

router.post('/', PostUser);
router.post('/product', PostProd);
router.get('/productE', EditProd);
router.get('/delete_Prod', DeleteProd);
router.get('/userE', EditUser);
router.get('/delete_User', DeleteUser);

module.exports = router;