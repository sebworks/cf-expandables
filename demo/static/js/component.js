module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);

  var path = require('path');
  var extend = require('node.extend');


  /**
   * Load the tasks we want to use, which are specified as dependencies in
   * the package.json file of cf-grunt-config.
   */

  // Loads all Grunt tasks in the node_modules directory within the new CWD.
  require('jit-grunt')(grunt, {
    // Below line needed because task name does not match package name
    bower: 'grunt-bower-task'
  })({
    // Options
    pluginsRoot: 'node_modules/cf-grunt-config/node_modules'
  });


  /**
   * Initialize a variable to represent the Grunt task configuration.
   */
  var config = {

    // Define a couple of utility variables that may be used in task options.
    pkg: grunt.file.readJSON('bower.json'),
    env: process.env,
    opt: {
      // Include path to compiled extra CSS for IE7 and below.
      // Definitely needed if this component depends on an icon font.
      // ltIE8Source: 'static/css/main.lt-ie8.min.css',

      // Include path to compiled alternate CSS for IE8 and below.
      // Definitely needed if this component depends on media queries.
      // ltIE9AltSource: 'static/css/main.lt-ie9.min.css',

      // Set whether or not to include html5shiv for demoing a component.
      // Only necessary if component patterns include new HTML5 elements
      html5Shiv: true,

      // Set whether you'd like to use a JS hack to force a redraw in the browser
      // to avoid an IE8 bug where fonts do not appear or appear as boxes on load.
      // ie8FontFaceHack: true,

      // Set a path to a concatenated JS file that you'd like to add before the
      // closing body tag.
      // jsBody: 'static/js/component.min.js',

      // Here's a banner with some template variables.
      // We'll be inserting it at the top of minified assets.
      banner: grunt.file.read('./node_modules/cf-grunt-config/cfpb-banner.txt'),
    },

    // Define tasks specific to this project here
    less: {
      core: {
        options: {
          paths: grunt.file.expand('src/**'),
          sourceMap: true
        },
        files: {
          'demo/static/css/main.css': [
            'src/cf-core.less'
          ]
        }
      }
    },

  };


  /**
   * Define a function that, given the path argument, returns an object
   * containing all JS files in that directory.
   */
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
      grunt.verbose.writeln("External config item - " + key);
    });

    return object;
  }


  /**
   * Combine the config variable defined above with the results of calling the
   * loadConfig function with the given path, which is where our external
   * task options get installed by npm.
   */
  config = extend(true, loadConfig('./node_modules/cf-grunt-config/tasks/options/'), config);

  grunt.initConfig(config);


  /**
   * Load any project-specific tasks installed in the customary location.
   */
  require('load-grunt-tasks')(grunt);


  /**
   * Create custom task aliases for our component build workflow.
   */
  grunt.registerTask('vendor', ['copy:component_assets', 'copy:docs_assets']);
  grunt.registerTask('default', ['less:core', 'autoprefixer', 'copy:docs', 'topdoc']);

};

module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);

  var path = require('path');
  var extend = require('node.extend');


  /**
   * Load the tasks we want to use, which are specified as dependencies in
   * the package.json file of cf-grunt-config.
   */

  // Loads all Grunt tasks in the node_modules directory within the new CWD.
  require('jit-grunt')(grunt, {
    // Below line needed because task name does not match package name
    bower: 'grunt-bower-task'
  })({
    // Options
    pluginsRoot: 'node_modules/cf-grunt-config/node_modules'
  });


  /**
   * Initialize a variable to represent the Grunt task configuration.
   */
  var config = {

    // Define a couple of utility variables that may be used in task options.
    pkg: grunt.file.readJSON('bower.json'),
    env: process.env,
    opt: {
      // Include path to compiled extra CSS for IE7 and below.
      // Definitely needed if this component depends on an icon font.
      // ltIE8Source: 'static/css/main.lt-ie8.min.css',

      // Include path to compiled alternate CSS for IE8 and below.
      // Definitely needed if this component depends on media queries.
      // ltIE9AltSource: 'static/css/main.lt-ie9.min.css',

      // Set whether or not to include html5shiv for demoing a component.
      // Only necessary if component patterns include new HTML5 elements
      html5Shiv: true,

      // Set whether you'd like to use a JS hack to force a redraw in the browser
      // to avoid an IE8 bug where fonts do not appear or appear as boxes on load.
      ie8FontFaceHack: true,

      // Set a path to a concatenated JS file that you'd like to add before the
      // closing body tag.
      // jsBody: 'static/js/component.min.js',

      // Here's a banner with some template variables.
      // We'll be inserting it at the top of minified assets.
      banner: grunt.file.read('./node_modules/cf-grunt-config/cfpb-banner.txt'),
    },

    // Define tasks specific to this project here

  };


  /**
   * Define a function that, given the path argument, returns an object
   * containing all JS files in that directory.
   */
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
      grunt.verbose.writeln("External config item - " + key + ": " + object[key]);
    });

    return object;
  }


  /**
   * Combine the config variable defined above with the results of calling the
   * loadConfig function with the given path, which is where our external
   * task options get installed by npm.
   */
  config = extend(true, loadConfig('./node_modules/cf-grunt-config/tasks/options/'), config);

  grunt.initConfig(config);


  /**
   * Load any project-specific tasks installed in the customary location.
   */
  require('load-grunt-tasks')(grunt);


  /**
   * Create custom task aliases for our component build workflow.
   */
  grunt.registerTask('vendor', ['copy:component_assets', 'copy:docs_assets']);
  grunt.registerTask('default', ['less', 'autoprefixer', 'copy:docs', 'topdoc']);

};


/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

( function( $ ) {
  'use strict';
  var _extend = $.extend;

  /**
   * Returns function with throttled callback.
   *
   * @param {integer} duration - The title of the book.
   * @param {Function} callback - The title of the book.
   * @param {object} context - context in which to run callback function.
   * @returns {Function} - Time delayed function
   */
  function _throttle( duration, callback, context ) {
    var isThrottling = false;

    return function _delay( event ) {
      if ( isThrottling === true ) {
        return;
      }
      isThrottling = true;
      callback.call( context, event );
      window.setTimeout( function() {
        isThrottling = false;
      }, duration );
    };
  }

  var Expandable = {
    defaultProperties: {
      isInAccordion:    false,
      expandedClass:    'expandable__expanded',
      throttleDuration: 450
    },

    // Elements that will be cached.
    ui: {
      content: '.expandable_content',
      target:  '.expandable_target'
    },

    /**
     * Creates and customizes the Expandable.
     *
     * @param {object} options - Object used to customize the Expandable.
     */
    create: function create( options ) {
      var properties = _extend( true, {}, Expandable.defaultProperties,
        options );

      // Using $.extend to create an instance of the Expandable.
      // Extending dom elements is generally bad and should be
      // avoided but we are doing so to maintain backwards compatibility.
      // `this` is referring to the dom element.
      _extend( this, Expandable, properties );
      this.init();
    },

    /**
     * Sets the initial state for the Expandable.
     */
    init: function init() {
      this.isInAccordion =
      Boolean( this.$el.parents( '.expandable-group' ).data( 'accordion' ) );
      this.isExpanded = this.$el.hasClass( this.expandedClass );
      this.initUI();
      this.initEvents();
    },

    /**
     * Removes the dom element from the dom.
     */
    destroy: function destroy() {
      if ( this.$el ) {
        this.$el.remove();
      }
    },

    /**
     * Initializes the initial state of the Expandable UI.
     */
    initUI: function initUI() {
      var $el = this.$el;

      for ( var uiKey in this.ui ) {
        if ( this.ui.hasOwnProperty( uiKey ) ) {
          this['$' + uiKey] = $el.find( this.ui[uiKey] + ':first' );
        }
      }

      this.$target.attr( 'aria-controls', this.$content.attr( 'id' ) );
      if ( this.isExpanded ) {
        this.expand( 0 );
      } else {
        this.collapse( 0 );
      }
    },

    /**
     * Initializes the Expandable dom events.
     */
    initEvents: function initEvents() {
      this.$el.on( 'click', '.expandable_target',
        _throttle( this.throttleDuration, this.toggle, this )
      );
    },

    /**
     * Expands or collapses the Expandable.
     *
     * @param {object} event - jQuery event object.
     */
    toggle: function toggle( event ) {
      event.preventDefault();
      event.stopPropagation();

      if ( this.isExpanded ) {
        this.collapse();
      } else {
        if ( this.isInAccordion ) {
          this.$el.siblings( '.expandable' )
          .each( function( index, sibling ) {
            sibling.collapse();
          } );
        }
        this.expand();
      }
    },

    /**
     * Expands the expandable, sets the internal state
     * and adds aria attributes.
     *
     * @param {integer} duration -
     *   The time duration in which the expansion will occur.
     */
    expand: function expand( duration ) {
      var $content = this.$content;
      this.$target.attr( 'aria-pressed', 'true' );
      $content.attr( 'aria-expanded', 'true' );
      if ( typeof duration === 'undefined' ) {
        duration = $.fn.expandable.calculateExpandDuration( $content.height() );
      }
      this.$el.addClass( this.expandedClass );
      $content.slideDown( {
        duration: duration,
        easing:   'easeOutExpo'
      } );
      this.isExpanded = true;
    },

    /**
     * Collapses the expandable, sets the internal state
     * and adds aria attributes.
     *
     * @param {integer} duration -
     *   The time duration in which the collapse will occur.
     */
    collapse: function collapse( duration ) {
      var $content = this.$content;
      this.$target.attr( 'aria-pressed', 'false' );
      $content.attr( 'aria-expanded', 'false' );
      if ( typeof duration === 'undefined' ) {
        duration = $.fn.expandable.calculateCollapseDuration( $content.height() );
      }
      this.$el.removeClass( this.expandedClass );
      $content.slideUp( {
        duration: duration,
        easing:   'easeOutExpo'
      } );
      this.isExpanded = false;
    }
  };

  // Expandable Plugin declarations.

  /**
   * Instantiates the Expandable and configures
   * the expandable options.
   *
   * @param {object} options - Object used to customize the Expandable.
   * @returns {object} - jQuery Object.
   */
  $.fn.expandable = function expandable( options ) {
    return this.each( function() {
      ( options || ( options = {} ) ).$el = $( this );
      Expandable.create.call( this, options );
    } );
  };

  /**
   * Returns the expand duration based on height parameter
   * and internal min/max values.
   *
   * @param {integer} height - The height of an element.
   * @returns {integer} - The constrained time duration.
   */
  $.fn.expandable.calculateExpandDuration =
  function calculateExpandDuration( height ) {
    return $.fn.expandable.constrainValue( 450, 900, height * 4 );
  };

  /**
   * Returns the collapse duration based on height parameter
   * and internal min/max values.
   *
   * @param {integer} height - The height of an element.
   * @returns {integer} - The constrained time duration.
   */
  $.fn.expandable.calculateCollapseDuration =
  function calculateCollapseDuration( height ) {
    return $.fn.expandable.constrainValue( 350, 900, height * 2 );
  };

  /**
   * Returns a time duration constrained by min and max parameters.
   *
   * @param {integer} min - The minimum time duration value.
   * @param {integer} max - The maximum time duration value.
   * @param {integer} duration - The time duration you want to constrain.
   * @returns {integer} - The constrained time duration.
   */
  $.fn.expandable.constrainValue =
  function constrainValue( min, max, duration ) {
    if ( duration > max ) {
      duration = max;
    } else if ( duration < min ) {
      duration = min;
    }
    return duration;
  };

  // Expandable Plugin initialization.
  $( '.expandable' ).expandable();

} )( window.jQuery );
