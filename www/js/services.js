'use strict';

angular.module('app')

  .factory('settings', function () {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('settings');
        return tmp ? angular.fromJson(tmp) : {sex: 'none', height: 0, weight: 0, address: ''};
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
          end: '',
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
        tmp.drinks.push(drinkObject);
        window.localStorage.setItem('definedDrinks', angular.toJson(tmp));
      }
    }
  })
  .factory('historyData', function ($log) {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('historyData');
        return tmp ? angular.fromJson(tmp) : [{
          name: 'My Birthday',
          start: '09.07.2016, 18:00',
          end: '09.07.2016, 24:00',
          drinks: [{name: 'Beer', alcohol: '0.04', volume: '500'}, {name: 'Beer', alcohol: '0.04', volume: '500'}]
        }, {
          name: 'Graduation Party',
          start: '25.06.2016, 17:00',
          end: '25.05.2016, 22:30',
          drinks: [{name: 'Wine', alcohol: '0.12', volume: '150'}]
        }]
      },
      set: function (drinkObject) {
        window.localStorage.setItem('historyData', angular.toJson(drinkObject));
      },
      addParty: function (partyObject) {
        var tmp = angular.fromJson(window.localStorage.getItem('historyData'));
        tmp.drinks.push(partyObject);
        window.localStorage.setItem('historyData', angular.toJson(tmp));
      },
      removeParty: function (partyObject){
        $log.err('Method not implemented!!');
        throw new DOMException();
      }
    }
  })
  .factory('lastDrink', function ($log) {
    return {
      get: function () {
        var tmp = window.localStorage.getItem('lastDrink');
        $log.debug(tmp);
        var fromjson = angular.fromJson(tmp);
        $log.debug(fromjson);
        return tmp ? {name:fromjson.name,category:fromjson.category,volume:fromjson.volume,alcohol:fromjson.alcohol} : {name:'',alcohol:'',volume:''};
      },
      set: function (drinkObject) {
        window.localStorage.setItem('lastDrink', angular.toJson(drinkObject));
      }
    }
  });
