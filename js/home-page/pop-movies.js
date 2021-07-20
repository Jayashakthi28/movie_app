const main_cont = Array.from(document.querySelectorAll(".pop-movies-cont"));
const heading = document.querySelectorAll("pop-movies-heading");
const id_arr = [];
async function genre_fetcher(id, index,text) {
  main_cont[index].innerHTML = "";
  const url =
    `https://api.themoviedb.org/3/discover/movie?api_key=6c62b994f70846dd9201f6a1f089125e&with_${text}=${id}`;
  const data = await fetch(url);
  const result = [];
  const response = await data.json();
  result.push(...response.results);
  let card = "";
  result.forEach((d) => {
    card += `<div class="movies-card">
    <img
      src="https://image.tmdb.org/t/p/original/${d.poster_path}"
      alt=""
    />
    <h3 class="mov-title">${d.title}</h3>
       <div class="hidden-mov-det">
          <div><span class='hl'>Movie Name:</span>${d.title}</div>
          <div><span class='hl'>Release Date:</span>${d.release_date}</div>
          <div><span class="hl">Languages:</span>${d.original_language}</div>
          <button data-id="${d.id}">See More</button>
        </div>
  </div>`;
  });
  main_cont[index].innerHTML = card;
  await updater_1( document.querySelectorAll('.hidden-mov-det button'));
  await updater_2(document.querySelectorAll('.main_poster'));
}
function updater_1(button_redirect){
button_redirect.forEach(d=>{
  d.addEventListener('click',(e)=>{
    window.location=`./movie-det.html?id=${d.dataset.id}`;
  })
});
}
function updater_2(button_redirect){
  button_redirect.forEach(d=>{
    d.addEventListener('click',(e)=>{
      window.location=`./movie-det.html?id=${d.dataset.id}`;
    })
  });
}
// async function data_updater(id, index) {
//   const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6c62b994f70846dd9201f6a1f089125e`;
//   const data = await fetch(url);
//   const response = await data.json();
//   const result = [];
//    ` <div class="movies-card">
//         <img
//           src="https://image.tmdb.org/t/p/original/${response.backdrop_path}"
//           alt=""
//         />
//         <h3 class="mov-title">Friends</h3>
//         <div class="hidden-mov-det">
//           <div>Movie Name: Friends</div>
//           <div>IMBD: 9</div>
//           <div>Languages: English</div>
//           <button>See More</button>
//         </div>
//       </div>`;
// }
genre_fetcher(27, 0,'genres');
genre_fetcher(16,1,'genres');
genre_fetcher(80,2,'genres');
genre_fetcher('ta',3,'original_language');
// genre_fetcher(420,1,'companies');