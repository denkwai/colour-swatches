const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, './static/template.html'), inject: 'body' })],
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src/components'),
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            exportType: "string",
                            sourceMap: false
                        }
                    },
                    "sass-loader",
                ],
            }, ,
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src/css'),
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};