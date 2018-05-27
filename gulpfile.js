"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var plumber = require("gulp-plumber");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename")
var server = require("browser-sync").create();
var run = require("run-sequence");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pump = require("pump");

gulp.task ("clean", function () {
  return del("build");
});

gulp.task ("copy", function() {
  return gulp.src ([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*.{svg,jpeg}",
    "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
})

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 75}))
  .pipe(gulp.dest("build/img"));
})

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
})

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
})

// gulp.task("compress", function (cb) {
//   pump([
//     gulp.src("source/*.js"),
//     uglify(),
//     gulp.dest("build/")
//     ],
//     cb
//   );
// });

gulp.task("compress", function () {
    gulp.src("source/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build"));
})

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "webp",
    "sprite",
    "html",
    "compress",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});
