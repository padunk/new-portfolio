<style>
  .left-nav::before,
  .left-nav::after,
  .right-nav::before,
  .right-nav::after {
    content: '';
    width: 10vw;
    height: 2px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    background-color: #222;
    transition: 600ms;
  }
  .left-nav::before {
    right: 100%;
    transform: translate3d(-15px, 15px, 0);
  }
  .left-nav::after {
    right: 100%;
    transform: translate3d(-100px, 17px, 0);
  }
  .left-nav:hover.left-nav::before {
    transform: translate3d(130px, 17px, 0);
    width: 0;
  }
  .left-nav:hover.left-nav::after {
    transform: translate3d(-15px, 15px, 0);
  }
  .right-nav::before {
    left: 100%;
    transform: translate3d(15px, 15px, 0);
  }
  .right-nav::after {
    left: 100%;
    transform: translate3d(100px, 17px, 0);
  }
  .right-nav:hover.right-nav::before {
    transform: translate3d(-130px, 17px, 0);
    width: 0;
  }
  .right-nav:hover.right-nav::after {
    transform: translate3d(15px, 15px, 0);
  }
</style>

<script>
  import { links } from 'svelte-routing';
</script>

<nav use:links class="flex h-16 justify-between items-center z-50 fixed w-screen">
  <span class="left-nav relative left-2">
    <div class="flex flex-row relative">
      <a href="/" class="absolute top-min-full">Home</a>
      <a href="/all" class="relative">All projects</a>
      <span class="absolute top-full">Close</span>
    </div>
  </span>
  <span class="right-nav relative right-2">
    <div class="flex flex-row relative">
      <a href="/about" class="relative">About</a>
      <span class="absolute top-full">Close</span>
    </div>
  </span>
</nav>
