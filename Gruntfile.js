
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  var LIVERELOAD_PORT = 35729;
  var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      files: [
        'lib/**/*',
        'styles/**/*',
        'assets/**/*',
        'test/**/*.coffee',
        'test/app/src/*',
        'test/app/styles/*',
        'test/app/**/*.html',
      ],
      tasks: [
        'build',
        // 'mochaTest'
      ]
    },
    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec',
    //       require: 'coffee-script/register'
    //     },
    //     src: [
    //       'test/**/*.coffee'
    //     ]
    //   }
    // },
    connect: {
      options: {
        hostname: '0.0.0.0',
        port: 9000
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'test/app')
            ];
          }
        }
      }
    },
    coffee: {
      build: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: '**/*.coffee',
          dest: './build',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/lib',
          src: '**/*.coffee',
          dest: './test/app/test',
          ext: '.js'
        }]
      }
    },
    uglify: {
      dist: {
        options: {
          mangle: true,
          compress: true,
          beautify: true
        },
        files: {
          'dist/js-class-diagrams.js': [
            'build/init.js',
            'build/class-block.js',
            'build/renderer.js',
            'build/parser.js',
            'build/models/*',
            'build/views/*',
            'build/collections/*',
            'build/jcd.js'
          ]
        }
      },
      test: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'test/app/lib/js-class-diagrams/js-class-diagrams.js': [
            'build/init.js',
            'build/class-block.js',
            'build/renderer.js',
            'build/parser.js',
            'build/models/*',
            'build/views/*',
            'build/collections/*',
            'build/jcd.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: './styles',
          dest: './dist',
          ext: '.css',
          src: [ '*.scss' ]
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: './styles',
          dest: './test/app/lib/js-class-diagrams',
          ext: '.css',
          src: [ '*.scss' ]
        }]
      }
    },
    copy: {
      test: {
        files: [
          // {
          //   expand: true,
          //   dot: true,
          //   cwd: './node_modules',
          //   dest: './test/app/lib',
          //   src: [
          //     'mocha/mocha.js',
          //     'mocha/mocha.css',
          //     'chai/chai.js'
          //   ]
          // }
          {
            expand: true,
            dot: true,
            cwd: './assets',
            dest: './test/app/assets',
            src: [ '**/*' ]
          }
        ]
      }
    },
    clean: {
      build: [
        'build/*', 
        'dist/*'
      ],
      test: [
        'test/app/assets/*',
        'test/app/lib/js-class-diagrams/*'
      ]
    }
  });

  grunt.registerTask('build', [
    'clean:test',
    'clean:build',
    'coffee:build',
    'coffee:test',
    'uglify:test',
    'uglify:dist',
    'sass:test',
    'sass:dist',
    'copy:test'
  ]);

  grunt.registerTask('default', [
    'build',
    'connect:test',
    'watch'
  ]);

};
