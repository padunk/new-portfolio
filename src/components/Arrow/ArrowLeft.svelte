<style>
  svg {
    stroke: #888;
    transition: stroke 300ms;
  }

  .arrow-left {
    transition: transform 300ms;
  }

  .arrow-left:hover {
    transform: translateX(-10px) scale(1.02);
  }

  .arrow-left:hover svg {
    stroke: white;
  }
</style>

<script>
  export let className;

  className += ' arrow-left';
</script>

<div class="{className} cursor-pointer" on:click>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <polyline
      points="244 400 100 256 244 112"
      style="fill:none;stroke:'#000';stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
    ></polyline>
    <line
      x1="120"
      y1="256"
      x2="412"
      y2="256"
      style="fill:none;stroke:'#000';stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"
    ></line>
  </svg>
</div>
