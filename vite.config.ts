import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
    if (mode != 'lib') {
        return {
            plugins: [react()]
        }
    } else {
        return { plugins: [
                react(),
                dts({
                    outDir: ['dist'],
                    include: ['src/**/*.ts*'],
                    staticImport: true,
                    rollupTypes: true,
                    insertTypesEntry: true,
                }),
            ],
            build: {
                lib: {
                    entry: resolve(__dirname, 'src/index.ts'),
                    name: 'index',
                    formats: ['umd', 'es', 'cjs', 'iife'],
                    fileName: 'index',
                },
                rollupOptions: {
                    external: ['react', 'react-dom'],
                    output: {
                        globals: {
                            react: 'React',
                            'react-dom': 'ReactDOM',
                        },
                    },
                }
            }
        }
    }
});