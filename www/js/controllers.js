'use strict';

angular.module('app')

  .controller('HomeController', function ($scope,partyData, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.letsGetThisPartyStarted = function openPartyModal() {
      $scope.modal.show();
    };
  })

  .controller('HangoverController', function ($scope) {
  })

  .controller('PartylogController', function ($scope) {
  })

  .controller('SettingsController', function ($scope, settings, $rootScope) {
    $scope.settings = settings;
    $scope.keyboardOpen = $rootScope.keyboardOpen;
  })

  .controller('AboutController', function ($scope) {
  });
