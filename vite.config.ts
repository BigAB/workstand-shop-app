import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import mkcert from 'vite-plugin-mkcert';
import { ChildProcess, spawn } from 'child_process';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		mkcert(),
		{
			name: 'start-local-pocketbase-server',
			configureServer: (server) => {
				let pocketbaseProcess: ChildProcess;

				server.httpServer?.once('listening', () => {
					console.log('Starting PocketBase...');
					pocketbaseProcess = spawn('pocketbase', ['serve'], {
						stdio: 'inherit',
						shell: true
					});
				});

				server.httpServer?.on('close', () => {
					if (pocketbaseProcess) {
						console.log('Stopping PocketBase...');
						pocketbaseProcess.kill();
					}
				});
			}
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
