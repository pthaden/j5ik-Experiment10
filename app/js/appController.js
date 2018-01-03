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
      var socket = io.connect();
      
      self.thermometer = ko.observable(30);
      self.barometer = ko.observable(40);
      self.hygrometer = ko.observable(50);
      self.altimeter = ko.observable(60);
      

      self.thermometerScale = {
          min: -20,
          max: 120,
          thresholds: [
            {max: 0, color: "deeppink"},
            {max: 10, color: "magenta"},
            {max: 20, color: "purple"}, 
            {max: 30, color: "blue"},
            {max: 40, color: "skyblue"},
            {max: 50, color: "green"}, 
            {max: 60, color: "yellowgreen"},
            {max: 70, color: "yellow"},
            {max: 80, color: "orange"},
            {max: 90, color: "red"},
            {max: 100, color: "firebrick"},
            {max: 120, color: "maroon"}
          ]
        };
        
      self.barometerScale = {
          min: 93.1,
          max: 106.7,
          thresholds: [
          
            {max: 96.0, color: "dimgray", shortDesc: "stormy"},
            {max: 98.2, color: "darkblue", shortDesc: "rain"},
            {max: 101.2, color: "lightskyblue", shortDesc: "change"}, 
            {max: 104.0, color: "deepskyblue", shortDesc: "fair"},
            {max: 106.7, color: "goldenrod", shortDesc: "very dry"}
          ]
        };
        
      self.hygrometerScale = {
          min: 0,
          max: 100,
          thresholds: [
          
            {max: 40, color: "khaki ", shortDesc: "dry"},
            {max: 60, color: "darkseagreen", shortDesc: "comfort"},
            {max: 100, color: "aqua", shortDesc: "wet"}          
          ]
        };

      self.altimeterScale = {
          min: 0,
          max: 5000
        };


      

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
