module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": "src",
        api: "@/api",
      },
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
  },
};
