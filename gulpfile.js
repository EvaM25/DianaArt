const{src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const image = require('gulp-image');
const htmlMin = require('gulp-htmlmin');
const webp = require('gulp-webp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const typograf = require('gulp-typograf');
const rollup = require('gulp-better-rollup');
const imagemin = require('gulp-imagemin');


// const svgSprites = () => {
// 	try {
// 	  return src('./src/img/*.svg')
// 		.pipe(svgSprite({
// 		  mode: {
// 			stack: {
// 			  sprite: '../sprite.svg'
// 			}
// 		  }
// 		}))
// 		.pipe(dest('./app/img'));
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }


const styles = () => {
	return src('./src/scss/**/*.scss')
	    .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
			grid: true,
			overrideBrowserslist: ["last 5 versions"]
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(browserSync.stream());
}

const htmlInclude = () => {
	return src(['./src/index.html'])
	    .pipe(fileInclude({
			prefix: '@', 
            basepath: '@file'
		}))
		.pipe(typograf({
			locale: ['ru', 'en-US']
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}

const htmlIncludeMinify = () => {
	return src(['./src/index.html'])
	    .pipe(fileInclude({
			prefix: '@', 
            basepath: '@file'
		}))
		.pipe(typograf({
			locale: ['ru', 'en-US']
		}))
		.pipe(htmlMin({
			collapseWhitespace: true,
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}
 
 
const imgToApp = () => {
	return src (['./src/img/**.{jpg, png, jpeg}'])
	    .pipe(dest('./app/img'))
}

const imgMin = () => {
	return src('./src/img/**.{jpg,png,jpeg}')
	.pipe(imagemin([
		imagemin.optipng({
			optimizationLevel: 3
		}),
		imagemin.mozjpeg({
			progressive: true
		}),
		imagemin.svgo()
	]))
	.pipe(dest('./app/img'));
}

const webpImages = () => {
	return src('./src/img/*.{jpg,png,jpeg}',  { encoding: false })
	.pipe(webp())
	.pipe(dest('app/img'));
}

const resources = () => {
	return src('./src/resources/**')
		.pipe(dest('./app'))
}

const clean = () => {
	return del(['app/*'])
}

const scripts = () => {
	return src('./src/js/index.js')
		.pipe(sourcemaps.init())
		.pipe(rollup({input: './src/js/index.js'
	     },'umd'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify().on('error', notify.onError()))
		.pipe(sourcemaps.write())
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream())
}


const watchFiles = () => {
	browserSync.init({
        server:{
            baseDir: './app'
        }
    });

	watch('./src/scss/**/*.scss', styles);
	watch('./src/index.html', htmlInclude);
	watch('./src/partials/*.html', htmlInclude);
	watch('./src/img/**.jpg', imgToApp);
	watch('./src/img/**.png', imgToApp);
	watch('./src/img/**.jpeg', imgToApp);
	watch('./src/img/**', imgMin),
	watch('./src/img/**', webpImages),  
	watch('./src/resources/**', resources);
	watch('./src/js/*.js', scripts);
}


exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileInclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, resources, imgToApp, imgMin, webpImages),styles, watchFiles);

// const htmlMinify = () => {
//     return src('./src/**/*.html')
//     .pipe(htmlMin({
//         collapseWhitespace: true,
//     }))
//     .pipe(dest('./app'))
// }

const images = () => {
	return src([
	 './src/img/**/*.{jpg,png,jpeg}'
	])
	.pipe(image())
	.pipe(dest('./app/img'))
 }

const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
			grid: true,
			overrideBrowserslist: ["last 5 versions"]
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
	return src('./src/js/index.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify().on('error', notify.onError()))
		.pipe(dest('./app/js'))
}

// exports.build = series(clean, htmlInclude, scriptsBuild, stylesBuild, resources, images, imgToApp, imgMin,webpImages, htmlMinify);
exports.build = series(clean, htmlIncludeMinify, scriptsBuild, stylesBuild, resources, imgMin, webpImages);

const deploy = () => {
	let conn = ftp.create({
		host: '',
		user: '',
		password: '',
		parallel: 10,
		log: gutil.log
	});

	let globs = [
		'app/**',
	];

	return src(globs, {
			base: './app',
			buffer: false
		})
		.pipe(conn.newer(''))

		.pipe(conn.dest(''));
}

exports.deploy = deploy;