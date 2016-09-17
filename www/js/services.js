'use strict';

angular.module('app')

  .value('settings', {sex: 'none', height: 0, weight: 0, address: ''})
  .value('partyData', {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''},drinks:[]})
  .value('definedDrinks',[{name:'Beer', volume: '500', alcohol: '0.04'},{name:'Wine', volume: '150', alcohol: '0.12'},{name:'Vodka', volume: '50', alcohol: '0.4'}]);
