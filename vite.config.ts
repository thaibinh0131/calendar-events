import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			vue(),
			AutoImport({
				imports: ['vue', 'vue-router', '@vueuse/core'],
				dts: 'src/auto-imports.d.ts',
				dirs: ['src/composables'],
				vueTemplate: true,
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		build: {
			sourcemap: mode === 'production' ? false : true,
		},
	};
});
