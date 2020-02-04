$(document).ready(function(){let t=$(".search-box"),e=$(".cart-section"),i=$(".shop input.max"),s=$(".shop span.max"),a=$(".check .total span"),n=$(".check .grand-total span"),l=$(".check .ship span"),o=$(".check .ship span").data("ship"),c=$(".check .tax span"),r=$(".check .tax").data("tax"),d=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];$(".nav .toggle-btn").click(function(){$(".nav .naving .sublist").slideUp(),$(".nav .naving").slideToggle(),$(".nav").addClass("collapse-nav")}),$("body").on("click",".collapse-nav .mainlist",function(){$(this).find(".sublist").slideToggle()}),$(window).resize(function(){$(window).width()>=992?($(".nav .naving").css("display","flex"),$(".nav").removeClass("collapse-nav")):$(".nav .naving").css("display","none")}),$(".nav .search").click(function(){t.addClass("active"),$(".search-box .close-btn").click(function(){t.removeClass("active")}),setTimeout(function(){$(".search-box input").focus()},500)}),$(".content .product .overlay .options > div.to-cart").click(function(t){t.preventDefault();let e=$(this).closest(".product"),i=$(this);item={color:$(e).data("color"),size:$(e).data("size"),img:$(e).find("img").attr("src"),name:$(e).find(".name").text(),price:$(e).find(".price span").text(),quantity:1},$(i).removeClass("added"),setTimeout(function(){$(i).addClass("added")},50);for(let t=0;t<d.length;t++){if(d[t].img!=item.img&&t==d.length-1)return d.push(item),p(item.img,item.name,item.color,item.size,item.price,item.quantity),m(item.quantity*item.price),localStorage.setItem("cart",JSON.stringify(d)),!1;if(d[t].img==item.img)return d[t].quantity=d[t].quantity+1,$($(".cart-table .items .item .quantity input")[t]).val(d[t].quantity),$($(".cart-table .items .item .total span")[t]).text(d[t].quantity*d[t].price),m(parseInt(d[t].price)),localStorage.setItem("cart",JSON.stringify(d)),!1}0==d.length&&(d.push(item),p(item.img,item.name,item.color,item.size,item.price,item.quantity),m(item.quantity*item.price),localStorage.setItem("cart",JSON.stringify(d)))});for(let t=0;t<d.length;t++)$(".content .product").find(`img[src="${d[t].img}"]`).closest(".overlay").find(".to-cart").addClass("added"),p(d[t].img,d[t].name,d[t].color,d[t].size,d[t].price,d[t].quantity),m(d[t].quantity*d[t].price);function p(t,e,i,s,a,n){$(".nav .naving li i .num-cart").text(d.length),$(".cart-section .cart-table .items").append(`<div class="f-row item">\n        <i class="remove fa fa-times"></i>\n        <div class="f-col">\n          <a href="single-product.html">\n            <div class="img"><img class="img-responsive" src="${t}" alt="cart-item"></div>\n            <div class="details">\n              <h4>${e}</h4>\n              <div class="color">Color <span style="background-color:${i}"></span></div>\n              <div class="size">Size<span>${s}</span></div>\n            </div>\n          </a>\n        </div>\n        <div class="f-col">\n          <div class="price">$<span>${a}</span></div>\n        </div>\n        <div class="f-col">\n          <div class="quantity">\n            <input type="number" min="1" value="${n}" name="quantity">\n          </div>\n        </div>\n        <div class="f-col">\n          <div class="total">$<span>${n*a}</span></div>\n        </div>\n      </div>`)}function m(t=0){$(a).text(parseInt($(a).text())+t),0!=$(a).text()?($(c).text((parseFloat($(a).text())/100*r).toFixed(2)),$(n).text((parseFloat($(a).text())+parseFloat(o)+parseFloat($(c).text())).toFixed(2))):($(c).text(0),$(l).text(0),$(n).text(0))}$(".cart-table").on("change keyup",".quantity input",function(){let t=$(this).closest(".item").find("img").attr("src"),e=$(this).closest(".item").find(".price span").text(),i=$(this).val();if(!isNaN(i)&&i>0){$(this).closest(".item").find(".total span").text(i*e);for(let s=0;s<d.length;s++)d[s].img==t&&(m((i-d[s].quantity)*e),d[s].quantity=parseInt(i),localStorage.setItem("cart",JSON.stringify(d)))}}),$(".cart-table").on("click",".remove",function(){let t=$(this).closest(".item").find("img").attr("src"),e=$(this).closest(".item").find(".total span").text();for(let i=0;i<d.length;i++)if($(".content .product").find(`img[src="${d[i].img}"]`).closest(".overlay").find(".to-cart").removeClass("added"),d[i].img==t){$(".content .product").find("img").attr("src")==d[i].img&&$(this).closest(".overlay").find(".to-cart").removeClass("added"),m(-parseInt(e)),d.splice(i,1),$(".nav .naving li i .num-cart").text(d.length),localStorage.setItem("cart",JSON.stringify(d)),$(this).closest(".item").slideUp(300);let t=$(this);return setTimeout(function(){$(t).closest(".item").remove()},300),!1}}),$(".nav .cart").click(function(){e.addClass("active")}),$(".cart-section .close-btn").click(function(){e.removeClass("active")}),$(".shop input.min").change(function(){$(".shop span.min").html($(this).val()+"&dollar;"),$(i).attr("min",$(this).val()),parseInt($(s).html())<$(this).val()&&$(s).html($(this).val()+"&dollar;")}),$(i).change(function(){$(s).html($(this).val()+"&dollar;")}),$(".single-product .details .color").click(function(){let t="."+$(this).find("input").val();$(".single-product .img").removeClass("active"),$(".single-product .img"+t).addClass("active"),$(".single-product .details .size").removeClass("active"),$(".single-product .details .size"+t).addClass("active")}),$(".sale .responsive,.suggestions .responsive").slick({dots:!0,infinite:!0,speed:300,slidesToShow:4,slidesToScroll:4,autoplay:!0,autoplaySpeed:2e3,arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(".new-products .responsive, .popular .responsive").slick({dots:!0,infinite:!0,speed:300,slidesToShow:2,slidesToScroll:2,autoplay:!0,autoplaySpeed:2e3,responsive:[{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(".about .testi .single-item").slick({dots:!0,autoplay:!0,autoplaySpeed:2e3})});