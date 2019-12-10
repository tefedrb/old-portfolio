const header = document.querySelector('header');
const body = document.querySelector('body');
const filmLink = document.querySelector('.filmmaking');
const devLink = document.querySelector('.development');
const aboutLink = document.querySelector('.about-link');
const contactLink = document.querySelector('.contact-link');
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
const trainer = document.querySelector('#trainer-img');
const quadSquad = document.querySelector('#proj2');
const project1 = document.querySelector('#proj1');
const project2 = document.querySelector('#travel-buddy');
const email = document.querySelector('#email');
const headerLogoArray = Array.from(document.querySelector('header h1').children);
const headerLogoDev = document.querySelector('#logo-dev');
const headerLogoFilm = document.querySelector('#logo-film');
const headerLogoAbout = document.querySelector('#logo-about');
const headerLogoContact = document.querySelector('#logo-contact');
const slideShowArray = Array.from(document.querySelector('#slideshow').children);
const filmVidAll = Array.from(filmPortal.querySelectorAll('video'));
const filmVidBg = filmPortal.querySelector('#film-video-bg');
const loading = document.querySelector('.loader-container');

window.onload = function(){
    setTimeout(function(){
        loading.style.opacity = 0
    }, 500)
    setTimeout(function(){
        loading.parentNode.removeChild(loading)
    }, 1500)
}

const realignWindow = (positionY, duration) => {
    // Thanks to gizma.com/easing formulas and Dev Ed (youtube channel) for inspiring this function
    if(window.scrollY === positionY) return;
    const currentScroll = window.scrollY;
    let distance;  
    let startTime = null;
    const ease = (t, b, c, d) =>{
        return c*t/d + b;
    }; 

    currentScroll > positionY ? distance = (currentScroll - positionY) * -1:
    distance = positionY;

    const animation = (currentTime) =>{
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
         // To use easeInOutCubic to scroll - using window.scrollTo()
         const easeInOut = ease(timeElapsed, currentScroll, distance, duration);
         window.scrollTo(0, easeInOut);
         //base case - compare timeElapsed to duration
        if(duration > timeElapsed) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};


const linksArray = () => {
    // Get main-nav body and collect child elements
    let mainNavLinks = document.querySelector('#main-nav').children;
    let returnArr = [];
    for(let i = 0; i < mainNavLinks.length; i++){
        if(mainNavLinks[i].tagName == 'A'){
            returnArr.push(mainNavLinks[i]);
        }
    }
    return returnArr
};

const shiftContent = (element, transX, transY, position) => {
    realignWindow(0, 500);
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
        }, 500)
    }
};

const modifyHeaderLogo = (wipeClass, target, addClass) => {
    if(wipeClass) headerLogoArray.forEach(i => i.classList.remove(wipeClass));
    if(addClass) target.classList.add(addClass);
};

const portalOpacityAndVid = (portal) => {
    portal === "mainPortal" ? mainPortal.style.opacity = '1' : 
    mainPortal.style.opacity = '0';
    if(portal == "filmPortal"){
        filmPortal.style.opacity = '1';
        setTimeout(function(){
            // Need to make this DRY
            if(filmPortal.querySelector('#film-video-bg')){
                filmPortal.querySelector('#film-video-bg').style.opacity = '1';
                filmVidBg.play();
            }
        }, 500)
    } else {
        filmPortal.style.opacity = '0';
        setTimeout(function(){
            filmPortal.querySelector('#film-video-bg').style.opacity = '0';
            filmVidAll.forEach(vid => vid.pause());
        }, 500)
    }
    // portal === "aboutPortal" ? aboutPortal.style.opacity = '1' : 
    // aboutPortal.style.opacity = '0'; 
    // portal === "contactPortal" ? contactPortal.style.opacity = '1':
    // contactPortal.style.opacity = '0';
}

const shiftToFilm = () => {
    modifyHeaderLogo('logo-visible', headerLogoFilm, 'logo-visible');
    portalOpacityAndVid("filmPortal");
    shiftContent(filmPortal, '0%', '0%', 'absolute');
    shiftContent(mainPortal, '-100%', '0%', 'fixed');
    // shiftContent(aboutPortal, '0%', '100%', 'fixed');
    // shiftContent(contactPortal, '-100%', '100%', 'fixed');
};

const shiftToDev = (element) => {
    modifyHeaderLogo('logo-visible', headerLogoDev, 'logo-visible');
    portalOpacityAndVid("mainPortal");
    shiftContent(filmPortal, '100%', '0%', 'fixed');
    shiftContent(mainPortal, '0%', '0%', 'static');
    if(element){
        setTimeout(function(){
            element.scrollIntoView();
        }, 300)
    }
    // shiftContent(aboutPortal, '100%', '100%', 'fixed');
    // shiftContent(contactPortal, '0%', '100%', 'fixed');
};

const shiftToAbout = () => {
    // Check if on dev - if not switch to dev then scroll
    const styles = window.getComputedStyle(mainPortal);
    if(styles.getPropertyValue("transform") != "matrix(1, 0, 0, 1, 0, 0)"){
        shiftToDev(aboutPortal);
    }
}

const shiftToContact = () => {
    const styles = window.getComputedStyle(mainPortal);
    if(styles.getPropertyValue("transform") != "matrix(1, 0, 0, 1, 0, 0)"){    
        shiftToDev(contactPortal);
    }
};

const handleLinking = (e, hashAdjust) => {
    if(hashAdjust){
        this.location.hash = hashAdjust;
        return
    }
    if(e.target == filmLink || this.location.hash == "#film-portal"){
        shiftToFilm();
    }
    // Adding an or statement here to have the anchors present
    if(e.target == devLink || this.location.hash == "#dev-portal"){
        shiftToDev();
    }
    if(e.target == aboutLink || this.location.hash == "#about-portal"){
       shiftToAbout();
    }
    if(e.target == contactLink || this.location.hash == "#contact-portal"){
       shiftToContact();
    }
}

window.addEventListener('hashchange', handleLinking);
header.addEventListener('click', handleLinking);
window.addEventListener('scroll', function(){
    // console.log(window.pageYOffset);
    if(this.location.hash != "#film-portal"){
        
        if(window.scrollY < 86){
            // // linkSectionIndicator(devLink);
        }
        if(window.scrollY > 400 && window.scrollY < 1000){
            // linkSectionIndicator(aboutLink);
        }
        if(window.scrollY > 1200){
            // linkSectionIndicator(contactLink);
        }
    }
})

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

// I need to add live projects to repo / or connect to other repos
// devPortal.addEventListener('click', (e) => {
//     if(e.target == trainer){
       
//         window.location.pathname = '/Multi_Game/index.html';
//     }
//     if(e.target == quadSquad){
       
//         window.location.pathname = '/Quad_Squad/index.html';
//     }
//     if(e.target == travelBuddy){
    
//         window.location.pathname = '/Travel_Buddy/index.html';
//     }
// })

$('.ham-menu-click').on('click', function (e){
    e.preventDefault();
    $('.flyout-menu').toggleClass('flyout-menu-out');
});

// const hiddenOnAllPortals = (except) => {
//   slideShowArray.forEach(i => {
//     i !== except ? i.style.overflow = 'hidden': i.style.overflow = 'initial';
//   })
// };


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
// Event listener for window - if certain width delete mp4 from film portal?
// Detecting whether the browser is being opened on a mobile device...

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

window.addEventListener("load", (e) => {
        handleLinking(e); 
        checkHash();
        if(window.innerWidth < 565){
            removeFilmBgVid() 
        }
    }
);

// const filmFrag = document.createDocumentFragment();

