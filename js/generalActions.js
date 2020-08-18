const header = document.querySelector('header');
const body = document.querySelector('body');
const filmLink = document.querySelector('#filmmaking');
const devLink = document.querySelector('#development');
const aboutLink = document.querySelector('#about-link');
const contactLink = document.querySelector('#contact-link');
const devFlyOutLink = document.querySelector('#development-flyout');
const aboutFlyOutLink = document.querySelector('#about-link-flyout');
const contactFlyOutLink = document.querySelector('#contact-link-flyout');
const flyOutMenu = document.querySelector('.flyout-menu');
const devPortal = document.querySelector('#dev-portal-wrap');
const mainPortal = document.querySelector('main');
const aboutPortal = document.querySelector('#about-portal');
const contactPortal = document.querySelector('#contact-portal');
const footer = document.querySelector('footer');
const email = document.querySelector('#email');
const loading = document.querySelector('.loader-container');
const hamMenu = document.querySelector('.ham-menu-click');
const hamChildren = Array.from(hamMenu.children);

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

const adjustHamMenu = (option) => {
    if(option === "closed"){
        hamChildren.forEach((span, idx) => {
            span.classList.remove(`testHam${idx}`);
        })
    } else if(option === "open"){
        hamChildren.forEach((span, idx) => {
            span.classList.add(`testHam${idx}`);
        }) 
    } else {
        throw console.error("Need to specifiy an option for function"); 
    }
}
// Hamburger menu actions
hamMenu.addEventListener('click', () => {
    if(hamChildren[0].classList.contains("testHam0")){
       adjustHamMenu("closed");
    } else {
       adjustHamMenu("open");
    }
});

flyOutMenu.addEventListener('click', function(e){
    if(e.target == devFlyOutLink){
        shiftToDev();
        adjustHamMenu("closed");
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == filmFlyOutLink){
        shiftToFilm();
        adjustHamMenu("closed");
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == aboutFlyOutLink){
        shiftToAbout();
        adjustHamMenu("closed");
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
    if(e.target == contactFlyOutLink){
        shiftToContact();
        adjustHamMenu("closed");
        $('.flyout-menu').toggleClass('flyout-menu-out');
    }
})

// const hamMenu = document.querySelector('.ham-menu-click');

// hamMenu.on('click', function (e){
//     e.preventDefault();
//     $('.flyout-menu').toggleClass('flyout-menu-out');
// });

hamMenu.addEventListener("click", (e) => {
    e.preventDefault();
    const flyOut = document.querySelector('.flyout-menu');
    // console.log(flyOut.classList, "elements")
    const classList = flyOut.classList;
    if(classList.includes("flyout-menu")){
        flyOut.classList.remove("flyout-menu-out");
    } else {
        flyOut.classList.add("flyout-menu-out");
    }
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

const toggleFilmBgVid = (option) => {
    const videoBg = document.querySelector('#film-video-bg');
    if(option == "add") {
        const videoFrag = document.createDocumentFragment();
        const videoBg = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute("src", "video/Burn_1.mp4");
        source.setAttribute("type", "video/mp4");
        videoBg.setAttribute("autoplay", "");
        videoBg.setAttribute("muted", "");
        videoBg.setAttribute("loop", "");
        videoBg.setAttribute("autoplay", "");
        videoBg.id = "film-video-bg";
        videoBg.appendChild(source);
        videoFrag.appendChild(videoBg);
        document.querySelector("#film-portal-wrap").appendChild(videoFrag);
        videoBg.style.opacity = "1";
    } else if(option == "remove"){
        videoBg.parentNode.removeChild(videoBg);
        filmPortal.style.backgroundColor = 'black';
    }
}

window.addEventListener('resize', (e) => {
    if(e.target.innerWidth < 565 && document.querySelector('#film-video-bg')){
        toggleFilmBgVid("remove");
    } else if(e.target.innerWidth > 565 && !document.querySelector('#film-video-bg')){
        toggleFilmBgVid("add");
    }
})

window.addEventListener('load', (e) => {
        setTimeout(() => {
            container.style.opacity = "0";
            setTimeout(() => {
                container.remove();
            }, 500);
        }, 500);
       
        checkHash();
        if(window.innerWidth < 565){
            toggleFilmBgVid() 
        }
    }
);


