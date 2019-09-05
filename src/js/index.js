
// 檢查瀏覽器是否支援 webp
!function (e) { "use strict"; function s(s) { if (s) { var t = e.documentElement; t.classList ? t.classList.add("webp") : t.className += " webp", window.sessionStorage.setItem("webpSupport", !0) } } !function (e) { if (window.sessionStorage && window.sessionStorage.getItem("webpSupport")) s(!0); else { var t = new Image; t.onload = t.onerror = function () { e(2 === t.height) }, t.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA" } }(s) }(document);

// lazy load
(function () {
  var ll = new LazyLoad({
    elements_selector: ".lazy",
  });
})();

// 選單滑動
window.addEventListener("hashchange", function (event) {
  event.preventDefault();
  const url = location.hash.substr(1);
  const target = document.querySelector(`.${url}`).offsetTop - 60;
  window.scrollTo({
    top: target,
    left: 0,
    behavior: 'smooth' // => 滑動效果
  });
});


/*
  nav 縮小
  from: https://benmarshall.me/attaching-javascript-handlers-to-scroll-events/
  */
document.addEventListener('wheel', () => {
  if (window.scrollY > 50) {
    document.querySelector('.nav').classList.add('nav-scrolled')
  } else {
    document.querySelector('.nav').classList.remove('nav-scrolled')
  }
}, { capture: false, passive: true })

$(function(){
  console.log('載入');

  $('.judge__nav').slick({
    centerMode: true,
    centerPadding: '20px',
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.judge__gallery',
    autoplay: true,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }
    ]
  });

  $('.judge__gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.judge__nav'
  });

  const typed3 = new Typed('#typed', {
    strings: ['你知道嗎？<br>拖延...<br><br>可以拯救世界喔'],
    typeSpeed: 120,
    backSpeed: 50,
    loop: true,
    fadeOut: true,
  });
  
});

