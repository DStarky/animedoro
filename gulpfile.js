const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");

function htmlminify() {
  return src("src/html/main.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(concat("index.html"))
    .pipe(dest("src"));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/css/main.scss")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 6 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
  watch(["src/css/*.scss"], styles);
  watch(["src/js/main.js"], scripts);
  watch(["src/html/main.html"], htmlminify);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "src/css/style.min.css",
      "src/js/main.min.js",
      "src/*.html",
      "src/assets/images/*.*",
      "src/assets/fonts/*.*",
    ],
    { base: "src" }
  ).pipe(dest("./dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.htmlminify = htmlminify;
exports.clean = cleanDist;

exports.build = series(cleanDist, building);
exports.default = parallel(htmlminify, styles, scripts, watching);
