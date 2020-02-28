const header = document.querySelector('header');
const body = document.querySelector('body');
const filmLink = document.querySelector('#filmmaking');
const devLink = document.querySelector('#development');
const aboutLink = document.querySelector('#about-link');
const contactLink = document.querySelector('#contact-link');
const devFlyOutLink = document.querySelector('#development-flyout');
const filmFlyOutLink = document.querySelector('#filmmaking-flyout');
const aboutFlyOutLink = document.querySelector('#about-link-flyout');
const contactFlyOutLink = document.querySelector('#contact-link-flyout');
const flyOutMenu = document.querySelector('.flyout-menu');
const filmPortal = document.querySelector('#film-portal-wrap');
const devPortal = document.querySelector('#dev-portal-wrap');
const mainPortal = document.querySelector('main');
const aboutPortal = document.querySelector('#about-portal');
const contactPortal = document.querySelector('#contact-portal');
const footer = document.querySelector('footer');
const email = document.querySelector('#email');
const slideShowArray = Array.from(document.querySelector('#slideshow').children);
const filmVidAll = Array.from(filmPortal.querySelectorAll('video'));
const filmVidBg = filmPortal.querySelector('#film-video-bg');
const loading = document.querySelector('.loader-container');
const hamMenu = document.querySelector('.ham-menu-click');

hamMenu.addEventListener('click', () => {
    const hamChildren = Array.from(hamMenu.children);
    if(hamChildren[0].classList.contains("testHam0")){
        hamChildren.forEach((span, idx) => {
            span.classList.remove(`testHam${idx}`);
        })
    } else {
        hamChildren.forEach((span, idx) => {
            span.classList.add(`testHam${idx}`);
        })
    }
});

const linksArray = () => {
    // Get main-nav body and collect child elements
    let mainNavLinks = document.querySelector('#main-nav').children;
    let returnArr = [];
    for(let i = 0; i < mainNavLinks.length; i++){
        if(mainNavLinks[i].tagName == 'A'){
            returnArr.push(mainNavLinks[i]);
        }
    }
    return returnArr;
}

const shiftContent = (element, transX, transY, position) => {
    setTimeout(() => {
        // Scroll to top of window and then transition
        window.scrollTo(0, 0);
    });

    setTimeout(function(){
    let translate = `translateX(${transX})`;

    if(transY && transX){
        translate = `translate(${transX}, ${transY})`;
    } else if(transY){
        translate = `translate(0%, ${transY})`;
    }

    element.style.transform = translate;
    }, 250)

    if(position){
        setTimeout(function(){
            element.style.position = position;
        }, 500);
    }
}

const toggleVidAutoPlay = (portal) => {
    if(portal == "filmPortal"){
        // filmPortal.style.opacity = '1';
        setTimeout(function(){
            // Need to make this DRY
            if(filmPortal.querySelector('#film-video-bg')){
                filmPortal.querySelector('#film-video-bg').style.opacity = '1';
                filmVidBg.play();
            }
        }, 500)
    } else {
        // filmPortal.style.opacity = '0';
        setTimeout(function(){
            if(filmPortal.querySelector('#film-video-bg')){
                filmPortal.querySelector('#film-video-bg').style.opacity = '0';
            }
            filmVidAll.forEach(vid => vid.pause());
        }, 500)
    }
}

const shiftToFilm = () => {
    toggleVidAutoPlay("filmPortal");
    shiftContent(filmPortal, '0%', '0%', 'absolute');
    shiftContent(mainPortal, '-100%', '0%', 'fixed');
}

const shiftToDev = (element) => {
    toggleVidAutoPlay("mainPortal");
    shiftContent(filmPortal, '100%', '0%', 'fixed');
    shiftContent(mainPortal, '0%', '0%', 'static');
    if(element){
        setTimeout(function(){
            element.scrollIntoView();
        }, 500)
    }
}

const shiftToAbout = () => {
    // Check if on dev page - if not switch to dev then scroll
    const styles = window.getComputedStyle(mainPortal);
    // We want to check the property value from our transform property to see
    // if we are on the film page or development page
    if(styles.getPropertyValue("transform") != "matrix(1, 0, 0, 1, 0, 0)"){
        shiftToDev(aboutPortal);
    }
}

const shiftToContact = () => {
    const styles = window.getComputedStyle(mainPortal);
    if(styles.getPropertyValue("transform") != "matrix(1, 0, 0, 1, 0, 0)"){    
        shiftToDev(contactPortal);
    }
}

const handleLinking = (e, hashAdjust) => {
    e.stopPropagation();
    // This function is meant to get from dev to film.
    // aso meant to get from to dev-sub categories
    const target = e.target;
    setTimeout(() => {
        if(hashAdjust){
            this.location.hash = hashAdjust;
        }
        if(target == filmLink || this.location.hash == "#film-portal"){
            shiftToFilm();
        }
        if(target == devLink || this.location.hash == "#dev-portal"){
            shiftToDev();
        }
        if(target == aboutLink || this.location.hash == "#about-portal"){
            shiftToAbout();
        }
        if(target == contactLink || this.location.hash == "#contact-portal"){
            shiftToContact();
        }
    }, 25);
}

header.addEventListener('click', (e) => handleLinking(e));

flyOutMenu.addEventListener('click', function(e){
    if(e.target == devFlyOutLink){
        shiftToDev();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == filmFlyOutLink){
        shiftToFilm();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == aboutFlyOutLink){
        shiftToAbout();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == contactFlyOutLink){
        shiftToContact();
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
})

$('.ham-menu-click').on('click', function (e){
    e.preventDefault();
    $('.flyout-menu').toggleClass('flyout-menu-out');
});

const checkHash = () => {
    const currentHash = this.location.hash;
    setTimeout(function(){
        if(currentHash == "#about-portal") {
            aboutPortal.scrollIntoView();
        }
        if(currentHash == "#contact-portal") {
            contactPortal.scrollIntoView();
        }
    }, 20)  
}

const removeFilmBgVid = () => {
    const videoBg = document.querySelector('#film-video-bg');
    if(!videoBg) return;
    videoBg.parentNode.removeChild(videoBg);
    filmPortal.style.backgroundColor = 'black';
}

window.addEventListener('resize', (e) => {
    if(e.target.innerWidth < 565){
        removeFilmBgVid();
    }
})

window.addEventListener('load', (e) => {
    setTimeout(() => {
        container.style.opacity = "0";
        setTimeout(() => {
            container.remove();
        },500)
    }, 500)
    // handleLinking after browser load
    (() => {
        handleLinking(e)
    })(); 
    checkHash();
    if(window.innerWidth < 565){
        removeFilmBgVid() 
    }
    }
);


