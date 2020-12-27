module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    pages: {
        'index': {
            entry: './src/pages/Home/main.js',
            template: 'public/index.html',
            title: 'Home',
            chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
        },
        'editor': {
            entry: './src/pages/Editor/main.js',
            template: 'public/index.html',
            title: 'Editor',
            chunks: [ 'chunk-vendors', 'chunk-common', 'editor' ]
        }
    },
   publicPath: process.env.NODE_ENV === 'production'
        ? '/better-contributions/'
        : '/',
}
