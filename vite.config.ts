import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts({
        outDir: ['dist', 'types'],
        include: ['src/index.ts', 'src/**/*.ts*'],
        staticImport: true,
        rollupTypes: true,
        insertTypesEntry: true
    })]
})
