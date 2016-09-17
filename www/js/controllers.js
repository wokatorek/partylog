'use strict';

angular.module('app')

  .controller('HomeController', function ($scope,partyData, $ionicModal, $state) {
    $scope.partyData = partyData.get();

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.seriouslyStartTheParty = function() {
      $scope.modal.hide();
      partyData.set($scope.partyData);
      $state.go('party');
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.letsGetThisPartyStarted = function openPartyModal() {
      $scope.partyData.start = new Date().toLocaleString();
      $scope.modal.show();
    };

    $scope.clearAndLeave = function(){
      $scope.partyData = {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''},drinks:[]};
      $scope.modal.hide();
    };
  })

  .controller('HangoverController', function ($scope) {
  })

  .controller('PartylogController', function ($scope, historyData) {
    $scope.historyData = historyData;
  })

  .controller('SettingsController', function ($scope, settings, $rootScope, $state) {
    $scope.settings = settings.get();
    $scope.keyboardOpen = $rootScope.keyboardOpen;
    $scope.submit = function(){
      settings.set($scope.settings);
      $state.go('home');
    }
  })

  .controller('AboutController', function ($scope) {
  })

  .controller('PartyController', function ($log,$scope,partyData,lastDrink, $ionicModal, definedDrinks) {
    $scope.partyData = partyData.get();
    $scope.lastDrink = lastDrink.get();
    $log.debug(lastDrink.get());
    $scope.limit = null;
    $scope.selectedCategory = 'All';
    $scope.selectedDrink = null;
    $scope.newDrink = {name:'',category:'',volume:0,alcohol:0};
    $scope.mockupDrink = {name:'Regular beer',category: 'beer',volume: '500',alcohol: '0.04'};

    $scope.duplicateDrink = function (){
      partyData.addDrink($scope.lastDrink);
    };

    $ionicModal.fromTemplateUrl('templates/addDrinkModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.addDrinkModal = function(){
      $scope.modal.show();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.addSavedDrink = function(drink){
      partyData.addDrink(drink);
      lastDrink.set(drink);
      $scope.lastDrink = drink;
      $scope.modal.hide();
    };

    $scope.addNewDrink = function(drink){
      definedDrinks.addDrink(drink);
      partyData.addDrink(drink);
      lastDrink.set(drink);
      $scope.lastDrink = drink;
      $scope.modal.hide();
    };
  });
