var ll=new LazyLoad({elements_selector:".lazy"});window.addEventListener("hashchange",function(e){e.preventDefault();const o=location.hash.substr(1),s=document.querySelector(`.${o}`).offsetTop-60;window.scrollTo({top:s,left:0,behavior:"smooth"})}),document.addEventListener("wheel",()=>{window.scrollY>50?document.querySelector(".nav").classList.add("nav-scrolled"):document.querySelector(".nav").classList.remove("nav-scrolled")},{capture:!1,passive:!0}),$(function(){console.log("載入"),$(".judge__nav").slick({centerMode:!0,centerPadding:"20px",slidesToShow:5,slidesToScroll:1,asNavFor:".judge__gallery",autoplay:!0,dots:!1,focusOnSelect:!0,responsive:[{breakpoint:480,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!1}}]}),$(".judge__gallery").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".judge__nav"});new Typed("#typed",{strings:["你知道嗎？<br>拖延...<br><br>可以拯救世界喔"],typeSpeed:120,backSpeed:50,loop:!0,fadeOut:!0})});