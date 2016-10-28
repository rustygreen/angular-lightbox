const gulp = require('gulp');
const gulpDocs = require('gulp-ngdocs');
const path = require('path');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const config = {
  paths: {
    dist: '../dist/client',
    docsDist: '../dist/client/docs'
  }
};
const options = {
  html5Mode: false,
  startPage: '/dev',
  title: 'Transcend Docs',
  template: 'index.tmpl',
  styles: [
    './styles/docs.css',
    '//js.arcgis.com/3.17/esri/css/esri.css'
  ],
  scripts: [
    // Note, this needs to match with ngdocs config in the generic transcend module's Gruntfile.
    config.paths.dist + '/' + config.combinedScriptsFile,
    '//js.arcgis.com/3.17/init.js',
    '//git/projects/JS/repos/lib-anychart/browse/AnyChart.js?at=refs%2Fheads%2Fmaster&raw',
    '//git/projects/JS/repos/lib-anychart/browse/AnyChartHTML5.js?at=refs%2Fheads%2Fmaster&raw'
  ],
  analytics: {
    account: 'UA-55413605-8'
  }
  //loadDefaults: {
  //  angular: false,
  //  angularAnimate: false
  //}
};

gulp.task('clean', function () {
  return gulp.src(config.paths.dist)
    .pipe(clean({force: true}));
});

gulp.task('clean-up', ['ngdocs', 'copy'], function () {
  return gulp.src([config.paths.dist + '/' + config.combinedScriptsFile])
    .pipe(clean({force: true}));
});

gulp.task('scripts', function () {
  // Js.
  return gulp.src(config.scripts)
    .pipe(concat(config.combinedScriptsFile))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('ngdocs', ['clean', 'less', 'scripts'], function () {
  return gulpDocs.sections({
    api: {
      glob: ['./src/api/**/*.ngdoc', './bower_components/transcend-*/*.*'],
      title: 'API Reference'
    },
    dev: {
      glob: ['./src/dev/**/*.ngdoc'],
      title: 'Developer Reference'
    },
    gitflows: {
      glob: ['./src/git/**/*.ngdoc'],
      title: 'Git Workflows'
    }
  })

  //  return gulp.src(['./bower_components/transcend-*/*.*'])
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest(config.paths.docsDist));
});

// gulp.task('copy-includes', ['ngdocs'], function () {
//   return gulp.src('./includes/**/*.*')
//     .pipe(gulp.dest(config.paths.docsDist));
// });
//
// gulp.task('copy-bs-fonts', ['ngdocs'], function () {
//   return gulp.src(['./bower_components/bootstrap/fonts/*.*', './bower_components/components-font-awesome/fonts/*.*'])
//     .pipe(gulp.dest(config.paths.docsDist + '/css/fonts'));
// });
//
// gulp.task('copy-tss-fonts', ['ngdocs'], function () {
//   return gulp.src('./bower_components/transcend-themes/fonts/*.*')
//     .pipe(gulp.dest(config.paths.docsDist + '/css/themes/fonts'));
// });
//
// gulp.task('copy-ui-grid-fonts', ['ngdocs'], function () {
//   return gulp.src(['./bower_components/angular-ui-grid/*.svg', './bower_components/angular-ui-grid/*.ttf', './bower_components/angular-ui-grid/*.woff', './bower_components/angular-ui-grid/*.eot'])
//     .pipe(gulp.dest(config.paths.docsDist + '/css/styles'));
// });
//
// gulp.task('sync', ['clean-up'], function () {
//   if (!args[config.syncDirArg]) {
//     throw new Error('No \'' + config.syncDirArg + '\' argument passed to sync to')
//   }
//
//   return gulp.src(config.paths.docsDist + '/**/*.*')
//     .pipe(gulp.dest(args[config.syncDirArg]));
// });

gulp.task('build', ['ngdocs']);
gulp.task('default', ['build']);
