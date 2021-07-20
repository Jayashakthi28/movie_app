const url =
  "https://api.themoviedb.org/3/discover/movie?api_key=6c62b994f70846dd9201f6a1f089125e&region=IN&sort_by=popularity.desc";
const arr = [];
const url_arr=[];
const poster_id_arr=[];
const img_arr = fetch(url)
  .then((data) => data.json())
  .then((data) => {arr.push(...data.results)
    img_urls();
    imgUrlUpdate();
  });
function img_urls(){
    url_arr.push(...arr.map(data=>{return `https://image.tmdb.org/t/p/original${data.poster_path}`}));
    poster_id_arr.push(...arr.map(data=>{return data.id}));    
}
let count=0;
function imgUrlUpdate(){
  const imgs=Array.from(document.querySelectorAll('.main_poster'));
  imgs.forEach((data) => {
    if(count === url_arr.length){
      count=0;
    }
    if(data.style.display!='none'){
      data.src=url_arr[count];
      data.setAttribute('data-id',poster_id_arr[count]);
      count++;
    }
  })
}
function window_Size(){
  if(window.matchMedia("(max-width: 1600px)").matches){
    document.querySelector('.img3').style.display='none';
  }
  if(window.matchMedia("(min-width: 1600px)").matches){
    document.querySelector('.img3').style.display='initial';
  }
  if(window.matchMedia("(max-width: 900px)").matches){
    document.querySelector('.img2').style.display='none';
  }
  if(window.matchMedia("(min-width: 900px)").matches){
    document.querySelector('.img2').style.display='initial';
  }
}
setInterval(imgUrlUpdate,5000);
// var x = window.matchMedia("(max-width: 700px)");
window.onresize = window.onload = window_Size;