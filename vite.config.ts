import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";

const manifest = defineManifest({
	manifest_version: 3,
	description: "This extension will add a link to the Bluesky #hashtag",
	name: "Bluesky Hashtag Linker",
	version: "0.1.0",
	action: {
		default_title: "Open a new tab",
	},
	background: {
		service_worker: "src/background/index.ts",
	},
});

export default defineConfig({
	plugins: [crx({ manifest })],
});
