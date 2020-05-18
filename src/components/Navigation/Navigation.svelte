<style>
  .left-nav::before,
  .left-nav::after,
  .right-nav::before,
  .right-nav::after {
    content: '';
    width: 10vw;
    height: 4px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    background-color: chartreuse;
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
  import NavLink from './NavLink.svelte';
  const leftPath = [
    { to: '/', pathName: 'Home' },
    { to: '/other', pathName: 'Other Projects' }
  ];
  const rightPath = [
    { to: '/', pathName: 'Close' },
    { to: '/about', pathName: 'About' }
  ];
</script>

<nav
  class="flex h-16 justify-between items-center z-50 fixed w-screen text-red-400"
>
  <span class="left-nav relative left-2">
    <div class="flex flex-row relative">
      <!-- <span class="absolute top-min-full">
        <NavLink to="/">Home</NavLink>
      </span>

      <span class="relative">
        <NavLink to="/all">All projects</NavLink>
      </span>

      <NavLink to="/">
        <span class="relative">Close</span>
      </NavLink> -->
      <NavLink toGroups="{leftPath}" />

    </div>
  </span>
  <span class="right-nav relative right-2">
    <div class="flex flex-row relative">

      <!-- <span class="relative">
        <NavLink to="/about">About</NavLink>
      </span>

      <NavLink to="/">
        <span class="relative">Close</span>
      </NavLink> -->
      <NavLink toGroups="{rightPath}" />
    </div>
  </span>
</nav>
