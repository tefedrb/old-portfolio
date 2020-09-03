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
    const targets = [ devFlyOutLink, aboutFlyOutLink, contactFlyOutLink ];
    console.log(e.target, "etarget")
    if(targets.includes(e.target)){
        adjustHamMenu("closed");
        const flyOutMenuClassList = Array.from(flyOutMenu.classList);
        if(flyOutMenuClassList.includes('flyout-menu-out')){
            flyOutMenu.classList.remove('flyout-menu-out');
        } else {
            flyOutMenu.classList.add('flyout-menu-out');
        }        
    }
})

hamMenu.addEventListener("click", (e) => {
    e.preventDefault();
    const classList = Array.from(flyOutMenu.classList);
    console.log(classList.includes("flyout-menu"), "here")
    if(classList.includes("flyout-menu-out")){
        flyOutMenu.classList.remove("flyout-menu-out");
    } else {
        flyOutMenu.classList.add("flyout-menu-out");
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


