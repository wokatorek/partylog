'use strict';

angular.module('app', ['ionic'])

  .config(function($ionicConfigProvider){
    $ionicConfigProvider.platform.android.views.maxCache(0);
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    cordova.plugins.notification.local.registerPermission(function (granted) {
      console.log('Permission has been granted: ' + granted);
    });
  });
});
