var config = require("grunt-settings"),
    webpack = require("webpack");

module.exports = function (grunt) {
  config.init(grunt);

  config.set("pkg", grunt.file.readJSON("package.json"));

  config.set("mocha", {
    all: {
      src: ["spec/index.html"]
    },

    options: {
      run: true
    }
  });

  config.set("meta.banner",
    '<%= pkg.name %> v<%= pkg.version %> | ' +
    '(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> |' +
    ' <%= pkg.repository.url %>'
  );

  config.set("webpack", {
    test: {
      entry: "./spec/specs.js",
      output: {
        path: "./spec/",
        filename: "specs_bundle.js",
      },
      module: {
        loaders: [
          {
            test: /\.js?$/,
            loader: "babel"
          }
        ]
      }
    },
    build: {
      entry: "./src/fluxo_relational.js",
      devtool: ["source-map"],
      output: {
        path: "./dist/",
        filename: "fluxo_relational.js",
        libraryTarget: "umd",
        library: "Fluxo",
        sourceMapFilename: "fluxo_relational.map",
        sourcePrefix: ""
      },
      externals: {
        "fluxo-js": {
          amd: "fluxo",
          commonjs: "fluxo-js",
          root: "Fluxo"
        }
      },
      module: {
        loaders: [
          {
            test: /\.js?$/,
            loader: "babel"
          }
        ]
      },
      plugins: [
        new webpack.BannerPlugin("<%= meta.banner %>")
      ]
    }
  });

  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-mocha");

  config.registerTask("build", [
    "webpack"
  ]);

  grunt.registerTask("test", ["webpack:test", "mocha"]);
};
