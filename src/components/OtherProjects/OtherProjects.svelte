<style>
  .background-video {
    filter: grayscale(100%);
  }

  .mr-screen {
    height: 90vh;
    width: 90vh;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(9, 1fr);
    gap: 5px;
    overflow: hidden;
    position: relative;
    z-index: 10;
    background-color: black;
    box-shadow: 0 0 0 10px black, 0 0 0 40px hsla(0, 0%, 80%, 0.7);
  }

  .wrapper {
    perspective: 1000px;
  }

  .flipper {
    will-change: transform;
    transition: transform 800ms ease-out;
    transition-delay: 50ms;
    transform-style: preserve-3d;
  }

  .wrapper .flipper {
    transform-origin: center;
  }

  .front,
  .back {
    backface-visibility: hidden;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .back {
    transform: rotateY(180deg);
  }

  .title {
    font-family: 'Oswald', sans-serif;
    height: 50%;
  }

  .controls {
    right: 20%;
  }

  .controls > div {
    cursor: pointer;
  }

  .chevron > svg {
    stroke: #888;
    transition: stroke 300ms;
  }

  .chevron:hover > svg {
    stroke: hsl(330, 100%, 50%);
    transform: scale(1.1);
  }
</style>

<script>
  import { onMount } from 'svelte';

  export let others;
  const children = Array.from({ length: 81 }, (_, i) => i);
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
  });

  function setImageAndTitle(isFront, idx) {
    const titleString = `
      <a href="${others[idx].url}" target="_blank" rel="noopener noreferrer">
        <h3 class="pl-4 border-red-500 border-l-4">
          <p>${others[idx].title.split(' ')[0]}</p>
          <p>${others[idx].title
            .split(' ')
            .slice(1)
            .join(' ')}</p>
        </h3>
      </a>
    `;

    if (!isFront) {
      backElement.forEach(
        back =>
          (back.style.backgroundImage = `url(${others[idx].imgPath}.${others[idx].imgType})`)
      );

      backTitle = titleString;
    } else {
      frontElement.forEach(
        front =>
          (front.style.backgroundImage = `url(${others[idx].imgPath}.${others[idx].imgType})`)
      );

      frontTitle = titleString;
    }
  }

  function handleProjectSlide(event, type) {
    const len = others.length;
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
</script>

<div
  class="bg-black text-white flex justify-center items-center min-h-screen
  min-w-full"
>
  <div
    class="absolute inset-0 w-screen h-screen overflow-hidden background-video"
  >
    <video autoplay muted loop>
      <!-- <source src="/media/examples/flower.webm" type="video/webm" /> -->
      <source src="/assets/videos/Pexels Videos 2421545.mp4" type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
  <div class="rounded-full mr-screen">
    {#each children as child, i}
      <div class="w-full h-full wrapper">
        <div class="w-full h-full relative flipper">
          <div class="absolute inset-0 w-full h-full front z-10"></div>
          <div class="absolute inset-0 w-full h-full back"></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="absolute left-0 bottom-0 text-5xl flex mb-4 title">
    <div class="w-full h-full wrapper">
      <div class="w-full h-full relative flipper">
        <div class="absolute inset-0 w-full h-full front z-10">
          {@html frontTitle}
        </div>
        <div class="absolute inset-0 w-full h-full back">
          {@html backTitle}
        </div>
      </div>
    </div>
  </div>

  <div class="absolute controls">
    <div
      class="w-20 h-20 mb-2 chevron"
      on:click="{e => handleProjectSlide(e, 'next')}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polyline
          points="184 112 328 256 184 400"
          style="fill:none;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
        ></polyline>
      </svg>
    </div>

    <div
      class="w-20 h-20 chevron"
      on:click="{e => handleProjectSlide(e, 'prev')}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polyline
          points="328 112 184 256 328 400"
          style="fill:none;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
        ></polyline>
      </svg>
    </div>
  </div>
</div>
