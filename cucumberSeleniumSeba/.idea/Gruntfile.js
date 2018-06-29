var path = require('path');

module.exports = function(grunt) {
  var desiredEnv = grunt.option('environment');
  var desiredLanguage = grunt.option('language');
  var desiredResolution = grunt.option('res');
  var options = {
    theme: 'bootstrap',
    output: 'test/report/features_report_' + grunt.option('tags') + '.html',
    debug: true,
    reportSuiteAsScenarios: true,
    launchReport: true,
    steps: 'stepDefinitions',
    metadata: {
      "Test Environment": desiredEnv
      }
    };

    grunt.initConfig({
        env: {
          localChrome: {
            PLATFORM: 'localChrome',
            BASEURL: desiredEnv,
            LANG: desiredLanguage,
            RES: desiredResolution
          },
          localFirefox: {
            PLATFORM: 'localFirefox',
            BASEURL: desiredEnv,
            LANG: desiredLanguage
          }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'package.json',
                'tasks/*.js',
                'features/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        cucumberjs: {
            options: options,
            src: ['features']
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-cucumberjs');

    grunt.registerTask('local-chrome', ['env:localChrome', 'cucumberjs']);
    grunt.registerTask('local-firefox', ['env:localFirefox', 'cucumberjs']);

};
