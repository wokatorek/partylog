'use strict';

angular.module('app')

  .controller('HomeController', function ($scope,partyData, $ionicModal, $state) {
    $scope.partyData = {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''},drinks:[]};

    $ionicModal.fromTemplateUrl('templates/partyModal.html', {
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
      $scope.partyData.startDateTime = new Date().getTime();
      $scope.partyData.limit.datetime = new Date();
      $scope.modal.show();
    };

    $scope.clearAndLeave = function(){
      $scope.partyData = {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''},drinks:[]};
      $scope.modal.hide();
    };



    $scope.showDatePicker = function(){
      var options = {
        date: new Date(),
        mode: 'date'
      };

      function onSuccess(date) {
        alert('Selected date: ' + date);
      }

      function onError(error) { // Android only
        alert('Error: ' + error);
      }

      datePicker.show(options, onSuccess, onError);
    }
  })

  .controller('HangoverController', function ($scope, historyData, settings) {
    $scope.settings = settings.get();
    $scope.lastParty = {name: '',endDateTime: '1'};
    angular.forEach(historyData.get(),function(e){
      if(e.endDateTime>$scope.lastParty.endDateTime){$scope.lastParty = e;}
    });
    console.debug($scope.lastParty.endDateTime);
    $scope.timeElapsedString= getTimeElapsedString($scope.lastParty.endDateTime);

    function getTimeElapsedString(endDateTime){
      var time = endDateTime,
        timeNow = new Date().getTime(),
        difference = timeNow - time,
        seconds = Math.floor(difference / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24);
      console.debug(difference);
      console.debug(time);
      console.debug(timeNow);
      if (days > 1) {
        return days + " days ago";
      } else if (days == 1) {
        return "1 day ago"
      } else if (hours > 1) {
        return hours + " hours ago";
      } else if (hours == 1) {
        return "an hour ago";
      } else if (minutes > 1) {
        return minutes + " minutes ago";
      } else if (minutes == 1){
        return "a minute ago";
      } else {
        return "a few seconds ago";
      }
    }

    $scope.alcoholMiligrams = calculateMiligrams($scope.lastParty.drinks);

    function calculateMiligrams(drinks) {
      var grams=0;
      for (var i=0; i < drinks.length; i++){
        grams=grams+(drinks[i].volume*drinks[i].alcohol*0.79);
      }
      return grams*1000;
    }

    $scope.estimatedBAC = estimateBAC($scope.alcoholMiligrams, $scope.settings, $scope.lastParty);

    function estimateBAC(alcoholMiligrams, settings, partydata){
      var r = 0;
      if (settings.sex === 'female'){
        r = 0.68;
      } else if(settings.sex === 'male'){
        r = 0.76;
      }
      var t = (new Date().getTime()-partydata.startDateTime)/1000/3600;
      console.log(t);
      var estimatedBAC = ((alcoholMiligrams/1000)/10)/(settings.weight*r)-(0.017*t);
      if (estimatedBAC <= 0){
        return 0;
      } else return estimatedBAC.toFixed(2);
    }
  })

  .controller('PartylogController', function ($scope, historyData) {
    $scope.historyData = historyData.get();
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

  .controller('PartyController', function ($scope,$state, partyData,lastDrink, $ionicModal, definedDrinks) {
    $scope.partyData = partyData.get();
    $scope.lastDrink = lastDrink.get();
    console.debug(lastDrink.get());
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

    $scope.partyIsOver = function(){
      $state.go('over');
    }
  })

.controller('OverController', function ($scope) {
});


