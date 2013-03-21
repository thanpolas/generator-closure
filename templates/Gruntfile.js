/*jshint camelcase:false */
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var compiler = require('superstartup-closure-compiler'),
    path     = require('path');


var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(path.resolve(dir));
};

module.exports = function (grunt) {

  //
  //
  // Configure tasks
  //
  //
  //

  // The folder that contains all the externs files.
  var EXTERNS_PATH = 'build/externs/';

  // define the main namespace of your app
  var ENTRY_POINT = 'app';

  // The path to the closure library
  var CLOSURE_LIBRARY = 'app/closure-library';

  // the compiled file
  var DEST_COMPILED = 'app/jsc/app.js';

  // define the path to the app
  var APP_PATH = 'app/js';

  // the file globbing pattern for vendor file uglification.
  var vendorFiles = [
    // all files JS in vendor folder
    APP_PATH + '/vendor/*.js',

    // and do not include jQuery, we'll use a CDN for it.
    '!' + APP_PATH + '/vendor/jQuery*'
  ];

  // The location of the source map
  var SOURCE_MAP = 'app/jsc/sourcemap.js.map';

  // This sting will wrap your code marked as %output%
  // Take care to edit the sourcemap path
  var OUTPUT_WRAPPER = '(function(){%output%}).call(this);' +
    '//@sourceMappingURL=/jsc/sourcemap.js.map';


  //
  //
  // Start Gruntconfig
  //

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      livereload: {
        files: [
          APP_PATH + '/**/*.js'
        ],
        tasks: ['livereload']
      },
      test: {
        files: [
          APP_PATH + '/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        keepalive: false
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [ lrSnippet, mountFolder(connect, 'app')];
          }
        }
      },
      test: {
        options: {
          port: 4242,
          base: './',
          keepalive: false
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%%= connect.test.options.port %>/test/'
      }
    },

    mocha: {
      all: {
        options: {
          run: true,
          ignoreLeaks: false,
          urls: [
            'http://localhost:<%%= connect.test.options.port %>/test/index.html',
            'http://localhost:<%%= connect.test.options.port %>/test/index.html?compiled=true',
            'http://localhost:<%%= connect.test.options.port %>/test/index.html?unit=true'
          ]
        }
      }
    },


    //
    //
    //
    // Closure Tools Tasks
    //
    // Dependency & Compiling
    //
    //
    //
    closureDepsWriter: {
      options: {
        closureLibraryPath: CLOSURE_LIBRARY

      },
      app: {
        options: {
          root_with_prefix: ['"' + APP_PATH + ' ../../../js"']
        },
        dest: '' + APP_PATH + '/deps-app.js'
      },
      bddTest: {
        options: {
          root_with_prefix: ['"test ../../../../../test"']
        },
        dest: 'test/bdd/deps-test-bdd.js'
      },
      unitTest: {
        options: {
          root_with_prefix: ['"test ../../../../../test"']
        },
        dest: 'test/unit/deps-test-tdd.js'
      }
    },
    closureBuilder: {
      options: {
        closureLibraryPath: CLOSURE_LIBRARY,
        inputs: [APP_PATH + '/main.js'],
        compile: true,
        compilerFile: compiler.getPathSS(),
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          externs: [EXTERNS_PATH + '*.js'],
          define: [
            '\'goog.DEBUG=false\''
            ],
          warning_level: 'verbose',
          jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          only_closure_dependencies: null,
          closure_entry_point: ENTRY_POINT,
          create_source_map: SOURCE_MAP,
          source_map_format: 'V3',
          output_wrapper: OUTPUT_WRAPPER

        }
      },
      app: {
        src: [APP_PATH, CLOSURE_LIBRARY],
        dest: 'temp/compiled.js'
      },
      debug: {
        options: {
          compilerFile: compiler.getPath()
        },
        src: [APP_PATH, CLOSURE_LIBRARY],
        dest: 'temp/compiled.debug.js'
      }
    },

    // clean, uglify and concat aid in building
    clean: {
      dist: ['temp'],
      server: 'temp'
    },
    uglify: {
      vendor: {
        files: {
          'temp/vendor.js': vendorFiles
        }
      }
    },
    concat: {
        production: {
          src: ['temp/vendor.js', 'temp/compiled.js'],
          dest: DEST_COMPILED
        }
    },




    //
    //
    //
    // Optional boilerplate tasks
    //
    //
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: 'temp/styles',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: 'app/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
  },
  imagemin: {
    dist: {
      files: [{
        expand: true,
        cwd: 'app/images',
        src: '{,*/}*.{png,jpg,jpeg}',
        dest: '<%%= yeoman.dist %>/images'
      }]
    }
  },
  cssmin: {
    dist: {
      files: {
        '<%%= yeoman.dist %>/styles/main.css': [
          'temp/styles/{,*/}*.css',
          'app/styles/{,*/}*.css'
        ]
      }
    }
  }
  });

  //
  //
  // initConfig END
  //
  // Register tasks
  //
  //

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'livereload-start',
        'connect:test',
        'open:test',
        'watch:test'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'livereload-start',
      'connect:livereload',
      'open:server',
      'watch:livereload'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'uglify:vendor',
    'closureBuilder:app',
    'concat:production'
  ]);

  grunt.registerTask('deps', [
    'closureDepsWriter:app',
    'closureDepsWriter:bddTest',
    'closureDepsWriter:unitTest'
  ]);

  grunt.registerTask('default', [
      'deps'
  ]);

};
