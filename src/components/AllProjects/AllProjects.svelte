<style>
  .mr-screen {
    height: 90vh;
    width: 90vh;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(9, 1fr);
    gap: 5px;
    overflow: hidden;
    position: relative;
    z-index: 99;
    box-shadow: 0 0 0 10px black, 0 0 0 40px hsla(0, 0%, 80%, 0.7);
  }

  .wrapper {
    perspective: 1000px;
  }

  .flipper {
    transition: transform 250ms ease-out;
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
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://source.unsplash.com/random/700x700');
  }

  .back {
    transform: rotateY(180deg);
  }

  .wrapper:hover .flipper {
    transform: rotateY(180deg);
  }
</style>

<script>
  const children = Array.from({ length: 81 }, (_, i) => i);
  console.log(children);
</script>

<div
  class="bg-black text-white flex justify-center items-center min-h-screen
  min-w-full"
>
  <div class="rounded-full mr-screen">
    {#each children as child, i}
      <div class="w-full h-full wrapper">
        <div class="w-full h-full relative flipper">
          <div class="absolute inset-0 w-full h-full front z-10"></div>
          <div class="absolute inset-0 w-full h-full back">{i}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
