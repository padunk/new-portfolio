import App from './App.svelte';
import projects from './projects.json';

const app = new App({
	target: document.body,
	props: {projects},
});

export default app;