"use strict;";

const createTrailersList = (parentElement, srcList) => {
  const ul = document.createElement("ul");
  ul.classList.add("trailers__list");
  parentElement.append(ul);

  const trailerWrappers = [];
  const trailerFrames = [];

  srcList.forEach((elem) => {
    const li = document.createElement("li");
    li.classList.add("trailers__item");
    ul.append(li);

    const div = document.createElement("div");
    div.classList.add("trailers__wrapper");
    li.append(div);
    trailerWrappers.push(div);

    const iframe = document.createElement("iframe");
    iframe.classList.add("trailers__video");
    iframe.setAttribute("allow", "autoplay");
    div.append(iframe);
    trailerFrames.push(iframe);
    const idVideo = elem.match(/\/embed\/([^/]+)/)[1];
    const idImgVideo = elem.match(/\/embed\/([^/\?]+)/)[1];
    iframe.srcdoc = `
    <style>
    * {
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

    html,
    body {
      width: 100%;
      height: 100%;
    }

    img, svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    #button {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      background-color: transparent;
      border: none;
      transform: translate(-50%, -50%);
      z-index: 5;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      button {
        width: 36px;
        height: 36px;
      }
    }
    </style>
    <a href="https://www.youtube.com/embed/${idVideo}&autoplay=1&mute=1">
      <img src="https://img.youtube.com/vi/${idImgVideo}/maxresdefault.jpg">
      <div id="button">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#FF3D00"/>
        <path d="M42.5 31.134C43.1667 31.5189 43.1667 32.4811 42.5 32.866L27.5 41.5263C26.8333 41.9112 26 41.4301 26 40.6603V23.3397C26 22.5699 26.8333 22.0888 27.5 22.4737L42.5 31.134Z" fill="white"/>
      </svg>

      </div>
    </a>    
    `;
  });
  return { trailerWrappers, trailerFrames };
};

const controlTrailers = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
  if (i !== j) {
    trailerWrappers[i].style.display = "none";
    trailerFrames[i].srcdoc = "";
  } else {
    trailerWrappers[i].style.display = "block";
    trailerFrames[i].srcdoc = trailerFrames[i].dataset.srcdoc;
  }
};

const init = () => {
  const trailersContainer = document.querySelector(".trailers__container");
  const trailersButtons = document.querySelectorAll(".trailers__button");

  const srcList = [];
  trailersButtons.forEach((element) => {
    srcList.push(element.dataset.src);
  });

  const { trailerWrappers, trailerFrames } = createTrailersList(
    trailersContainer,
    srcList
  );

  trailersButtons.forEach((element, elemIndex) => {
    trailerFrames[elemIndex].dataset.srcdoc = trailerFrames[elemIndex].srcdoc;
    element.addEventListener("click", (e) => {
      trailersButtons.forEach((tBtn, tBtnIndex) => {
        if (tBtn === element) {
          tBtn.classList.add("trailers__button_active");
        } else {
          tBtn.classList.remove("trailers__button_active");
        }
        controlTrailers(trailerWrappers, trailerFrames, tBtnIndex, elemIndex);
      });
    });
  });
  controlTrailers(trailerWrappers, trailerFrames);
};

init();
