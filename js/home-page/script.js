const search_btn=document.querySelector('.search-btn');
const input_search=document.querySelector('.movie-input');
const search_cont=document.querySelector('.search-cont');
const close_btn=document.querySelector('.close-btn');
const suggestion=document.querySelector('.suggestions-cont ul');
let li_ele=document.querySelectorAll('ul li');
search_btn.addEventListener('click',function(){
    console.log("Hello");
    search_cont.classList.add('search-cont-active');
    input_search.classList.add('input-active');
    search_cont.classList.add('search-cont-active');
    input_search.classList.add('input-active');
    close_btn.style.display='initial';
    suggestion.classList.remove('suggestions-none');
});
close_btn.addEventListener('click',function(){
    search_cont.classList.remove('search-cont-active');
    input_search.classList.remove('input-active');
    close_btn.style.display='none';
    suggestion.classList.add('suggestions-none');
});
input_search.addEventListener('keyup',async ()=>{
    suggestion.innerHTML='';
    li_url_update();
    if(input_search.value != null){
        console.log(input_search.value);
        const url=`https://api.themoviedb.org/3/search/movie?api_key=6c62b994f70846dd9201f6a1f089125e&query=${input_search.value}&page=1`;
        const data=await fetch(url);
        const response = await data.json();
        console.log(response);
        let temp='';
        response.results.forEach(d => {
            temp+=`<li data-id=${d.id}>${d.title}</li>`
        });
        suggestion.innerHTML=temp;
        li_ele=document.querySelectorAll('ul li');
    }
})
// input_search.addEventListener('change',async ()=>{
//     suggestion.innerHTML='';
//     if(input_search.value != null){
//         console.log(input_search.value);
//         const url=`https://api.themoviedb.org/3/search/movie?api_key=6c62b994f70846dd9201f6a1f089125e&query=${input_search.value}&page=1`;
//         const data=await fetch(url);
//         const response = await data.json();
//         console.log(response);
//         let temp='';
//         response.results.forEach(d => {
//             temp+=`<li data-id=${d.id}>${d.title}</li>`
//         });
//         suggestion.innerHTML=temp;
//         // li_ele=document.querySelectorAll('ul li');
//     }
// });
console.log(li_ele);
function li_url_update(){
li_ele.forEach(d => {
    d.addEventListener('click',(e)=>{
        window.location=`./movie-det.html?id=${d.dataset.id}`;
})});
}
setInterval(li_url_update,5);