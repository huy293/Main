(function ($) {

  "use strict";
  // Observer Pattern
  var loginObservers = [];

  var addObserver = function (observer) {
    loginObservers.push(observer);
  };

  var notifyObservers = function (data) {
    loginObservers.forEach(function (observer) {
      observer.update(data);
    });
  };
  var handleLogin = function () {
    $("#form1").submit(async function (event) {
      event.preventDefault();
      const email = document.getElementById('exampleInputEmail2').value;
      const password = document.getElementById('inputPassword0').value;
      const check = await checkLogin(email, password);
      if (check.errCode !== 0) {
        alert(check.errMessage);
        return;
      }
      notifyObservers({ errMessage: check.errMessage });
      this.submit();
    });
  }
  var checkLogin = async (email, password) => {
    try {
      const response = await fetch('/api/check-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // Trả về true nếu email đã tồn tại và false nếu không tồn tại
      return data;
    } catch (e) {
      console.error('Error checking account:', e);
      throw new Error('Failed to check account');
    }
  }
  var loginSuccessObserver = {
    update: function (data) {
      console.log('Login successful:', data);
    }
  };

  addObserver(loginSuccessObserver);




  var passwordValidationStrategies = {
    'strong': function (password) {
      return password.length >= 8;
    },
    'medium': function (password) {
      return password.length >= 6;
    },
    'weak': function (password) {
      return password.length >= 4;
    }
  };
  var passwordValidationStrategy = passwordValidationStrategies['strong'];


  var checkE_PassWord = function () {
    $("#form2").submit(async function (event) {
      event.preventDefault();
      const email = document.getElementById('exampleInputEmail1').value;
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        alert('Email already exists. Please choose a different email.');
        return;
      }
      var password1 = $("#inputPassword1").val();
      var password2 = $("#inputPassword2").val();
      if (passwordValidationStrategy(password1)) {
        if (password1 !== password2) {
          alert("Passwords do not match!");
          return;
        }
        this.submit();
      } else {
        alert("Password is not strong enough!");
      }
    });
  }
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      // Trả về true nếu email đã tồn tại và false nếu không tồn tại
      return data.exists;
    } catch (error) {
      // Xử lý lỗi
      console.error('Error checking email:', error);
      throw new Error('Failed to check email');
    }
  };
  var changeShowPassWord = function () {
    $(".icon-eye").click(function () {
      var inputField = $(this).siblings("input[type='password']");
      var inputField1 = $(this).siblings("input[type='text']");
      var currentType = inputField.attr("type");

      if (currentType === "password") {
        inputField.attr("type", "text");
      } else {
        inputField1.attr("type", "password");
      }
    });
  }
  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // background color when scroll 
  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar.fixed-top').addClass("bg-light");
    } else {
      $('.navbar.fixed-top').removeClass("bg-light");
    }
  }

  $(window).scroll(function () {
    initScrollNav();
  });


  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }
  function addToCart() {

    // Lấy các phần tử DOM cần sử dụng
    var colorButtons = document.querySelectorAll('.btn.btn-light.fs-6.a2');
    var sizeButtons = document.querySelectorAll('.btn.btn-light.fs-6.a1');
    var quantityInput = document.getElementById('quantity');
    var addToCartButton = document.querySelector('.btn-cart');

    // Gán sự kiện click cho nút "Add to Cart"
    addToCartButton.addEventListener('click', function (event) {
      event.preventDefault();
      var id = document.querySelector('.btn-cart').getAttribute('id');
      // Lấy màu sắc được chọn
      var selectedColor = '';
      colorButtons.forEach(function (button) {
        if (button.classList.contains('active')) {
          selectedColor = button.getAttribute('data-val');
        }
      });
      // Lấy kích thước được chọn
      var selectedSize = '';
      sizeButtons.forEach(function (button) {
        if (button.classList.contains('active')) {
          selectedSize = button.getAttribute('data-value');
        }
      });

      // Lấy số lượng
      var quantity = parseInt(quantityInput.value);
      console.log("color:" + selectedColor + ", size:" + selectedSize + ", id:" + id + ", sl:" + quantity);
      // Gửi dữ liệu lên API hoặc thực hiện các xử lý khác
      fetch('/api/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ProductId: parseInt(id),
          color: selectedColor,
          size: selectedSize,
          number: quantity
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error occurred.');
          }
        })
        .then(data => {
          // Chuyển đổi đối tượng thành chuỗi JSON
          const jsonData = JSON.stringify(data);
          const dataPar = JSON.parse(jsonData);
          const dataCart = [];
          let totalQuantity = 0;
          let SumTotalPrice = 0;
          // Lặp qua các đối tượng trong mảng data
          for (let i = 0; i < dataPar.length; i++) {
            const item = dataPar[i];
            if (dataCart[item.nameProduct]) {
              // Nếu đã tồn tại, cập nhật số lượng và giá tiền tương ứng
              dataCart[item.nameProduct].number += item.number;
              dataCart[item.nameProduct].totalPrice += item.price * item.number;
            } else {
              // Nếu chưa tồn tại, tạo một mục mới cho nameProduct trong dataCart
              dataCart[item.nameProduct] = {
                nameProduct: item.nameProduct,
                number: item.number,
                totalPrice: item.price * item.number
              };
            }
            // Tính tổng totalQuantity và SumTotalPrice
            totalQuantity += item.number;
            SumTotalPrice += item.price * item.number;
          }
          const mergedDataCart = Object.values(dataCart);
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          alert('Error occurred. Please try again later.');
        });
    });
  }
  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 1;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 1) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // document ready
  $(document).ready(function () {
    checkE_PassWord();
    handleLogin();
    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      loop: true,
      slidesPerView: 3,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 30,
    });

    var large_slider = new Swiper(".product-large-slider", {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    window.addEventListener("load", (event) => {

      var $grid = $('.entry-container').isotope({
        itemSelector: '.entry-item',
        layoutMode: 'masonry'
      });

    });

    initPreloader();
    initChocolat();
    initProductQty();
    changeShowPassWord();
    addToCart();

  }); // End of a document

})(jQuery);


