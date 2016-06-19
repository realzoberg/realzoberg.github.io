module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/index.js',
                    'js/widgets/*.js'
                ],
                dest: 'build/js/production.js',
            }
        },
        uglify: {
            build: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images'
                }]
            }
        },
        less: {
          development: {
            options: {
              paths: ['assets/css']
            },
            files: {
              'build/css/production.css': 'less/widgets/*.less'
            }
          },
          production: {
            options: {
              paths: ['assets/css'],
              plugins: [
                new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                new (require('less-plugin-clean-css'))()
              ]
            },
            files: {
              'build/css/production.css': 'less/widgets/*.less'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'less']);
};