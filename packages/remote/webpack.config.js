const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

const deps = require("./package.json").dependencies;
module.exports = (_, options) => {
  const isDev = options.mode === "development";

  return {
    entry: "./src/index.tsx",
    watch: isDev,
    output: {
      publicPath: "auto",
    },
    resolve: {
      modules: ["node_modules"],
      //확장자에 js 추가 필요. node_modules파일을 고려.
      extensions: [".tsx", ".ts", ".js", ".css", "scss", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          type: "asset",
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              exclude: ["/node_modules/"],
              // plugins: [isDev && require.resolve("react-refresh/babel")],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: true,
                  auto: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HTMLWebPackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./PokemonList": "./src/components/PokemonList",
          "./Store": "./src/store/index",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 9090,
    },
    devtool: "cheap-module-source-map",
  };
};
