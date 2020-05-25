<style>
  .background-video {
    filter: grayscale(100%);
  }

  .mr-screen {
    height: 45vh;
    width: 45vh;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(9, 1fr);
    gap: 3px;
    overflow: hidden;
    position: relative;
    z-index: 10;
    background-color: black;
    box-shadow: 0 0 0 6px black, 0 0 0 25px hsla(0, 0%, 80%, 0.7);
  }

  @media only screen and (min-width: 640px) {
    .mr-screen {
      height: 60vh;
      width: 60vh;
      gap: 5px;
      box-shadow: 0 0 0 10px black, 0 0 0 40px hsla(0, 0%, 80%, 0.7);
    }
  }

  @media only screen and (min-width: 1024px) {
    .mr-screen {
      height: 90vh;
      width: 90vh;
      gap: 5px;
      box-shadow: 0 0 0 10px black, 0 0 0 40px hsla(0, 0%, 80%, 0.7);
    }
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
    border-style: none;
    border-left: 4px solid #f56565;
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
  import { gsap } from 'gsap';

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

    gsap.set('.invisible', { autoAlpha: 1 });
    gsap
      .timeline()
      .from('.mr-screen', {
        yPercent: -120,
        duration: 4,
        delay: 0.5,
        ease: 'expo.out'
      })
      .from('.title', { opacity: 0, rotateY: 180, duration: 1 }, '-=2.5')
      .from(
        '.chevron',
        { opacity: 0, xPercent: 100, duration: 0.8, stagger: 0.3 },
        '<0.5'
      );
  });

  function setImageAndTitle(isFront, idx) {
    const titleString = `
      <a href="${
        others[idx].url
      }" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-white transition-colors duration-300">
        <h3 class="pl-4">
          <p class='m-0 leading-tight'>${others[idx].title.split(' ')[0]}</p>
          <p class='m-0 leading-tight'>${others[idx].title
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
  min-w-full invisible"
>
  <div
    class="absolute inset-0 w-screen h-screen overflow-hidden background-video"
  >
    <video autoplay muted loop class="w-full h-full object-cover">
      <!-- <source src="/media/examples/flower.webm" type="video/webm" /> -->
      <source src="https://res.cloudinary.com/padunk/video/upload/v1590378881/my_portfolio/Pexels_Videos_2421545_fncd7j.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="rounded-full -mt-16 mr-screen lg:mt-0">
    {#each children as child, i}
      <div class="w-full h-full wrapper">
        <div class="w-full h-full relative flipper">
          <div class="absolute inset-0 w-full h-full front z-10"></div>
          <div class="absolute inset-0 w-full h-full back"></div>
        </div>
      </div>
    {/each}
  </div>

  <div
    class="absolute left-0 bottom-0 text-3xl flex title -mb-24 lg:mb-4
    lg:text-5xl"
  >
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

  <div
    class="absolute bottom-0 right-0 mb-32 flex flex-row-reverse controls
    sm:mb-24 sm:mr-8 lg:block lg:mb-48 lg:mr-16 lg:right-0"
  >
    <div
      class="w-10 h-10 lg:w-20 lg:h-20 mb-2 chevron"
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
      class="w-10 h-10 lg:w-20 lg:h-20 chevron"
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
