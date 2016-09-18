'use strict';

angular.module('app')

  .controller('HomeController', function ($scope, partyData, $ionicModal, $state, historyData, definedDrinks) {
    $scope.partyData = {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''}, drinks: []};
    partyData.clear();
    if (!window.localStorage.getItem('historyData')) {
      historyData.set([]);
    }
    if (!window.localStorage.getItem('definedDrinks')) {
      definedDrinks.set([]);
    }

    $ionicModal.fromTemplateUrl('templates/partyModal.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.seriouslyStartTheParty = function () {
      $scope.modal.hide();
      partyData.set($scope.partyData);

      if ($scope.partyData.limit.type === 'time'){
        cordova.plugins.notification.local.schedule({
          id: 1,
          title: "You reached your limit!",
          text: 'It is time to leave the party...',
          at: $scope.partyData.limit.datetime,
          icon: "res://drawable-xxxhdpi/icon.png",
          led: 'FF0000'
        });
      }
      // cordova.plugins.notification.local.on("click", function (notification) {
      //   joinMeeting(notification.data.meetingId);
      // });
      $state.go('party');
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.letsGetThisPartyStarted = function openPartyModal() {
      $scope.partyData.start = new Date().toLocaleString();
      $scope.partyData.startDateTime = new Date().getTime();
      $scope.partyData.limit.datetime = new Date();
      partyData.set($scope.partyData);
      $scope.modal.show();
    };

    $scope.clearAndLeave = function () {
      $scope.partyData = {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''}, drinks: []};
      $scope.modal.hide();
    };


    $scope.showDatePicker = function () {
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
    $scope.lastParty = {name: '', endDateTime: '1'};
    angular.forEach(historyData.get(), function (e) {
      if (e.endDateTime > $scope.lastParty.endDateTime) {
        $scope.lastParty = e;
      }
    });
    console.debug($scope.lastParty.endDateTime);
    $scope.timeElapsedString = getTimeElapsedString($scope.lastParty.endDateTime);

    function getTimeElapsedString(endDateTime) {
      var time = endDateTime,
        timeNow = new Date().getTime(),
        difference = timeNow - time,
        seconds = Math.floor(difference / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24);
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
      } else if (minutes == 1) {
        return "a minute ago";
      } else {
        return "a few seconds ago";
      }
    }

    $scope.alcoholMiligrams = calculateMiligrams($scope.lastParty.drinks);

    function calculateMiligrams(drinks) {
      var grams = 0;
      for (var i = 0; i < drinks.length; i++) {
        grams = grams + (drinks[i].volume * drinks[i].alcohol * 0.79);
      }
      return grams * 1000;
    }

    $scope.estimatedBAC = estimateBAC($scope.alcoholMiligrams, $scope.settings, $scope.lastParty);

    function estimateBAC(alcoholMiligrams, settings, partydata) {
      var r = 0;
      if (settings.sex === 'female') {
        r = 0.68;
      } else if (settings.sex === 'male') {
        r = 0.76;
      }
      var t = (new Date().getTime() - partydata.startDateTime) / 1000 / 3600;
      console.log(t);
      var estimatedBAC = ((alcoholMiligrams / 1000) / 10) / (settings.weight * r) - (0.017 * t);
      if (estimatedBAC <= 0) {
        return 0;
      } else return estimatedBAC.toFixed(2);
    }
  })

  .controller('PartylogController', function ($scope, historyData) {
    $scope.historyData = historyData.get();
    $scope.toggleGroup = function (group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };
  })

  .controller('SettingsController', function ($scope, settings, $rootScope, $state) {
    $scope.settings = settings.get();
    $scope.keyboardOpen = $rootScope.keyboardOpen;
    $scope.submit = function () {
      settings.set($scope.settings);
      $state.go('home');
    }
  })

  .controller('AboutController', function ($scope) {
  })

  .controller('PartyController', function ($scope, $state, partyData, lastDrink, $ionicModal, definedDrinks, historyData, $ionicPopup) {
    console.log('this party controller is run');
    $scope.partyData = partyData.get();
    $scope.lastDrink = lastDrink.get();
    $scope.historyData = historyData.get();
    $scope.limit = null;
    $scope.selectedCategory = 'All';
    $scope.selectedDrink = null;
    $scope.newDrink = {name: '', category: '', volume: 0, alcohol: 0};
    $scope.mockupDrink = {name: 'Regular beer', category: 'beer', volume: '500', alcohol: '0.04'};
    $scope.limitString = '';
    console.log($scope.partyData.limit);
    $scope.getTimeLeftString = function getTimeLeftString(){
      var time = new Date($scope.partyData.limit.datetime).getTime(),
        timeNow = new Date().getTime(),
        difference = time - timeNow,
        seconds = Math.floor(difference / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24);
      console.log(difference);
      if (days > 1) {
        return days + " days";
      } else if (days == 1) {
        return "1 day"
      } else if (hours > 1) {
        return hours + " hours";
      } else if (hours == 1) {
        return "1 hour";
      } else if (minutes > 1) {
        return minutes + " minutes";
      } else if (minutes == 1){
        return "a minute";
      } else {
        return "a few seconds";
      }
    };
    if($scope.partyData.limit.type==='time'){
      console.log('sure');
      $scope.limitString = new Date($scope.partyData.limit.datetime).toLocaleString() + ' ('+($scope.getTimeLeftString($scope.partyData.limit.datetime))+' left)';
      $scope.$watch('getTimeLeftString', function(){
        $scope.limitString = new Date($scope.partyData.limit.datetime).toLocaleString() + ' ('+($scope.getTimeLeftString($scope.partyData.limit.datetime))+' left)';
      });
    } else if($scope.partyData.limit.type==='alcohol'){
      console.log('nah');
      $scope.limitString = '' + $scope.partyData.limit.quantity.toString() + ' drinks ('+($scope.partyData.limit.quantity-$scope.partyData.drinks.length)+' left)';
      $scope.$watch('partyData.drinks.length',function(){
        $scope.limitString = '' + $scope.partyData.limit.quantity.toString() + ' drinks ('+($scope.partyData.limit.quantity-$scope.partyData.drinks.length)+' left)';
        if($scope.partyData.limit.quantity-$scope.partyData.drinks.length <= 0){
          $ionicPopup.alert({
            title: 'This is your last drink',
            template: 'You reached your drink limit. It\'s time to leave this party'
          }).then(function() {
            $scope.partyIsOver();
          });
        }
      });
    }

    // $scope.$watch('partyData.drinks.length',function(){
    //   $scope.limitString = '' + $scope.partyData.limit.quantity.toString() + ' drinks ('+($scope.partyData.limit.quantity-$scope.partyData.drinks.length)+' left)';
    // });

    $scope.duplicateDrink = function (){
      $scope.partyData.drinks.push($scope.lastDrink);
    };

    $ionicModal.fromTemplateUrl('templates/addDrinkModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openWine = function () {
      $scope.modal.hide();
      $state.go('wine');
    };

    $scope.addDrinkModal = function () {
      $scope.modal.show();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.addSavedDrink = function (drink) {
      // partyData.addDrink(drink);
      // lastDrink.set(drink);
      // $scope.lastDrink = drink;
      $scope.partyData.drinks.push($scope.mockupDrink);
      lastDrink.set($scope.mockupDrink);
      $scope.lastDrink = $scope.mockupDrink;
      $scope.modal.hide();
    };

    $scope.addNewDrink = function (drink) {
      definedDrinks.addDrink(drink);
      partyData.addDrink(drink);
      lastDrink.set(drink);
      $scope.lastDrink = drink;
      $scope.modal.hide();
    };

    $scope.partyIsOver = function () {
      $scope.partyData.endDateTime = new Date().getTime();
      $scope.partyData.end = new Date().toLocaleString();
      historyData.addParty($scope.partyData);
      $state.go('over');
    };
  })

  .controller('WineController', function ($scope, definedDrinks, partyData, lastDrink, $state) {
    $scope.partyData = partyData.get();
    $scope.lastDrink = lastDrink.get();
    $scope.newDrink = {name: 'Wine', alcohol: 0.12, volume: 150};

    $scope.addNewDrink = function () {
      definedDrinks.addDrink($scope.newDrink);
      partyData.addDrink($scope.newDrink);
      lastDrink.set($scope.newDrink);
      $scope.lastDrink = $scope.newDrink;
      $state.go('party');
    };
  })

  .controller('OverController', function ($scope, settings) {
    $scope.settings = settings.get();
    $scope.phoneno = $scope.settings.phone;

    $scope.takeMeHome = function navigateHome() {
      launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
        var app;
        if (isAvailable) {
          app = launchnavigator.APP.GOOGLE_MAPS;
        } else {
          console.warn("Google Maps not available - falling back to user selection");
          app = launchnavigator.APP.USER_SELECT;
        }
        launchnavigator.navigate($scope.settings.street + ' ' + $scope.settings.number + ', ' + $scope.settings.town, {
          app: app
        });
      });

  }});

