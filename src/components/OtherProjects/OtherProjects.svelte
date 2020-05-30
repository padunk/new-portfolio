<style>
  .other-container {
    display: grid;
    grid-template-rows: repeat(3, auto);
    min-width: 101vw;
    min-height: 101vh;
  }

  .screen-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    padding-bottom: 40px;
  }

  .mr-screen {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 3px;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 0 10px black, 0 0 0 30px grey;
    width: 100%;
  }

  .wrapper {
    perspective: 5000px;
  }

  .front,
  .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-attachment: fixed;
    background-position: top center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .front {
    transform: rotateY(0deg);
    z-index: 2;
  }
  .back {
    transform: rotateY(180deg);
  }
  .flipper {
    transition: 0.6s;
    position: relative;
    transform-style: preserve-3d;
  }
  .wrapper .flipper {
    transform-origin: center;
  }

  .wrapper .flipper-title {
    transform-origin: left;
  }

  .controls {
    display: flex;
    justify-content: center;
  }

  .chevron {
    stroke: #aaa;
    cursor: pointer;
    transition: all 300ms;
  }

  .chevron:hover {
    stroke: hsl(330, 100%, 50%);
  }

  .chevron:hover.prev {
    transform: translateX(-5px) scale(1.1);
  }

  .chevron:hover.next {
    transform: translateX(5px) scale(1.1);
  }

  .title {
    height: 200px;
    width: 33%;
    font-size: 1.5rem;
  }

  .front-title,
  .back-title {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  .front-title {
    transform: rotateY(0deg);
    z-index: 2;
  }
  .back-title {
    transform: rotateY(180deg) translateX(100%);
  }

  @media only screen and (min-width: 640px) {
    .other-container {
      display: flex;
      justify-content: space-between;
    }

    .screen-wrapper {
      margin-top: 0;
      padding-bottom: 0;
      order: 2;
    }

    .mr-screen {
      grid-template-columns: repeat(9, 1fr);
      grid-template-rows: repeat(9, 1fr);
      gap: 5px;
      margin-right: -180px;
    }

    .title {
      height: auto;
      width: auto;
      order: 1;
    }

    .front-title,
    .back-title {
      display: flex;
      align-items: center;
    }

    .controls {
      flex-direction: column;
      align-items: flex-start;
      order: 2;
      margin-right: 20px;
    }
  }

  @media only screen and (min-width: 1280px) {
    .title {
      font-size: 2.5rem;
    }

    .controls {
      margin-right: 40px;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  export let otherProjects;
  const gridSize = window.innerWidth < 640 ? 25 : 81;
  const children = Array.from({ length: gridSize }, (_, i) => i);
  const rotateDeg = 180;

  let backTitle, frontTitle;
  let isShowingFront = true;
  let projectIndex = 0;
  let rotation = 0;

  let flipperElement;
  let frontElement;
  let backElement;

  onMount(() => {
    flipperElement = document.querySelectorAll('.flipper');
    frontElement = document.querySelectorAll('.front');
    backElement = document.querySelectorAll('.back');

    setImageAndTitle(isShowingFront, projectIndex);
    handleResize();
  });

  function setImageAndTitle(isFront, idx) {
    const titleString = `
      <a href="${
        otherProjects[idx].url
      }" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-white transition-colors duration-300">
        <h3 class="pl-2 border-l-4 border-red-500">
          <p class='m-0 leading-tight'>${
            otherProjects[idx].title.split(' ')[0]
          }</p>
          <p class='m-0 leading-tight'>${otherProjects[idx].title
            .split(' ')
            .slice(1)
            .join(' ')}</p>
        </h3>
      </a>
    `;

    if (!isFront) {
      backElement.forEach(
        back =>
          (back.style.backgroundImage = `url(${otherProjects[idx].imgPath}.${otherProjects[idx].imgType})`)
      );

      backTitle = titleString;
    } else {
      frontElement.forEach(
        front =>
          (front.style.backgroundImage = `url(${otherProjects[idx].imgPath}.${otherProjects[idx].imgType})`)
      );

      frontTitle = titleString;
    }
  }

  function handleProjectSlide(event, type) {
    const len = otherProjects.length;
    let imageIndex;
    isShowingFront = !isShowingFront;
    projectIndex = type === 'next' ? projectIndex + 1 : projectIndex - 1;

    if (projectIndex < 0) {
      imageIndex = Math.abs(len + projectIndex) % len;
    } else {
      imageIndex = projectIndex % len;
    }
    setImageAndTitle(isShowingFront, imageIndex);

    rotation = type === 'next' ? rotation + rotateDeg : rotation - rotateDeg;
    flipperElement.forEach(flip => {
      flip.style.transform = `rotateY(${rotation}deg)`;
    });
  }

  let mrScreen;
  function handleResize() {
    const max = Math.max(window.innerHeight, window.innerWidth);
    const min = Math.min(window.innerHeight, window.innerWidth);
    const scale = max / min < 1.4 ? 0.6 : 0.8;
    const minSize = min * scale;
    
    mrScreen.style.width = minSize + 'px';
    mrScreen.style.height = minSize + 'px';
  }
</script>

<svelte:window on:resize="{handleResize}" />

<div class="other-container">

  <!-- <div class="absolute inset-0 overflow-hidden background-video hidden">
    <video autoplay muted loop class="w-full h-full object-cover">
      <source
        src="https://res.cloudinary.com/padunk/video/upload/v1590378881/my_portfolio/Pexels_Videos_2421545_fncd7j.webm"
        type="video/webm"
      />
      <source
        src="https://res.cloudinary.com/padunk/video/upload/v1590378881/my_portfolio/Pexels_Videos_2421545_fncd7j.mp4"
        type="video/mp4"
      />
    </video>
  </div> -->

  <div class="screen-wrapper">
    <div class="mr-screen" bind:this="{mrScreen}">
      {#each children as child, i}
        <div class="w-full h-full wrapper">
          <div class="w-full h-full relative flipper">
            <div class="absolute inset-0 w-full h-full front z-10"></div>
            <div class="absolute inset-0 w-full h-full back"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="controls">
    <div
      class="w-10 h-10 md:w-16 md:h-16 chevron prev"
      on:click="{e => handleProjectSlide(e, 'prev')}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polyline
          points="328 112 184 256 328 400"
          style="fill:none;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
        ></polyline>
      </svg>
    </div>
    <div
      class="w-10 h-10 md:w-16 md:h-16 mb-2 chevron next"
      on:click="{e => handleProjectSlide(e, 'next')}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polyline
          points="184 112 328 256 184 400"
          style="fill:none;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
        ></polyline>
      </svg>
    </div>
  </div>

  <div class="title">
    <div class="w-full h-full wrapper">
      <div class="w-full h-full relative flipper flipper-title">
        <div class="absolute inset-0 w-full h-full z-10 front-title">
          {@html frontTitle}
        </div>
        <div class="absolute inset-0 w-full h-full back-title">
          {@html backTitle}
        </div>
      </div>
    </div>
  </div>
</div>
