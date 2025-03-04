'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Products', null, {});
        return queryInterface.bulkInsert('Products', [
            {
                nameProduct: 'Set Polo Short Creamline Brownies',
                categories: 'Áo polo',
                tags: 'Xu hướng',
                brands: 'Việt Tiến',
                color: 'Nâu',
                size: 'S, M, L, XL',
                description: '- Chất Liệu: Cotton 360GSM\n' +
                    '- Độ Co Giãn: Trung bình\n' +
                    '- Form Set: Oversize\n' +
                    '- Phong Cách: Street Style\n' +
                    '- Chi Tiết: Phối Túi',
                overview: 'Áo polo',
                information: '- Không sử dụng hóa chất tẩy.\n' +
                    '- Ủi ở nhiệt độ phù hợp, hạn chế sử dụng máy sấy.\n' +
                    '- Giặt ở chế độ bình thường, với quần áo có màu tương tự.',
                price: 700000
            },
            {
                nameProduct: 'Áo Thun Nam Gym Powerfit',
                categories: 'Áo phông',
                tags: 'Thể thao',
                brands: 'Puma',
                color: 'Trắng, Đỏ, Xanh dương, Đen, Xanh lá',
                size: 'M, L, XL, XXL',
                description: 'Thành phần: 100% Polyester\n' +
                    'Cấu trúc dệt đặc biệt: Jacquard Knitting\n' +
                    '(*) Vải Jacquard có cấu trúc các sợi liên kết với nhau rất cao, kết hợp thêm kiểu dệt Jacquard tạo ra một loại vải có chất lượng cao và tạo hiệu ứng đẹp cho mặt vải.\n' +
                    '- Bề mặt vải đẹp và lạ mắt.\n' +
                    '- Đàn hồi tốt\n' +
                    '- Co dãn tốt',
                overview: 'Áo Thun Nam',
                information: '- Không sử dụng hóa chất tẩy.\n' +
                    '- Ủi ở nhiệt độ phù hợp, hạn chế sử dụng máy sấy.\n' +
                    '- Giặt ở chế độ bình thường, với quần áo có màu tương tự.',
                img: null,
                price: 60000
            },
            {
                nameProduct: 'Áo Nike Run Stripe Jacket',
                categories: 'Áo khoác',
                tags: 'Đời thường',
                brands: 'Nike',
                color: 'Trắng, Đen',
                size: 'S, M',
                description: 'Sẽ là rất tiếc nếu bạn bỏ lỡ cơ hội sở hữu cho mình những chiếc Áo Nike Run Stripe Jacketđầy cá tính để làm phong phú tủ đồ của mình trong hôm nay. Hãy nhanh chóng lựa chọn cho mình một thiết kế áo Nike ưng ý nhất tại Sneaker Daily nhé!\r\n' +
                    '\r\n' +
                    'Cập nhật nhanh nhất lịch ra mắt của các mẫu áo mới nhất và tin tức thời trang trong nước và trên thế giới bằng cách theo dõi Sneaker Daily trên Facebook hoặc Instagram.\r\n' +
                    '\r\n' +
                    'Thông tin sản phẩm Áo Nike Run Stripe Jacket\r\n' +
                    'Thương hiệu: Nike\r\n' +
                    '\r\n' +
                    'Mã sản phẩm : CU5354-010\r\n' +
                    '\r\n' +
                    'Xuất xứ thương hiệu : Mỹ',
                overview: 'Áo Hoddies',
                information: '- Không sử dụng hóa chất tẩy.\n' +
                    '- Ủi ở nhiệt độ phù hợp, hạn chế sử dụng máy sấy.\n' +
                    '- Giặt ở chế độ bình thường, với quần áo có màu tương tự.',
                img: 'Thiet-ke-chua-co-ten-2022-09-16T183707.665.jpg.webp',
                price: 1290000
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        down: (queryInterface, Sequelize) => {
            return queryInterface.bulkDelete('Products', null, {});
        };
    }
};
