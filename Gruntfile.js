
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    watch: {
      files: [
        'lib/**/*',
        'test/**/*',
      ],
      tasks: [
        'mochaTest'
      ]
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coffee-script/register'
        },
        src: [
          'test/**/*.coffee'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'mochaTest',
    'watch'
  ]);

};
