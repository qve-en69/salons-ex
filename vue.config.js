/**/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const NODE_ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';
module.exports = {
    lintOnSave: true,

    css: {
        extract: NODE_ENV === 'development',
        loaderOptions: {
            scss: {
                prependData: `@import "@/UI/assets/scss/const/const.scss";`,
            },
        },
    },

    transpileDependencies: [
      'vuetify'
    ]
};
