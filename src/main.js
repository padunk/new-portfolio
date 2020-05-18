import App from './App.svelte';
import projects from './projects.json';
import otherProjects from './others.json';

const app = new App({
	target: document.body,
	props: {projects, otherProjects},
});

export default app;