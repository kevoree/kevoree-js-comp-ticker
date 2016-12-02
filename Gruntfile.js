'use strict';

var pkg = require('./package.json');
var webpackConfig = require('./webpack.config');

module.exports = function gruntHandler(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: pkg.babel,
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.js'],
            dest: 'dist',
            ext: '.js'
          }
        ]
      }
    },

    kevoree: {
      main: {
        options: {
          localModel: 'kevlib.json'
        }
      }
    },

    kevoree_genmodel: {
      main: {
        options: {}
      }
    },

    kevoree_registry: {
      main: {
        src: 'kevlib.json',
        options: {}
      }
    },

    webpack: {
      main: webpackConfig
    }
  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['babel', 'kevoree_genmodel', 'webpack']);
  grunt.registerTask('kev', ['build', 'kevoree']);
  grunt.registerTask('publish', ['build', 'kevoree_registry']);
};
