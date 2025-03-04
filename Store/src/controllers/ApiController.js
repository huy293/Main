const userService = require('../services/userService');
const CRUD_Service = require('../services/CRUD_Service')

let Api_UserLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Missing inputs parameter!'
            })
        }
        let userData = await userService.handleUserLogin(email, password);
        if (userData.errCode === 0) {
            // Đăng nhập thành công
            return res.status(200).json(userData);
        } else {
            // Đăng nhập thất bại
            return res.status(401).json(userData);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const Api_AddCart = async (req, res) => {
    req.body.userID = 12;
    if (req.session.authenticated) {
        req.body.userID = req.session.user.id;
        await CRUD_Service.createCart(req.body);
    }
    const cart = await CRUD_Service.getAllCartByUser(15)
    if (cart) {
        const updatedCart = [];

        // Lặp qua từng mục trong danh sách giỏ hàng
        for (const item of cart) {
            // Lấy thông tin sản phẩm dựa trên ProductId
            const product = await CRUD_Service.getProductById(item.ProductId);

            // Kiểm tra nếu sản phẩm tồn tại
            if (product) {
                // Cập nhật thuộc tính nameProduct của updatedItem bằng productName từ product
                item.dataValues.nameProduct = product.nameProduct;
                item.dataValues.price = product.price;
                // Thêm updatedItem vào danh sách updatedCart
                updatedCart.push(item);
            }
        }

        return res.status(200).json(updatedCart);
    }
    else {
        return res.status(401).json(cart);
    }

}
const checkEmailExists = async (email) => {

    const useremails = await CRUD_Service.getAllUserEmails();
    const existingEmails = [...useremails];
    // Kiểm tra xem email có tồn tại trong mảng existingEmails hay không
    const emailExists = existingEmails.includes(email);

    // Trả về kết quả
    return emailExists;
};
const checkEmailController = async (req, res) => {
    try {
        const { email } = req.body;
        // Thực hiện kiểm tra email tồn tại ở đây
        const emailExists = await checkEmailExists(email);
        // Trả về kết quả
        res.json({ exists: emailExists });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Failed to check email' });
    }
};

const Api_cart = async (req, res) => {
    const cart = await CRUD_Service.getAllCartByUser(1)
    res.json(cart)
}

module.exports = {
    Api_AddCart, checkEmailController, Api_UserLogin, Api_cart,
}