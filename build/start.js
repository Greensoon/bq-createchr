const config = require('../webpack.config')
const webpack = require('webpack')
const compiler = webpack(config)
const env = process.env.NODE_ENV

const watching = compiler.run((err, stats) => {
    if(err) console.log('监听出错 :: ', err)
    console.log('=========>>> 监听开始 <<<=======')
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }))

    // require('./background')
    require('./manifest')()
    console.log('==========>>> 监听中 <<<=========')

    if(env === 'production') {
        watching.close(() => {
            console.log('========>>> 文件输出完成 关闭监听 ========>>>')
        })
    }
})