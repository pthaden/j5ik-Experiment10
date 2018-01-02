/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  // Update the main-release-paths.json for release mode when updating the mappings
  paths:
//injector:mainReleasePaths

  {
    'knockout': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/knockout/knockout-3.4.0',
    'jquery': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/jquery/jquery-3.1.1.min',
    'jqueryui-amd': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/jquery/jqueryui-amd-1.12.0.min',
    'ojs': 'https://static.oracle.com/cdn/jet/v4.1.0/default/js/min',
    'ojL10n': 'https://static.oracle.com/cdn/jet/v4.1.0/default/js/ojL10n',
    'ojtranslations': 'https://static.oracle.com/cdn/jet/v4.1.0/default/js/resources',
    'text': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/require/text',
    'promise': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/es6-promise/es6-promise.min',
    'hammerjs': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/hammer/hammer-2.0.8.min',
    'signals': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/js-signals/signals.min',
    'ojdnd': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'css': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/require-css/css.min',
    'customElements': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/webcomponents/custom-elements.min',
    'proj4js': 'https://static.oracle.com/cdn/jet/v4.1.0/3rdparty/proj4js/dist/proj4',
    'socketio': 'https://cdn.socket.io/socket.io-1.4.8'
  }
  
//endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    },
    'socketio': {
      exports: 'io'
    },
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojmenu'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded
    
    $(function() {
      
      function init() {
        // Bind your ViewModel for the content of the whole page body.
        ko.applyBindings(app, document.getElementById('globalBody'));
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
