<style>
  .about-detail {
    border-bottom-left-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    height: 101vh;
    width: 101vw;
    transform: translateX(70%);
    transition: transform 1000ms cubic-bezier(0.42, 1.04, 0.48, 1.16),
      padding-left 500ms;
    padding-left: 30%;
    padding-right: 40px;
  }

  .about-detail:hover,
  .about-detail:active {
    transform: translateX(20%);
    padding-left: 70px;
  }

  .section-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem;
    padding-right: 50px;
  }

  .cert-link:link,
  .cert-link:visited {
    color: #a0aec0;
    text-decoration: underline;
    transition: color 300ms ease-in;
  }

  .cert-link:hover,
  .cert-link:active {
    color: white;
  }

  @media only screen and (min-width: 640px) {
    .about-detail {
      transform: translateX(85%);
      padding-left: 15%;
    }
  }

  @media only screen and (min-width: 1024px) {
    .about-detail {
      transform: translateX(90%);
      padding-left: 10%;
    }

    .section-wrapper {
      font-size: 1.5rem;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';

  import ArrowRight from '../Arrow/ArrowRight.svelte';
  import ArrowLeft from '../Arrow/ArrowLeft.svelte';

  const stacks = [
    ['HTML', 'https://whatwg.org/'],
    ['CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
    ['JS', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
    ['React', 'https://reactjs.org/'],
    ['ReactNative', 'https://reactnative.dev/'],
    ['Redux', 'https://redux.js.org/'],
    ['NodeJS', 'https://nodejs.org/en/'],
    ['MongoDB', 'https://www.mongodb.com/'],
    ['PostgreSQL', 'https://www.postgresql.org/'],
    ['TypeScript', 'https://www.typescriptlang.org/'],
    ['SASS', 'https://sass-lang.com/']
  ];

  const certs = [
    { org: 'FreeCodeCamp', course: 'Full Stack' },
    { org: 'Microsoft', course: 'Artificial Intelligence' },
    { org: 'Udacity', course: 'React Nanodegree' },
    { org: 'Udemy', course: 'Advanced CSS' }
  ];

  let slideNo = 0;
  const flyIn = { x: 500, delay: 550, duration: 1500, easing: expoOut };
  const fadeOut = { duration: 500 };

  function nextSlide(event) {
    slideNo += 1;
  }

  function prevSlide(event) {
    slideNo -= 1;
  }

  let linkBG = '';
  let showLinkScreenshot = false;

  function showStackBG(event) {
    const basePath = '/assets/images/sites/';
    const imgPath = event.target.dataset.stack + '.jpeg';

    showLinkScreenshot = true;
    linkBG = `url(${basePath}${imgPath})`;
  }

  function hideStackBG(event) {
    linkBG = '';
    showLinkScreenshot = false;
  }
</script>

<div class="bg-red-800 text-gray-500 about-detail">
  {#if slideNo === 0}
    <section in:fly="{flyIn}" out:fade="{fadeOut}" class="section-wrapper">
      <div class="w-4/5 max-w-lg flex flex-col">
        <h2>
          I'm a self-taught web developer lived in Indonesia. I started coding
          at age of 14 with BASIC in middle school, but I never learn it
          afterwards. I started fall in
          <span
            class="italic font-semibold text-xl rounded-lg"
            style="color:hotpink; box-shadow: 0 0 0 2px; padding: 0 10px;"
          >
            love
          </span>
          with code again when I'm forty years old, I know it seems a bit too
          late, but better late than never. Currently I'm looking for a remote
          job for a
          <span class="font-semibold" style="color: mediumspringgreen;">
            Frontend or Fullstack Engineer.
          </span>
        </h2>
        <ArrowRight on:click="{nextSlide}" className="{'w-10 h-10 self-end'}" />
      </div>
    </section>
  {:else if slideNo === 1}
    <section in:fly="{flyIn}" out:fade="{fadeOut}" class="section-wrapper">
      <div class="w-4/5 max-w-md">
        <h2 class="mb-2 font-bold">My web stacks:</h2>
        <div class="flex">
          <ul class="mb-2 lg:mr-8">
            {#each stacks as [name, url]}
              <li class="my-stack">
                <a
                  href="{url}"
                  target="_blank"
                  rel="noreferrer noopener"
                  on:mouseover="{showStackBG}"
                  on:mouseout="{hideStackBG}"
                  data-stack="{name}"
                  class="text-gray-500 hover:text-white transition-colors
                  duration-300"
                >
                  {name}
                </a>
              </li>
            {/each}
          </ul>
          {#if showLinkScreenshot}
            <div
              in:fly="{{ y: 500, duration: 1000, delay: 50 }}"
              out:fade
              class="w-full h-auto bg-contain bg-no-repeat bg-center"
              style="background-image: {linkBG}"
            ></div>
          {/if}
        </div>
        <div class="flex justify-between w-full">
          <ArrowLeft
            on:click="{prevSlide}"
            className="{'w-10 h-10 self-start'}"
          />
          <ArrowRight
            on:click="{nextSlide}"
            className="{'w-10 h-10 self-end'}"
          />
        </div>
      </div>
    </section>
  {:else}
    <section in:fly="{flyIn}" out:fade="{fadeOut}" class="section-wrapper">
      <div class="w-4/5 max-w-lg flex flex-col">
        <h2 class="mb-2 font-bold">
          <a
            class="cert-link"
            href="https://bit.ly/2Ls9nXC"
            target="_blank"
            rel="noopener noreferrer"
          >
            Certification:
          </a>
        </h2>
        <ul class="list-disc list-inside mb-2">
          {#each certs as cert}
            <li>
              <span class="font-semibold text-gray-100">{cert.course}</span>
              by
              <em>{cert.org}</em>
            </li>
          {/each}
        </ul>
        <ArrowLeft
          on:click="{prevSlide}"
          className="{'w-10 h-10 self-start'}"
        />
      </div>
    </section>
  {/if}
</div>
