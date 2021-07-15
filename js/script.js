const search_btn=document.querySelector('.search-btn');
const input_search=document.querySelector('.movie-input');
const search_cont=document.querySelector('.search-cont');
const close_btn=document.querySelector('.close-btn');
search_btn.addEventListener('click',function(){
    console.log("Hello");
    search_cont.classList.add('search-cont-active');
    input_search.classList.add('input-active');
    search_cont.classList.add('search-cont-active');
    input_search.classList.add('input-active');
    close_btn.style.display='initial';
});
close_btn.addEventListener('click',function(){
    search_cont.classList.remove('search-cont-active');
    input_search.classList.remove('input-active');
    close_btn.style.display='none';
})
