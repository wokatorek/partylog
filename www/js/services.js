'use strict';

angular.module('app')

  .factory('settings', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('settings');
        return tmp ? angular.fromJson(tmp) : {sex: '', height: 0, weight: 0, phone: '', Street: '', Number: '', Town: ''};
      },
      set: function (settingsObject) {
        window.localStorage.setItem('settings', angular.toJson(settingsObject));
      }
    }
  })
  .factory('partyData', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('partyData');
        return tmp ? angular.fromJson(tmp) : {
          name: '',
          start: '',
          startDateTime: 0,
          end: '',
          endDateTime: 0,
          limit: {type: '', quantity: '', unit: ''},
          drinks: []
        };
      },
      set: function (partyObject) {
        window.localStorage.setItem('partyData', angular.toJson(partyObject));
      },
      addDrink: function (drinkObject) {
        var tmp = angular.fromJson(window.localStorage.getItem('partyData'));
        tmp.drinks.push(drinkObject);
        window.localStorage.setItem('partyData', angular.toJson(tmp));
      },
      clear: function(){
        window.localStorage.removeItem('partyData');
      }
    }
  })
  .factory('definedDrinks', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('definedDrinks');
        return tmp ? angular.fromJson(tmp) : [{name: 'Beer', category:'Beer', volume: '500', alcohol: '0.04'}, {
          name: 'Wine',
          category: 'Wine',
          volume: '150',
          alcohol: '0.12'
        }, {name: 'Vodka', category: 'String alcohols', volume: '50', alcohol: '0.4'}];
      },
      set: function (drinksObject) {
        window.localStorage.setItem('definedDrinks', angular.toJson(drinksObject));
      },
      addDrink: function (drinkObject) {
        var tmp = angular.fromJson(window.localStorage.getItem('definedDrinks'));
        tmp.push(drinkObject);
        window.localStorage.setItem('definedDrinks', angular.toJson(tmp));
      }
    }
  })
  .factory('historyData', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('historyData');
        return tmp ? angular.fromJson(tmp) : [];
        //   [{
        //   name: 'My Birthday',
        //   start: '16.09.2016, 17:50',
        //   startDateTime: 1474048200000,
        //   end: '16.09.2016, 23:50',
        //   endDateTime: 1474069800000,
        //   drinks: [{name: 'Beer', alcohol: '0.04', volume: '500'}, {name: 'Beer', alcohol: '0.04', volume: '500'}]
        // }, {
        //   name: 'Graduation Party',
        //   start: '25.08.2016, 17:00',
        //   startDateTime: 1466874000000,
        //   end: '25.08.2016, 22:30',
        //   endDateTime: 1466893800000,
        //   drinks: [{name: 'Wine', alcohol: '0.12', volume: '150'}]
        // }]
      },
      set: function (partyObject) {
        window.localStorage.setItem('historyData', angular.toJson(partyObject));
      },
      addParty: function (partyObject) {
        var tmp = angular.fromJson(window.localStorage.getItem('historyData'));
        console.log(partyObject);
        tmp.push(partyObject);
        window.localStorage.setItem('historyData', angular.toJson(tmp));
      },
      removeParty: function (partyObject){
        console.err('Method not implemented!!');
        throw new DOMException();
      }
    }
  })
  .factory('lastDrink', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('lastDrink');
        return tmp ? angular.fromJson(tmp) : {name:'',alcohol:'',volume:''};
      },
      set: function (drinkObject) {
        window.localStorage.setItem('lastDrink', angular.toJson(drinkObject));
      }
    }
  })

  .directive('alcoholFormat', function()
  {
    return{
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController)
      {
        ngModelController.$formatters.push(function(value)
        {
          return value*100;
        })

        ngModelController.$parsers.push(function(value)
        {
          return value/100;
        })
      }
    }
  });
