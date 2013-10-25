/*jshint camelcase:false */
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
//
var compiler = require('superstartup-closure-compiler');
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  //
  //
  // Config basic parameters
  //
  //
  //
  var CONF = {
    // the base file of your project. The full path will result by concatenating
    // appPath + bootstrapFile
    bootstrapFile: 'main.js',

    // The folder that contains all the externs files.
    externsPath: 'build/externs/',

    // define the main namespace of your app.
    entryPoint: 'app',

    // The path to the closure library
    closureLibrary: process.env.CLOSURE_PATH || '<%= closure.closurePath %>closure-library',

    // The path to the closure linter.
    closureLinter: '<%= closure.closurePath %>closure-linter/closure_linter',

    // The path to the installed bower components
    componentPath: '<%= closure.closurePath %>components',

    // the compiled file
    destCompiled: '<%= closure.closurePath %>jsc/app.js',

    // define the path to the app
    appPath: '<%= closure.closurePath %>js/',

    // The location of the source map
    sourceMap: '<%= closure.closurePath %>jsc/sourcemap.js.map',

    // This sting will wrap your code marked as %output%
    // Take care to edit the sourcemap path
    outputWrapper: '(function(){%output%}).call(this);' +
      '//@sourceMappingURL=<%= closure.closurePath %>jsc/sourcemap.js.map'
  };

  // the file globbing pattern for vendor file uglification.
  CONF.vendorFiles = [
      // all files JS in vendor folder
      CONF.appPath + '/vendor/*.js',

      // and do not include jQuery, we'll use a CDN for it.
      '!' + CONF.appPath + '/vendor/jQuery*'
    ];



  //
  //
  // Start Gruntconfig
  //
  //
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // show elapsed time at the end
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          CONF.appPath + '/**/*.js'
        ],
      },
      test: {
        options: {
          livereload: true
        },
        files: [
          CONF.appPath + '/**/*.js',
          'test/**/*.js'
        ],
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        keepalive: false,
      },
      app: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, './app'),
              mountFolder(connect, CONF.closureLibrary),
            ];
          },
        },
      },
      test: {
        options: {
          port: 4242,
          middleware: function(connect) {
            return [
              mountFolder(connect, './'),
              mountFolder(connect, CONF.closureLibrary),
            ];
          },
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
        closureLibraryPath: CONF.closureLibrary
      },
      app: {
        options: {
          root_with_prefix: [
            '"' + CONF.appPath + ' ../../../<%= closure.sourceRel %>"',
            '"' + CONF.componentPath + ' ../../../components"'
          ]
        },
        dest: '' + CONF.appPath + '/deps.js'
      },
      bddTest: {
        options: {
          root_with_prefix: [
            '"test ../../../../../test"',
            '"' + CONF.appPath + ' ../../../<%= closure.sourceRel %>"',
            '"' + CONF.componentPath + ' ../../../components"'
          ]
        },
        dest: 'test/bdd/deps-test-bdd.js'
      },
      unitTest: {
        options: {
          root_with_prefix: [
            '"test ../../../../../test"',
            '"' + CONF.appPath + ' ../../../<%= closure.sourceRel %>"',
            '"' + CONF.componentPath + ' ../../../components"'
          ]
        },
        dest: 'test/unit/deps-test-tdd.js'
      }
    },
    closureBuilder: {
      options: {
        closureLibraryPath: CONF.closureLibrary,
        inputs: [CONF.appPath + CONF.bootstrapFile],
        compile: true,
        compilerFile: compiler.getPathSS(),
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          externs: [CONF.externsPath + '*.js'],
          define: [
            '\'goog.DEBUG=false\''
          ],
          warning_level: 'verbose',
          jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          only_closure_dependencies: null,
          closure_entry_point: CONF.entryPoint,
          create_source_map: CONF.sourceMap,
          source_map_format: 'V3',
          output_wrapper: CONF.outputWrapper

        }
      },
      app: {
        src: [
          CONF.appPath,
          CONF.closureLibrary,
          CONF.componentPath
        ],
        dest: 'temp/compiled.js'
      },
      debug: {
        options: {
          compilerFile: compiler.getPath()
        },
        src: [
          CONF.appPath,
          CONF.closureLibrary,
          CONF.componentPath
        ],
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
          'temp/vendor.js': CONF.vendorFiles
        }
      }
    },
    concat: {
      production: {
        src: ['temp/vendor.js', 'temp/compiled.js'],
        dest: CONF.destCompiled
      }
    },


    //
    //
    //
    // Optional boilerplate tasks
    //
    //
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'app/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'app/styles/main.css': [
            'temp/styles/{,*/}*.css',
            'app/styles/{,*/}*.css'
          ]
        }
      }
    },

    // Linting tasks.

    closureLint: {
      app:{
        closureLinterPath : CONF.closureLinter,
        src: [
          'app/js/**'
        ],
        options: {
          stdout: true,
          strict: true
        }
      }
    },
    closureFixStyle: {
      app:{
        closureLinterPath : CONF.closureLinter,
        src: [
          'app/js/**'
        ],
        options: {
          stdout: true,
          strict: true
        }
      }
    }
  }); // end grunt.initConfig();



  //
  //
  // initConfig END
  //
  // Register tasks
  //
  //
  grunt.registerTask('server', function (target) {
    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'connect:test',
        'open:test',
        'watch:test'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'connect:app',
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

  grunt.registerTask('lint', [
    'closureLint:app'
  ]);

  grunt.registerTask('fixstyle', [
    'closureFixStyle:app'
  ]);
};
