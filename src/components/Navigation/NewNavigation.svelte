<style>
  .navigator {
    width: 70px;
    height: 70px;
    top: 0;
  }

  .nav-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.8);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: transform 250ms;
  }

  .nav-button:hover {
    transform: rotateZ(-30deg);
  }

  .nav-icon {
    height: 2px;
    background-color: black;
    transition: transform 300ms, opacity 600ms;
  }

  .top {
    margin: 0;
  }

  .middle {
    margin-top: 10px;
    height: 4px;
    background-color: crimson;
  }

  .bottom {
    margin-top: 10px;
  }

  #nav-toggle:checked + .nav-button .top {
    transform: rotateZ(45deg);
  }

  #nav-toggle:checked + .nav-button .bottom {
    margin-top: -15px;
    transform: rotateZ(-45deg);
  }

  #nav-toggle:checked + .nav-button .middle {
    transform: translateX(-50vw);
    opacity: 0;
  }

  .nav-container {
    width: 101vw;
    height: 101vh;
    position: relative;
    z-index: 80;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(0);
    background: linear-gradient(100deg, black, black 49.5%, white 49.6%);
    transition: opacity 250ms 250ms, transform 400ms ease-in-out 300ms;
  }

  /* .nav-video {
    filter: blur(5px) invert(1);
  } */

  .nav-link {
    font-family: 'Oswald', sans-serif;
    color: white;
    font-size: 2.5rem;
    text-transform: uppercase;
    mix-blend-mode: difference;
    padding: 0 40px;
    border-radius: 10px;
    transition: background-color 500ms ease-out, color 300ms;
  }

  .nav-link:hover {
    background-color: white;
    color: black;
  }

  #nav-toggle:checked ~ .nav-container {
    opacity: 1;
    transform: scale(1);
  }

  @media only screen and (min-width: 640px) {
    .nav-link {
      font-size: 4rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .nav-link {
      font-size: 5rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .nav-link {
      font-size: 7rem;
    }
  }
</style>

<script>
  import { links } from 'svelte-routing';

  let toggleNav;

  function handleToggleNavMenu(event) {
    toggleNav.checked = false;
  }
</script>

<div class="absolute navigator">
  <input
    type="checkbox"
    class="hidden"
    id="nav-toggle"
    bind:this="{toggleNav}"
  />

  <label for="nav-toggle" class="nav-button w-10 h-10">
    <div class="nav-icon w-4 top"></div>
    <div class="nav-icon w-8 middle"></div>
    <div class="nav-icon w-4 bottom"></div>
  </label>

  <nav class="nav-container" use:links>
    <!-- <video
      preload="metadata"
      autoplay
      loop
      muted
      class="nav-video min-w-full h-full object-cover"
    >
      <source
        src="https://res.cloudinary.com/padunk/video/upload/v1590331906/my_portfolio/video.mp4"
        type="video/mp4"
      />
    </video> -->
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/">HOME</a>
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/other">
      Other Projects
    </a>
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/about">About</a>
  </nav>
</div>
