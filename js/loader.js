const loading = document.querySelector('.loader-container');

window.onload = function(){
    setTimeout(function(){
        loading.style.opacity = 0
    }, 500)
    setTimeout(function(){
        loading.parentNode.removeChild(loading)
    }, 1500)
}