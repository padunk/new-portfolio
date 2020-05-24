<style>
  svg {
    stroke: #888;
    transition: stroke 300ms;
  }

  .arrow-right {
    transition: transform 300ms;
  }

  .arrow-right:hover {
    transform: translateX(10px) scale(1.02);
  }

  .arrow-right:hover svg {
    stroke: white;
  }
</style>

<script>
  export let className;

  className += ' arrow-right';
</script>

<div class="{className} cursor-pointer" on:click>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <polyline
      points="268 112 412 256 268 400"
      style="fill:none;stroke:'#000';stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
    ></polyline>
    <line
      x1="392"
      y1="256"
      x2="100"
      y2="256"
      style="fill:none;stroke:'#000';stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
    ></line>
  </svg>
</div>
