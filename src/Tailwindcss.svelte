<style global>
  @tailwind base;
  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
  }
  body {
    padding: 0;
    overflow: hidden;
    color: #333;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }

  @tailwind components;
  .active {
    display: none;
    opacity: 0;
  }
  
  @tailwind utilities;
</style>
