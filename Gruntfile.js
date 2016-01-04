module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    jshint: {
     files: ['public/js/*.js', 'public/projects/**/*.js'],
     options: {
       globals: {
         jQuery: true
       }
     }
   },
    watch: {
      css: {
        files: ['public/css/index.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/js/*.js', 'public/projects/**/*.js'],
        tasks: ['jshint']
      },
    },
  }
);
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['cssmin', 'watch', 'jshint']);
};
