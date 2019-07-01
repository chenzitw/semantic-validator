const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    library: {
      root: 'semanticValidator',
      commonjs: 'semantic-validator',
      amd: 'semantic-validator'
    },
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                baseUrl: "./",
                module: "commonjs",
                moduleResolution: "node",
                sourceMap: true,
                target: "es5",
                lib: [
                  "es2015",
                ]
              },
            },
          },
        ],
      },
    ],
  },
};
