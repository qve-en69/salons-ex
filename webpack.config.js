const VueWithTSXRegex = /Tsx\.vue$/
const VueWithoutTSXRegex = /(^|[^x]|[^s]x|[^T]sx)\.vue$/

module.exports = {
    entry: './main.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', 'Tsx.vue', '.json'],
    },
    module: {
        rules:
        // vue-loader options
            ((opts) => [
                Object.assign({}, opts, {test: VueWithTSXRegex}),
                Object.assign({}, opts, {test: VueWithoutTSXRegex}),
            ])({
                loader: 'vue-loader',
                options: {
                    loaders: {
                        "ts": "babel-loader!ts-loader",
                        "tsx": "babel-loader!ts-loader",
                    }
                }
            })
                // ts-loader options
                .concat(
                    ((opts) => [
                        Object.assign({}, opts, {test: /\.ts$/}),
                        Object.assign({}, opts, {test: /\.tsx$/}),
                    ])({
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [VueWithoutTSXRegex],
                            appendTsxSuffixTo: [VueWithTSXRegex],
                        }
                    })
                )
                // other options
                .concat([
                ])

    },
}