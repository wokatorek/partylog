'use strict';

angular.module('app')

  .controller('HomeController', function ($scope,partyData, $ionicModal, $state) {
    $scope.partyData = partyData;

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.seriouslyStartTheParty = function() {
      $scope.modal.hide();
      $state.go('party');
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.letsGetThisPartyStarted = function openPartyModal() {
      partyData.start = new Date();
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
  })

  .controller('PartyController', function ($scope,partyData) {
    $scope.partyData = partyData;
  });
