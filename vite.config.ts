import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import fs from 'node:fs/promises'
import path from 'node:path'

export default defineConfig({
  build: {
    lib: {
      fileName: (format, entryName) => {
        let directory = ''

        if (entryName.startsWith('recommended')) {
          directory = 'configs/'
        }

        return `${directory}${entryName}.${format === 'es' ? 'mjs' : 'js'}`
      },
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'eslint-plugin-perfectionist',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      onwarn: (warning, warn) => {
        let suppressedCodes = ['MIXED_EXPORTS']

        if (!suppressedCodes.includes(warning.code ?? '')) {
          warn(warning)
        }
      },
      output: {
        preserveModules: true,
        exports: 'auto',
      },
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
    },
    minify: false,
  },
  plugins: [
    dts({
      afterBuild: async () => {
        await fs.writeFile(
          'dist/index.d.ts',
          (await fs.readFile('dist/index.d.ts'))
            .toString()
            .replace(/\nexport .+/, '') + 'export = _default',
        )
      },
      include: [
        path.join(__dirname, 'index.ts'),
        path.join(__dirname, 'typings'),
        path.join(__dirname, 'rules'),
        path.join(__dirname, 'utils'),
      ],
      insertTypesEntry: true,
      strictOutput: true,
      rollupTypes: true,
    }),
  ],
  test: {
  },
})
