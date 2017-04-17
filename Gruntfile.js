module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                tsconfig: true,
                watch: "app/**/*.ts"
            }
        },
        exec: {
            tscw: {
                command: "tsc -w"
            }
        },
        copy: {
            html: {
                expand: true,
                src: 'app/**/*.template.html',
                dest: 'views/',
                flatten:true
            }
        },
        clean:{
            views:['views/']
        },
        watch: {
            html:{
                files: ['app/**/*.template.html'],
                tasks: ['copy:html']
            }
        },
        concurrent: {
            task: ['ts', 'watch:html'],
            options: {
				logConcurrentOutput: true
			}
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    // grunt.registerTask('default', ['exec']);
    grunt.registerTask('default', ['clean:views','copy:html','concurrent:task']);

};