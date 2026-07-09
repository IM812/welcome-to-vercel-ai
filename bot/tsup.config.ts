import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  outDir: 'dist',
  clean: true,
  // Keep all node_modules external — Node resolves them from node_modules at runtime
  external: [/node_modules/, /@prisma/, /prisma/],
  esbuildOptions(options) {
    options.platform = 'node';
    // Allow requires without .js extension in output (CJS mode)
    options.bundle = true;
  },
  // Copy the generated prisma client into dist so relative imports resolve
  onSuccess: 'cp -r src/generated dist/',
});
