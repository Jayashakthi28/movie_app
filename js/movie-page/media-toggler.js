const headings = Array.from(document.querySelectorAll(".heading-cont h2"));
const video_cont = document.querySelector(".video-cont");
const image_cont = document.querySelector(".poster-cont");
headings.forEach((data, i) => {
  data.addEventListener("click", () => {
    console.log(i);
    i === 1
      ? ((video_cont.style.display = "none"),
        (headings[i-1].style.color = "#06D6A0"),
        (image_cont.style.display = "flex"),
        (headings[i].style.color = "#FFD166"))
      : ((image_cont.style.display = "none"),
        (headings[i+1].style.color = "#06D6A0"),
        (video_cont.style.display = "flex"),
        (headings[i].style.color = "#FFD166"));
  });
});
