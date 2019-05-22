const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript');

const paths = {
    sass: ['./scss/**/*.scss'],
    tsFiles: ['app/**/*.ts']
};

const tsProject = ts.createProject('app/tsconfig.json');

/** COMPILE TS */
gulp.task('ts', () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());

    return (
        tsResult.js
            .pipe(gulp.dest('public'))
    );
});

gulp.task('watch-ts', () => {
    gulp.watch(paths.tsFiles, gulp.series('ts'));
});
/** END OF COMPILE TS */

gulp.task('nd', () => {
    const options = {
        script: 'bin/www',
        delayTime: 1,
        env: {
            'PORT': 3000
        }
    };
    return nodemon(options)
        .on('restart', (ev) => {
            console.log('Restarting...');
        });
});

gulp.task('default', (done) => {
    var stream = nodemon({
        script: 'bin/www'
        , ext: 'ts'
        , tasks: ['ts']
    })

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        })
});