// const id = 459151;
// const id = 626392;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let main_data = {};
const common_det_url = `https://api.themoviedb.org/3/movie/${id}?api_key=6c62b994f70846dd9201f6a1f089125e`;
const posters_url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=6c62b994f70846dd9201f6a1f089125e`;
const videos_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=6c62b994f70846dd9201f6a1f089125e`;
const cast_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6c62b994f70846dd9201f6a1f089125e`;
const recom_url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=6c62b994f70846dd9201f6a1f089125e`;
const nav_elements = document.querySelector(".nav-elements");
const movie_det = document.querySelector(".movie-content-cont-details-cont");
const production_logo_cont = document.querySelector(".production-logo-cont");
const poster_cont = document.querySelector(".main-content-cont-poster img");
const backdrop_cont = document.querySelector(".backdrop-cont img");
const backdrop_cont1 = document.querySelector(".backdrop-cont1 img");
const utube_video_cont = document.querySelector(".video-cont");
const movie_poster_cont = document.querySelector(".poster-cont");
const cast_cont = document.querySelector(".cast-cont");
const rel_movies_cont = document.querySelector(".related-mov-cont");
const main_det_cont = document.querySelector(".main-det-cont");
const load_more = document.querySelector(".load-more-cont");
async function common_det_fetcher() {
  const data = await fetch(common_det_url);
  const response = await data.json();
  main_data["title"] = response.original_title;
  response.status === "Released"
    ? ((main_data["status"] = true),
      (main_data["runtime"] = response.runtime),
      (main_data["release_date"] = response.release_date))
    : (main_data["status"] = false);
  const production_text = [];
  const production_logo = [];
  response.production_companies.forEach((d) => {
    if (d.logo_path === null) {
      production_text.push(d.name);
    } else {
      production_logo.push(d.logo_path);
    }
  });
  main_data["production_text"] = production_text;
  main_data["production_logo"] = production_logo;
  main_data["overview"] = response.overview;
  main_data["budget"] = response.budget;
  main_data["title"] = response.title;
  main_data["original_title"] = response.original_title;
  main_data["rating"] = response.vote_average;
  main_data["language"] = response.spoken_languages[0].english_name;
  document.querySelector('title').textContent=main_data['title'];
}
async function posters_url_fetcher() {
  const data = await fetch(posters_url);
  const response = await data.json();
  main_data["backdrops"] = response.backdrops || "./assets/522.jpg";
  main_data["logo"] =
    response.logos.find((z) => {
      console.log(z);
      return z.iso_639_1 == "en";
    }) || "";
  main_data["posters"] = response.posters;
  main_data["images"] = response.backdrops.concat(response.posters);
}
async function cast_url_fetcher() {
  const data = await fetch(cast_url);
  const response = await data.json();
  main_data["cast"] = response.cast;
}
async function videos_url_fetcher() {
  nav_elements.innerHTML = "";
  movie_det.innerHTML = "";
  production_logo_cont.innerHTML = "";
  const data = await fetch(videos_url);
  const response = await data.json();
  const url = [];
  response.results.forEach((d) => {
    if (d.site === "YouTube") {
      url.push(`https://www.youtube.com/embed/${d.key}`);
    }
  });
  main_data["videos"] = url;
  nav_elements_updater();
  imgUrlUpdate();
  imgUrlUpdate1();
}

function nav_elements_updater() {
  nav_elements.innerHTML = `
<div class="wrapper-1">
<div class="big-movie-title"><h1>${main_data.title}</h1></div>
<div class="mini-det-cont">
    ${
      main_data.status === true
        ? `<div class="date-cont">${main_data.release_date}</div>
    <div class="time-cont">${main_data.runtime}mins</div>`
        : `<div class='data-cont'>Not Released</div>`
    }
  <!-- <div class="released">Released</div> -->
</div>
</div>
<div class="wrapper-2">
  <div class="logo-cont"><img src="https://image.tmdb.org/t/p/original//${
    main_data.logo.file_path
  }" alt=""></div>
  <!-- <div class="production-comp-logo-cont"><img src="https://image.tmdb.org/t/p/original/kP7t6RwGz2AvvTkvnI1uteEwHet.png" alt=""></div> -->
  <div class="mini-wrap">
  <div class="rating-cont"><img src="./assets/star-solid.svg" alt="rating"><div class="rating">${
    main_data.rating
  }/10</div></div>
  <div class="rating-cont"><img src="./assets/language-solid.svg" alt='Languages'>${
    main_data.language
  }</div>
  </div>
</div>`;
  movie_det.innerHTML = ` <div class="movie-list"><span class="hl">Original Title:</span>${
    main_data.original_title
  }</div>
<div class="movie-list"><span class="hl">Released Date:</span>${
    main_data.status === true ? main_data.release_date : "Not Yet Released"
  }</div>
<div class="movie-list"><span class="hl">Rating:</span>${
    main_data.rating
  }/10</div>
<div class="movie-list"><span class="hl">Budget:</span>${
    main_data.budget === 0 ? "Na" : main_data.budget
  }</div>
<div class="movie-list"><span class="hl">Language:</span>${
    main_data.language
  }</div>
<div class="movie-list"><span class="hl">Overview:</span><div class='overview-cont'>${
    main_data.overview
  }</div></div>`;
  let temp = "";
  if (main_data.production_logo.length !== 0) {
    main_data.production_logo.forEach((d) => {
      temp += `<img
            src="https://image.tmdb.org/t/p/original${d}"
            alt=""
          />`;
    });
  }
  if (main_data.production_text.length !== 0) {
    main_data.production_text.forEach((d) => {
      temp += `<div class="production-comp-title">${d}</div>`;
    });
  }
  production_logo_cont.innerHTML = temp;
  poster_cont.src =
    main_data.posters.length !== 0
      ? `https://image.tmdb.org/t/p/original${main_data.posters[0].file_path}`
      : `./assets/522.jpg`;
  main_det_cont.style.background =
    main_data.backdrops.length !== 0
      ? `url('https://image.tmdb.org/t/p/original${main_data.backdrops[0].file_path}')`
      : `url('./assets/522.jpg)`;
  main_det_cont.style.backgroundSize = "cover";
  temp = "";
  if (main_data.videos.length !== 0) {
    main_data.videos.forEach((d) => {
      temp += `  <iframe src="${d}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  } else {
    temp = `<div class='no-video-found'>Sorry No Videos found ????</div>`;
  }
  utube_video_cont.innerHTML = temp;
  temp = "";
  if (main_data.images.length === 0) {
    temp += `<div class='no-video-found'>Sorry No Images found ????</div>`;
  }
  // main_data.images.forEach((d) => {
  //   temp += ` <img src="https://image.tmdb.org/t/p/original/${d.file_path}" alt="Poster">`;
  // });
  temp = "";
  for (i = 0; i < 10; i++) {
    if (i < main_data.images.length)
      temp += ` <img src="https://image.tmdb.org/t/p/original/${main_data.images[i].file_path}" alt="Poster">`;
  }
  let load_more_flag = 0;
  if (main_data.images.length > 10) {
    temp += `<div class='load-more-cont' style="background: url('https://image.tmdb.org/t/p/original/${main_data.images[10].file_path}') center center / cover no-repeat"><div>Load More</div></div>`;
    load_more_flag = 1;
  }
  movie_poster_cont.innerHTML = temp;
  if (load_more_flag === 1) {
    let tempo='';
    document.querySelector(".load-more-cont").addEventListener("click", () => {
      main_data.images.forEach((d) => {
        tempo += ` <img src="https://image.tmdb.org/t/p/original/${d.file_path}" alt="Poster">`;
      });
      movie_poster_cont.innerHTML = tempo;
    })
  }
  temp = "";
  main_data.cast.forEach((d) => {
    temp += ` <div class="movies-card">
    ${
      d.profile_path
        ? `<img
      src="https://image.tmdb.org/t/p/original/${d.profile_path}"
      alt=""
    />`
        : `<img src="./assets/blank-profile-picture-973460_1280.png" alt="">`
    }
    <h3 class="mov-title">${d.original_name}</h3>
    <div class="hidden-mov-det">
      <div><span class='hl'>Name:</span>${d.original_name}</div>
      <div><span class='hl'>Charcter Name:</span>${
        d.character !== "" ? d.character : `Na`
      }</div>
    </div>
  </div>`;
  });
  cast_cont.innerHTML = temp;
}
let count = 0;
function imgUrlUpdate() {
  if (main_data.backdrops.length !== 0) {
    if (count >= main_data.backdrops.length) {
      count = 0;
    }
    main_det_cont.style.background = `url('https://image.tmdb.org/t/p/original/${main_data.backdrops[count].file_path}')`;
    main_det_cont.style.backgroundSize = "cover";
    main_det_cont.style.backgroundRepeat = "no-repeat";
    main_det_cont.style.backgroundPosition = "center";
    count++;
  }
}
let cnt = 0;
function imgUrlUpdate1() {
  if (main_data.posters.length !== 0) {
    if (cnt >= main_data.posters.length) {
      cnt = 0;
    }
    poster_cont.src = `https://image.tmdb.org/t/p/original/${main_data.posters[cnt].file_path}`;
    cnt++;
  }
}
// let cnt = 0;
// function imgUrlUpdate1() {
//   if (main_data.backdrops.length !== 0) {
//     const imgs = Array.from(
//       document.querySelectorAll(".main-content-cont-poster img")
//     );
//     imgs.forEach((d) => {
//       if (cnt >= main_data.posters.length) {
//         cnt = 0;
//       }
//       d.src = `https://image.tmdb.org/t/p/original/${main_data.posters[cnt].file_path}`;
//       cnt++;
//     });
//   }
// }
const id_arr = [];
async function recom_fetcher() {
  rel_movies_cont.innerHTML = "";
  const data1 = await fetch(recom_url);
  const result = [];
  const response = await data1.json();
  result.push(...response.results);
  let card = "";
  if (result.length === 0) {
    rel_movies_cont.style.display = "none";
    Array.from(document.querySelectorAll(".arrow-cont"))[1].style.display =
      "none";
    Array.from(
      document.querySelectorAll(".pop-movies-heading")
    )[1].style.display = "none";
  } else {
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
    rel_movies_cont.innerHTML = card;
  }
}
async function caller() {
  await common_det_fetcher();
  await posters_url_fetcher();
  await cast_url_fetcher();
  await videos_url_fetcher();
  await recom_fetcher();
  nav_elements_updater();
  imgUrlUpdate();
  imgUrlUpdate1();
  updater_1(document.querySelectorAll(".hidden-mov-det button"));
}
caller();
setInterval(imgUrlUpdate, 7000);
setInterval(imgUrlUpdate1, 7000);

function updater_1(button_redirect) {
  button_redirect.forEach((d) => {
    d.addEventListener("click", (e) => {
      window.location = `./movie-det.html?id=${d.dataset.id}`;
    });
  });
}
