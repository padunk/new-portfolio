<style>
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
    height: 80px;
    width: 80px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: transform 250ms;
  }

  .nav-button:hover {
    transform: rotateZ(-30deg);
  }

  .nav-icon {
    height: 2px;
    width: 30px;
    background-color: black;
    transition: transform 300ms, opacity 600ms;
  }

  .top {
    margin: 0;
  }

  .middle {
    margin-top: 10px;
    height: 4px;
    width: 60px;
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
    transform: scale(0);
    transition: opacity 250ms 250ms, transform 400ms ease-in-out 300ms;
  }

  .nav-video {
    width: 100vw;
    filter: blur(5px) invert(1);
  }

  .nav-link {
    font-family: 'Oswald', sans-serif;
    font-size: 5rem;
    color: white;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: -5px;
    line-height: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
  }

  .nav-link:nth-child(2) {
    margin-top: -150px;
  }

  .nav-link:nth-child(3) {
    margin-top: 150px;
  }

  .nav-link:hover {
    color: white;
    mix-blend-mode: difference;
  }

  #nav-toggle:checked ~ .nav-container {
    opacity: 1;
    transform: scale(1);
  }
</style>

<script>
  import { links } from 'svelte-routing';

  let toggleNav;

  function handleToggleNavMenu(event) {
    toggleNav.checked = false;
  }
</script>

<div class="absolute navigation">
  <input
    type="checkbox"
    class="hidden"
    id="nav-toggle"
    bind:this="{toggleNav}"
  />

  <label for="nav-toggle" class="nav-button">
    <div class="nav-icon top"></div>
    <div class="nav-icon middle"></div>
    <div class="nav-icon bottom"></div>
  </label>

  <nav class="nav-container" use:links>
    <video preload="metadata" autoplay loop muted class="nav-video">
      <source src="/assets/videos/video.mp4" type="video/mp4" />
    </video>
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/">HOME</a>
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/about">About</a>
    <a on:click="{handleToggleNavMenu}" class="nav-link" href="/other">
      Other Projects
    </a>
  </nav>
</div>
