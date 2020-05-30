<style>
  .drop-filter {
    backdrop-filter: blur(90px);
    -webkit-backdrop-filter: blur(90px);
  }

  .active {
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
  }

  .video-active {
    opacity: 1;
  }

  .video-container {
    width: 90vh;
    height: 90vh;
    border-width: 15px;
    will-change: border-color;
    animation-name: borderColor;
    animation-duration: 20000ms;
    animation-fill-mode: forwards;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }

  .video-container::before {
    content: '';
    display: block;
    width: 120vw;
    height: 120vw;
    border: 45px solid whitesmoke;
    border-radius: 50%;
    position: absolute;
    top: -5%;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 50%
    );
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3) inset;
  }

  .video-wrapper {
    width: 80vh;
    height: 80vh;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.3);
  }

  @keyframes borderColor {
    0% {
      border-color: rgba(255, 255, 255, 0.8);
    }
    20% {
      border-color: rgba(255, 0, 0, 0.8);
    }
    30% {
      border-color: rgba(255, 120, 0, 0.8);
    }
    40% {
      border-color: rgba(255, 255, 0, 0.8);
    }
    50% {
      border-color: rgba(0, 255, 0, 0.8);
    }
    60% {
      border-color: rgba(0, 255, 120, 0.8);
    }
    70% {
      border-color: rgba(0, 0, 255, 0.8);
    }
    80% {
      border-color: rgba(120, 0, 255, 0.8);
    }
    90% {
      border-color: rgba(255, 0, 255, 0.8);
    }
    100% {
      border-color: rgba(255, 255, 255, 0.8);
    }
  }
</style>

<script>
  import { onMount, beforeUpdate } from 'svelte';
  import normalizeWheel from 'normalize-wheel';
  import { gsap } from 'gsap';

  export let name;
  export let projects;

  let isFirefox = navigator.userAgent.includes('Firefox');
  let alpha = isFirefox ? '' : (+'70').toString(16);
  let xOffset = 100;
  let circleXOffset = 14;
  let idx = 0;

  onMount(async () => {
    handleResize();

    gsap.set('.invisible', { autoAlpha: 1 });
    gsap
      .timeline()
      .from('main', {
        y: 1000,
        duration: 2,
        delay: 0.75
      })
      .from('.image-container', {
        x: 0,
        stagger: -0.25,
        ease: 'circ.in'
      })
      .from('.title', { opacity: 0 }, '-=0.2')
      .from('.description', { opacity: 0, duration: 1 });
  });

  beforeUpdate(() => {
    handleResize();
  });

  function handleResize(event) {
    const { innerWidth } = window;
    if (innerWidth >= 768) {
      circleXOffset = 16;
      xOffset = 85;
      return;
    }
    circleXOffset = 14;
    xOffset = 100;
  }

  function handleWheel(event) {
    const { pixelY } = normalizeWheel(event);
    if (pixelY >= 20) {
      if (idx === projects.length - 1) return;
      idx += 1;
    }

    if (pixelY <= -20) {
      if (idx === 0) return;
      idx -= 1;
    }
  }

  let video;
  let videoPlay = false;

  function handleMouseOver(event) {
    videoPlay = true;
    video.src = event.target.dataset.videoTitle;

    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          console.log('video is playing');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  function handleMouseOut(event) {
    videoPlay = false;
    video.pause();
    video.src = '';
  }
</script>

<svelte:window on:wheel="{handleWheel}" on:resize="{handleResize}" />

<h1 class="hidden">{name}</h1>
<section class=" w-screen h-screen relative invisible">
  {#each projects as project, i (project.title)}
    <div
      class="w-screen h-screen absolute inset-0 transition-all duration-1000
      image-container"
      style="{`transform: translateX(${(idx - i) * xOffset}vw)`}"
    >
      <picture>
        <source
          srcset="{project.imgPath + '-crop' + '.' + project.imgType}"
          media="(min-width: 768px)"
        />
        <source
          srcset="{project.imgPath + '.' + project.imgType}"
          media="(min-width: 640px)"
        />
        <img
          class="w-screen h-screen object-cover"
          src="{project.imgPath + '-mobile' + '.' + project.imgType}"
          alt="{project.alt}"
          loading="lazy"
          width="100%"
          height="100%"
        />
      </picture>

    </div>
  {/each}
  <section
    class="rounded-full absolute w-56 h-56 right-0 bottom-0 mr-4 mb-4 text-xs
    z-10 overflow-hidden drop-filter shadow-2xl md:w-64 md:h-64 md:text-sm
    lg:left-0 lg:top-0 lg:mt-32 lg:ml-56 description"
    style="{`background-color: ${projects[idx].color + alpha}`}"
  >
    {#each projects as pro, index (pro.title)}
      <div
        class="absolute transition-all duration-500 pt-16 h-full rounded-full
        md:pt-20"
        style="{`transform: translateX(${(idx - index) * circleXOffset}rem); background-color: ${pro.color + alpha}`}"
      >
        <div class="block lg:hidden">
          <a href="{pro.url}">
            <h2 class="font-bold text-sm pb-1 pl-4 md:text-md">{pro.title}</h2>
          </a>
        </div>

        <div class="pb-1 pl-2">{pro.description}</div>

        <div class="pl-4">
          <span>Made with:</span>
          <span class="font-semibold italic">{pro.tech.join(', ')}</span>
        </div>
      </div>
    {/each}
  </section>
  <!-- why the class directive is creating a bug here? class:active="{videoPlay}" -->
  <div
    class="hidden w-screen h-screen absolute z-20 flex items-center
    transition-all duration-200 lg:block opacity-0 delay-300"
    class:video-active="{videoPlay}"
    class:active="{videoPlay}"
  >
    <div
      class="flex justify-center items-center rounded-full border-dotted mt-8
      ml-48 opacity-0 transition-opacity duration-200 delay-300 bg-gray-200
      video-container"
      class:video-active="{videoPlay}"
    >
      <div
        class="rounded-full overflow-hidden flex justify-center bg-gray-900
        video-wrapper"
      >
        <video
          autoplay
          muted
          loop
          preload="none"
          type="video/mp4"
          bind:this="{video}"
        >
          Your browser don't support video.
        </video>
      </div>
    </div>
  </div>
  {#each projects as project, i (project.title)}
    <section
      class="hidden bottom-0 right-0 mr-16 mb-16 text-white text-4xl italic z-50
      lg:absolute lg:block transition-all duration-1000 title"
      style="{`transform: translateX(${(idx - i) * xOffset}vw)`}"
    >
      <a href="{project.url}" target="_blank" rel="noreferrer noopener">
        <h2
          style="{`color: ${project.color}`}"
          on:mouseover="{handleMouseOver}"
          on:mouseout="{handleMouseOut}"
          data-video-title="{project.videoPath}"
        >
          {project.title}
        </h2>
      </a>
    </section>
  {/each}
</section>
