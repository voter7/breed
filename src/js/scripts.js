"use strict";


window.addEventListener('DOMContentLoaded', () => {


/////////////////mobile-menu////////////////

    let header = document.querySelector('header');
    let mainMenu = document.querySelector('.main-menu');
    let mobileMenuHeight = mainMenu.offsetHeight;  
    let mobileMenu = document.querySelector('#burger_menu');
    let __widthMobileTabletMiddle = 768;
    let __isMobileTabletMiddle = window.innerWidth <= __widthMobileTabletMiddle;


    function slideToggle() {
        let head = header;
        if(__isMobileTabletMiddle && header.classList.contains('mobile-opened')) {
            header.classList.remove('mobile-opened');
            head.style.height = '60px';
        }
        else {
            header.classList.add('mobile-opened');
            head.style.height = mobileMenuHeight + 'px';
        }
    }

    mobileMenu.addEventListener('click', slideToggle);



///////////////////// slider /////////////////

    let slideIndex = 1,
        mainSlider = document.querySelector('.slider'),
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.dots'),
        dots = document.querySelectorAll('.owl-dot');

        if(slides.length) {

            function showSlide(n) {

                if (n > slides.length) {
                    slideIndex = 1;
                }
        
                if (n < 1) {
                    slideIndex = slides.length;
                }
        
                slides.forEach((item) => item.style.display = 'none');
                dots.forEach((item) => item.classList.remove('active'));
        
                slides[slideIndex - 1].style.display = 'block';
                dots[slideIndex - 1].classList.add('active');
        
            }
            showSlide(slideIndex);

            function plusSlides(n) {
                showSlide(slideIndex += n);
            }
        
            function currentSlide(n) {
                showSlide(slideIndex = n);
            }
        
            prev.addEventListener('click', function() {
                plusSlides(-1);
            });
        
            next.addEventListener('click', function() {
                plusSlides(1);
            });
        
            dotsWrap.addEventListener('click', function(event) {
                for(let i = 0; i < dots.length + 1; i++) {
                    if(event.target.classList.contains('owl-dot') && event.target == dots[i-1]) {
                        currentSlide(i);
                    }
                }
            });
        
        
            mainSlider.addEventListener('mouseover', function() {
                prev.style.opacity = '1';
                next.style.opacity = '1';
        
            });
        
            mainSlider.addEventListener('mouseout', function() {
                prev.style.opacity = '0';
                next.style.opacity = '0';
                
            });

        }


  

  

 


     
////////slider-carousel///////////////////

let position = 0;
    let slidesToShow = 3;
    let slidesToScroll = 1;
    let slider = document.querySelector('.dog-owners-slider');

 if (slider) {
      
    let track = slider.querySelector('ul');
    const items = track.querySelectorAll('li');
    let prevArrow = document.querySelector('.carousel_prev');
    let nextArrow = document.querySelector('.carousel_next');
    let itemsCount = items.length;

  
            
        if (window.innerWidth > 768) {
            slidesToShow = 3;
        } 
        if (window.innerWidth <= 768) {
            slidesToShow = 2;
        }
        if (window.innerWidth < 480) {
            slidesToShow = 1;
        }

        // console.log(slidesToShow);

        let itemWidth = slider.clientWidth / slidesToShow;
        let movePosition = slidesToScroll * itemWidth;

        // console.log(itemWidth);


        items.forEach((item)=> {                            ////задаем ширину для каждого элемента
            item.style.minWidth = `${itemWidth}px`;
        });

     

        nextArrow.addEventListener('click', () => {
            // position -= movePosition;
            const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;  //количество слайдов, которое еще не проскролено
            position -= itemsLeft > slidesToScroll ? movePosition : itemsLeft * itemWidth;
            
            setPosition();
            checkBtns();
        });

        prevArrow.addEventListener('click', () => {   
            // position += movePosition;
            const itemsLeft = Math.abs(position) / itemWidth;
            position += itemsLeft > slidesToScroll ? movePosition : itemsLeft * itemWidth;  
        
            setPosition();
            checkBtns();
        });


        let setPosition = () => {
            track.style.transform = `translateX(${position}px)`;
        };

        let checkBtns = () => {

            prevArrow.disabled = position === 0;
            nextArrow.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
            
            if (prevArrow.disabled) {
                prevArrow.style.opacity= 0.1;
            } else {
                prevArrow.style.opacity = 0.5;
            }
            if (nextArrow.disabled) {
                nextArrow.style.opacity= 0.1;
            } else {
                nextArrow.style.opacity = 0.5;
            }      
        };

        checkBtns();
 }
    

    
    ///////////////soc-link///////////////////////

    let socLink = document.querySelectorAll('.social > li > a');

    // console.log(socLink);

    for(let i = 0; i < socLink.length; i++) {
        socLink[i].addEventListener('click', function(e) {
            e.preventDefault();
            let $shares = document.createElement('div.social-link');                    
            let url = $shares.getAttribute('data-share-url');
            let title = $shares.getAttribute('data-share-title');
            let image = $shares.getAttribute('data-share-image');
            let description = $shares.getAttribute('data-share-description');
            let apiUrl = this.getAttribute('data-api-url');

            let width = 640;
            let height = 480;

            let top = (screen.height - height)/2, 
            left = (screen.width - width)/2;

            if (top < 0) {
                top = 0;
            } 

            if (left < 0) {
                left = 0;
            }        
            apiUrl = apiUrl.split('%url%').join(url).split('%title%').join(title).split('%image%').join(image).split('%description%').join(description);
            window.open(apiUrl, title, 'width='+ width +', height='+ height +', top= '+ top +', left='+ left +', status=no,toolbar=no,menubar=no');
        });
    }




    /////////animation//////////////

    const animItems = document.querySelectorAll('.animate-items');

    if (animItems.length > 0) {                    
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;  
                const animItemOffset = offset(animItem).top;  
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;   //высота окна минус 1/4 высоты элемента


                if(animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if(!animItem.classList.contains('animate-no-hide')) {
                        animItem.classList.remove('active');
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(); //возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;             
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;              
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft};

        }

        setTimeout(() => {
            animOnScroll();
        }, 300);

        
    }


});