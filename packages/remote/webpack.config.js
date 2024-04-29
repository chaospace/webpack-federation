const fs = require("fs");
const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;
const appDir = fs.realpathSync(process.cwd());
const publicPath = path.resolve(appDir, "public");
const outputPath = path.resolve(appDir, "dist");
const sourcePath = path.resolve(appDir, "src");
const indexTemplatePath = path.resolve(appDir, "public/index.html");
module.exports = (_, options) => {
  const isDev = options.mode === "development";

  return {
    entry: "./src/index.tsx",
    watch: isDev,
    output: {
      clean: true,
      publicPath: "auto",
    },
    resolve: {
      modules: ["node_modules"],
      //확장자에 js 추가 필요. node_modules파일을 고려.
      extensions: [".tsx", ".ts", ".js", ".css", "scss", ".json"],
      alias: {
        "@": sourcePath,
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
      new webpack.ProvidePlugin({
        process: "process/browser.js",
      }),
      new webpack.DefinePlugin({
        "process.env.mode": JSON.stringify(options.mode),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: `${publicPath}/**/*`,
            to: `${outputPath}/[name][ext]`,
            filter: (resource) => {
              return resource !== indexTemplatePath;
            },
          },
        ],
      }),
      new HTMLWebPackPlugin({
        templateParameters: {
          PUBLIC_URL: "",
        },
        template: indexTemplatePath,
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
      // server: "https",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      static: path.resolve(__dirname, "dist"),
      port: 9090,
    },
    devtool: "cheap-module-source-map",
  };
};
