var opts = {
  dev: {
    rootFile: "index.html",
    rootFolder: "debug",
    port: 8001
  },
  markup: {
    files: "src/markup/**/*.html",
    opts: { base: "src/markup" }
  },
  scripts: {
    files: "src/scripts/**/*.js",
    opts: { base: "src" }
  },
  styles: {
    files: "src/styles/**/*.css",
    opts: { base: "src" }
  },
  data: {
    files: ["src/data/**/*.[cj]son"],
    opts: { base: "src" }
  }
};

var gulp = require("gulp");
var connect = require("gulp-connect");
var rmdir  = require("rimraf");

function cbStreamError(error) {
  console.error(error);
  this.emit("end");
}

gulp.task("scripts", function() {
});

gulp.task("styles", function() {
});

gulp.task("data", function() {
});

gulp.task("markup", function () {
  return gulp.src(opts.markup.files, opts)
    .pipe(gulp.dest(opts.dev.rootFolder))
    .pipe(connect.reload())
});

gulp.task("watch", function() {
  gulp.watch(opts.markup.files, ["markup"]);
});

gulp.task("connect-dev", function() {
  connect.server({
    port: opts.dev.port,
    root: opts.dev.rootFolder,
    fallback: opts.dev.rootFile,
    livereload: true
  });
});

gulp.task("clean", function(cb) {
  var folders = [opts.dev.rootFolder];
  folders.forEach(function(folder) {
    rmdir(folder, function(e) {
      if (e) {
        console.error("Error: clean('" + folder + "'): " + e);
      }
    });
  });
  // call cb() arg as hint for subsequent dependent actions to wait for completion
  cb();
});

gulp.task("build", ["clean", "markup"]);
gulp.task("dev", ["build", "connect-dev", "watch"]);
gulp.task("default", ["dev"]);
