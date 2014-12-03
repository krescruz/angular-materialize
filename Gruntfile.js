module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8000,
          useAvailablePort: true,
          hostname: '*',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('start_server', ['connect:server']);

};