import { defineConfig, type DefineConfigItem } from 'bunup';

const config = {
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  splitting: false,
  dts: {
    inferTypes: true,
  },
  jsx: {
    runtime: 'automatic',
  },
  packages: 'external',
  external: ['react', 'react/jsx-runtime', 'rosetty'],
  sourcemap: 'linked',
  target: 'browser',
  exports: false,
  clean: true,
  preferredTsconfig: './tsconfig.build.json',
} satisfies DefineConfigItem;

export default defineConfig(config) as DefineConfigItem;
