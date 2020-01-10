const gulp = require("gulp")
const connect = require("gulp-connect")
const proxy = require("http-proxy-middleware")
const sass = require("gulp-sass")



// 找路径，转存
function indexFn() {
    return gulp.src("src/*.html").pipe(gulp.dest("server")).pipe(connect.reload())
}

exports.index = indexFn;

// 监听指定路径，改变后执行指定函数
function watchFn() {
    gulp.watch(["src/*.html"], indexFn)
}
exports.watch = watchFn;

function serverFn() {
    connect.server({
        root: "server",
        port: "83",
        livereload: true,
        // 跨域代理
        // middleware: function (connect, opt) {
        //     return [
        //         proxy('/asd', {
        //             target: 'https://localhost:83',    //代理的目标地址
        //             changeOrigin: true,
        //             pathRewrite: {    //路径重写规则
        //                 '^/asd': ''
        //             }
        //         })
        //     ]
        // }
    })
}

exports.server = serverFn;

exports.serverWatch = gulp.parallel(serverFn, watchFn);



function sassFn() {

    return gulp.src("src/sass/style.scss").pipe(sass()).pipe(gulp.dest("server/css"))
};

exports.sass = sassFn;

function cssFn() {
    return gulp.src("src/sass/*").pipe(sass()).pipe(gulp.dest("server/css"))
}

exports.csf = cssFn;

function libsFn() {
    return gulp.src("src/libs/*").pipe(gulp.dest("server/libs"))
}

function jsonFn() {
    return gulp.src("src/*.json").pipe(gulp.dest("server"))

}

function watchSass() {
    serverFn();
    gulp.watch(["src/sass/style.scss"], sassFn)
    gulp.watch(["src/sass/*"], cssFn)
    gulp.watch(["src/sass/*"], indexFn)
    gulp.watch(["src/*.html"], libsFn)
    gulp.watch(["src/libs/*.js"], libsFn)
    gulp.watch(["src/*.json"], jsonFn)
    gulp.watch(["src/*.html"], indexFn)
    watchFn();
};

exports.wSass = watchSass;






