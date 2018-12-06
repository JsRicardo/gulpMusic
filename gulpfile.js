/* 
* @Author: Ricardo
* @Date:   2018-10-21 13:58:58
* @Last Modified by:   anchen
* @Last Modified time: 2018-12-05 14:25:37
*/

const gulp = require("gulp");

//压缩文件
const htmlClean = require("gulp-htmlclean"); //html
const imgMin = require("gulp-imagemin"); //压缩图片
const uglify = require("gulp-uglify"); //压缩js
const debug = require("gulp-strip-debug"); //清除调试语句
const less = require("gulp-less"); //编译less
const cssClean = require("gulp-clean-css"); //压缩css
const postCss = require("gulp-postcss"); //给css3属性加上前缀
const autoprofixer = require("autoprefixer"); //
const connect = require("gulp-connect"); //开启服务器
//const babel = require("gulp-babel");

const folder = {
  src: "src/",
  dist: "dist/"
};

//export NODE_ENV=development  设置环境变量  命令行中
let devMod = process.env.NODE_ENV == "development";

//gulp.task('任务名', 方法)   创建任务
//gulp.src(地址)  获取文件地址
//gulp.dest(地址) 输出文件到目标位置
//gulp.pipe() 管道，将任务加入到执行队列
//gulp.watch('监听文件地址', '文件改变执行的方法')  监听文件改变

gulp.task("html", function() {
  let pag = gulp
    .src(folder.src + "html/*") //找到源文件夹
    .pipe(connect.reload());
  if (devMod) {
    pag.pipe(htmlClean()); //压缩html
  }

  pag.pipe(gulp.dest(folder.dist + "html/")); //发布到目标文件夹
});

gulp.task("css", function() {
  let pag = gulp
    .src(folder.src + "css/*")
    .pipe(connect.reload())
    .pipe(less())
    .pipe(postCss([autoprofixer()]));
  if (devMod) {
    pag.pipe(cssClean());
  }

  pag.pipe(gulp.dest(folder.dist + "css/"));
});

gulp.task("js", function() {
  let pag = gulp.src(folder.src + "js/*").pipe(connect.reload());
  // .pipe(babel())
  //   pag.pipe(debug());
  if (devMod) {
    pag.pipe(uglify());
  }

  pag.pipe(gulp.dest(folder.dist + "js/"));
});

gulp.task("img", function() {
  gulp
    .src(folder.src + "images/*")
    .pipe(imgMin())
    .pipe(gulp.dest(folder.dist + "images/"));
});

gulp.task("server", function() {
  connect.server({
    port: "8060",
    livereload: true
  });
});

gulp.task("watch", function() {
  gulp.watch(folder.src + "html/*", ["html"]);
  gulp.watch(folder.src + "css/*", ["css"]);
  gulp.watch(folder.src + "js/*", ["js"]);
});

gulp.task("default", ["html", "js", "css", "img", "server", "watch"]);
