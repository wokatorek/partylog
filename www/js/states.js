'use strict';

angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      })
      .state('hangover', {
        url: '/hangover',
        templateUrl: 'templates/hangover.html',
        controller: 'HangoverController'
      })
      .state('partylog', {
        url: '/partylog',
        templateUrl: 'templates/partylog.html',
        controller: 'PartylogController'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'AboutController'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
