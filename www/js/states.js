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
      })
      .state('party', {
        url: '/party',
        templateUrl: 'templates/party.html',
        controller: 'PartyController'
      })
      .state('over', {
        url: '/over',
        templateUrl: 'templates/over.html',
        controller: 'OverController'
      })
      .state('wine', {
        url: '/wine',
        templateUrl: 'templates/wine.html',
        controller: 'WineController'
      })
      .state('beer', {
        url: '/beer',
        templateUrl: 'templates/beer.html',
        controller: 'BeerController'
      })
      .state('vodka', {
      url: '/vodka',
      templateUrl: 'templates/vodka.html',
      controller: 'VodkaController'
    })
      .state('longDrink', {
        url: '/longDrink',
        templateUrl: 'templates/longDrink.html',
        controller: 'LongDrinkController'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
