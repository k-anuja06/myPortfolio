const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const fs = require('fs');
const path = require('path');

// Minify CSS
gulp.task('minify-css', function () {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/css'));
});

// Minify JS
gulp.task('minify-js', function () {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/js'));
});

// Minify Service-Worker
gulp.task('minify-sw', function() {
  return gulp.src('service-worker.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist'))
})

// Optimize JPG Images
gulp.task('optimize-jpg', async function () {
  const imagemin = await import('imagemin');
  const mozjpeg = await import('imagemin-mozjpeg');

  await imagemin.default(['assets/images/*.jpg'], {
    destination: 'dist/assets/images',
    plugins: [mozjpeg.default({ quality: 75 })]
  });
});


// Optimize PNG Images
gulp.task('optimize-png', async function () {
  const imagemin = await import('imagemin');
  const pngquant = await import('imagemin-pngquant');

  await imagemin.default(['assets/images/*.png'], {
    destination: 'dist/assets/images',
    plugins: [pngquant.default({ quality: [0.6, 0.8] })]
  });
});



// Optimize SVG Images
gulp.task('optimize-svg', async function () {
  const imagemin = await import('imagemin');
  const svgo = await import('imagemin-svgo');

  await imagemin.default(['assets/images/*.svg'], {
    destination: 'dist/assets/images',
    plugins: [svgo.default()]
  });
});

// Copy Favicon
gulp.task('copy-favicon1', function () {
  return gulp.src('assets/favicon/favicon.svg')
    .pipe(gulp.dest('dist/assets/favicon'));
});

gulp.task('copy-favicon2', function () {
  return gulp.src('assets/favicon/apple-touch-icon.png')
    .pipe(gulp.dest('dist/assets/favicon'));
});

gulp.task('copy-favicon3', function () {
  return gulp.src('assets/favicon/favicon-96x96.png')
    .pipe(gulp.dest('dist/assets/favicon'));
});

gulp.task('copy-favicon4', function () {
  return gulp.src('assets/favicon/favicon.ico')
    .pipe(gulp.dest('dist/assets/favicon'));
});

gulp.task('copy-favicon5', function () {
  return gulp.src('assets/favicon/web-app-manifest-192x192.png')
    .pipe(gulp.dest('dist/assets/favicon'));
});

gulp.task('copy-favicon6', function () {
  return gulp.src('assets/favicon/web-app-manifest-512x512.png')
    .pipe(gulp.dest('dist/assets/favicon'));
});


// Copy Fonts 
gulp.task('copy-font1', function () {
  return gulp.src('assets/fonts/segoeui-subset.woff2')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy-font2', function () {
  return gulp.src('assets/fonts/segoeuib-subset.woff2')
    .pipe(gulp.dest('dist/assets/fonts'));
});


// Minify HTML
gulp.task('minify-html', function () {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Watch Task
gulp.task('watch', function () {
  gulp.watch('assets/css/*.css', gulp.series('minify-css'));
  gulp.watch('assets/js/*.js', gulp.series('minify-js'));
  gulp.watch('service-worker.js', gulp.series('minify-sw'));
  gulp.watch('assets/images/*.jpg', gulp.series('optimize-jpg'));
  gulp.watch('assets/images/*.png', gulp.series('optimize-png'));
  gulp.watch('assets/images/*.svg', gulp.series('optimize-svg'));
  gulp.watch('index.html', gulp.series('minify-html'));
});

// Default Task
gulp.task('default',
  gulp.parallel('minify-css', 'minify-js','minify-sw', 'optimize-jpg', 'optimize-png', 'optimize-svg', 'copy-favicon1', 'copy-favicon2','copy-favicon3','copy-favicon4','copy-favicon5','copy-favicon6', 'copy-font1', 'copy-font2', 'minify-html', 'watch')
);

