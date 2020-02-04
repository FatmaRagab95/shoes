$(document).ready(function () {

  /************* vars *************/ 
  let searchBox  = $(".search-box"),
      cart       = $('.cart-section'),
      inputMax   = $('.shop input.max'),
      max        = $('.shop span.max'),
      subTotal   = $('.check .total span'),
      grandTotal = $('.check .grand-total span'),
      shipping   = $('.check .ship span'),
      ship       = $('.check .ship span').data('ship'),
      numTax     = $('.check .tax span'),
      tax        = $('.check .tax').data('tax'),
      x          = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  /************* nav *************/
  $('.nav .toggle-btn').click(function () {
    $('.nav .naving .sublist').slideUp();
    $('.nav .naving').slideToggle();
    $('.nav').addClass('collapse-nav');
  });

  $('body').on('click', '.collapse-nav .mainlist',  function () {
    $(this).find('.sublist').slideToggle();
  });

  $(window).resize(function () {
    if ($(window).width() >= 992) {
      $('.nav .naving').css('display','flex');
      $('.nav').removeClass('collapse-nav');
    } else {
      $('.nav .naving').css('display','none')
    }
  });

  /************* search *************/ 
  $('.nav .search').click(function () {
    searchBox.addClass('active');
    $('.search-box .close-btn').click(function () {
      searchBox.removeClass('active');
    });

    setTimeout(function () {
      $('.search-box input').focus();
    },500);
  });

  /************* cart *************/
  
  // preparing an object full of cart items
  $('.content .product .overlay .options > div.to-cart').click(function (e) {
    e.preventDefault();
    let product = $(this).closest('.product'),
        that    = $(this);
        item    = {color:$(product).data('color'),
                size: $(product).data('size'),
                img:  $(product).find('img').attr('src'),
                name: $(product).find('.name').text(),
                price:$(product).find('.price span').text(),
                quantity: 1};

    $(that).removeClass('added');
    setTimeout(function () {
      $(that).addClass('added');
    },50);

    for (let i = 0; i < x.length; i++) {
      if (x[i].img != item.img && i == x.length - 1) {

        x.push(item);
        add (item.img,item.name,item.color,item.size,item.price,item.quantity);
        check ((item.quantity * item.price));
        localStorage.setItem('cart', JSON.stringify(x));
        return false;

      } else if (x[i].img == item.img) {

        x[i].quantity = x[i].quantity + 1;
        $($('.cart-table .items .item .quantity input')[i]).val(x[i].quantity);
        $($('.cart-table .items .item .total span')[i]).text(x[i].quantity * x[i].price);
        check (parseInt(x[i].price));
        localStorage.setItem('cart', JSON.stringify(x));
        return false

      }
    }

    if (x.length == 0) {

      x.push(item);
      add (item.img,item.name,item.color,item.size,item.price,item.quantity);
      check ((item.quantity * item.price));
      localStorage.setItem('cart',  JSON.stringify(x));

    }
  });

  // add to cart
  for (let i = 0; i < x.length; i++) {
    $('.content .product').find(`img[src="${x[i].img}"]`).closest('.overlay').find('.to-cart').addClass('added');
    add (x[i].img,x[i].name,x[i].color,x[i].size,x[i].price,x[i].quantity);
    check ((x[i].quantity * x[i].price));

  }

  function add (img,name,color,size,price,quantity) {
    $('.nav .naving li i .num-cart').text(x.length);
    $('.cart-section .cart-table .items').append(
      `<div class="f-row item">
        <i class="remove fa fa-times"></i>
        <div class="f-col">
          <a href="single-product.html">
            <div class="img"><img class="img-responsive" src="${img}" alt="cart-item"></div>
            <div class="details">
              <h4>${name}</h4>
              <div class="color">Color <span style="background-color:${color}"></span></div>
              <div class="size">Size<span>${size}</span></div>
            </div>
          </a>
        </div>
        <div class="f-col">
          <div class="price">$<span>${price}</span></div>
        </div>
        <div class="f-col">
          <div class="quantity">
            <input type="number" min="1" value="${quantity}" name="quantity">
          </div>
        </div>
        <div class="f-col">
          <div class="total">$<span>${quantity * price}</span></div>
        </div>
      </div>`
    );
  }

  // changing quantity
  $('.cart-table').on('change keyup', '.quantity input',  function () {

    let img      = $(this).closest('.item').find('img').attr('src'),
        price    = $(this).closest('.item').find('.price span').text(),
        quantity = $(this).val();

    if (!isNaN(quantity) && quantity > 0) {

      $(this).closest('.item').find('.total span').text(quantity * price);

      for (let i = 0; i < x.length; i++) {
        if (x[i].img == img) {
          check ((quantity - x[i].quantity) * price);
          x[i].quantity = parseInt(quantity);
          localStorage.setItem('cart', JSON.stringify(x));
        }
      }

    }
  });

  // deleting item
  $('.cart-table').on('click', '.remove', function () {

    let img   = $(this).closest('.item').find('img').attr('src'),
        total = $(this).closest('.item').find('.total span').text();

    for (let i = 0; i < x.length; i++) {
      
      $('.content .product').find(`img[src="${x[i].img}"]`).closest('.overlay').find('.to-cart').removeClass('added');

      if (x[i].img == img) {

        if ($('.content .product').find('img').attr('src') == x[i].img) {
          $(this).closest('.overlay').find('.to-cart').removeClass('added');
        }

        check (-parseInt(total));

        x.splice(i,1);

        $('.nav .naving li i .num-cart').text(x.length)

        localStorage.setItem('cart', JSON.stringify(x));

        $(this).closest('.item').slideUp(300);
        let that = $(this);
        setTimeout(function () {
          $(that).closest('.item').remove();
        }, 300);

        return false
      }

    }
  });

  // calculating the checkout price
  function check (plus = 0) {
    $(subTotal).text(parseInt($(subTotal).text()) + plus);

    if ($(subTotal).text() != 0) {
      $(numTax).text(((parseFloat($(subTotal).text()) / 100) * tax).toFixed(2));
      $(grandTotal).text( (parseFloat($(subTotal).text())
                          + parseFloat(ship)
                          + parseFloat($(numTax).text()) ).toFixed(2) );
    } else {
      $(numTax).text(0);
      $(shipping).text(0);
      $(grandTotal).text(0);
    }
  }

  // showing and closing the cart
  $('.nav .cart').click(function () {
    cart.addClass('active');
  });

  $('.cart-section .close-btn').click(function () {
    cart.removeClass('active');
  });

  /************* shop *************/ 
  $('.shop input.min').change(function () {

    $('.shop span.min').html($(this).val() + '&dollar;');
    $(inputMax).attr('min',$(this).val());

    if (parseInt($(max).html()) < $(this).val()) {
      $(max).html($(this).val() + '&dollar;')
    }

  });

  $(inputMax).change(function () {
    $(max).html($(this).val() + '&dollar;');
  });

  /************* single-product *************/
  $('.single-product .details .color').click(function () {
    let val = '.' + $(this).find('input').val();
    $('.single-product .img').removeClass('active');
    $('.single-product .img' + val).addClass('active');
    $('.single-product .details .size').removeClass('active');
    $('.single-product .details .size' + val).addClass('active');
  });

  /************* sliders *************/
  $('.sale .responsive,.suggestions .responsive').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.new-products .responsive, .popular .responsive').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.about .testi .single-item').slick({
    dots:true,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});
//# sourceMappingURL=main.js.map
