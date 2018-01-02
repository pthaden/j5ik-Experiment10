/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'socketio', 'ojs/ojknockout', 'ojs/ojgauge'],
  function(oj, ko, io) {
     function ControllerViewModel() {
      var self = this;
      var socket = io.connect('http://192.168.1.173:3000/');
      self.thermometer = ko.observable(30);
      self.barometer = ko.observable(40);
      self.hygrometer = ko.observable(50);
      self.altimeter = ko.observable(60);
      self.thresholds = {
        thermometerMin: 0,
        thermometerMax: 100,
        barometerMin: 50,
        barometerMax: 150,
        altimeterMin: 0,
        altimeterMax: 100,
        hygrometerMin: 0,
        hygrometerMax: 100
      }

      socket.on('connect', function() {
            console.log("I am connected");
        });
      socket.on("report", function(data){
        self.thermometer(data.thermometer)
        self.barometer(data.barometer)
        self.hygrometer(data.hygrometer)
        self.altimeter(data.altimeter)

      });

      self.customSvgStyle = function(value, min, max){
       //console.log(value, min, max);
       return {fill: '#fb7000'}; 
      };

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
