const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports={
    mode: 'development',
    devServer: {
        port:3000,
    },
    webpack: {
        alias: {
            '@style': resolvePath('./src/style'),
            '@redux': resolvePath('./src/redux'),
            '@components': resolvePath('./src/pages/components')
        }
    },
}