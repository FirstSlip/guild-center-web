import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  srcDir: './src/',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@request': path.resolve(
          __dirname,
          './src/common/request.ts'
        )
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '/public/_vars.scss';"
        }
      }
    }
  },
  components: [
    {
      path: '@/components',
      pathPrefix: true
    }
  ],
  css: [
    // SCSS main file
    '@/common/scss/main.scss'
  ]
});
