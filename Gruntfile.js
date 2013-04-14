/*jshint camelcase:false */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    release: {
      options: {
        bump: true, //default: true
        file: 'package.json', //default: package.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: true, //default: true
        tagName: 'v<%= version %>', //default: '<%= version %>'
        commitMessage: 'releasing v<%= version %>', //default: 'release <%= version %>'
        tagMessage: 'v<%= version %>' //default: 'Version <%= version %>'
      }
    }
  });

};
