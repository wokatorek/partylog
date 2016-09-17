'use strict';

angular.module('app')

  .value('settings', {sex: 'none', height: 0, weight: 0, address: ''})
  .value('partyData', {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''},drinks:[]})
  .value('definedDrinks',[{name:'Beer', volume: '500', alcohol: '0.04'},{name:'Wine', volume: '150', alcohol: '0.12'},{name:'Vodka', volume: '50', alcohol: '0.4'}])
  .value('historyData', [{name: 'My Birthday', start: '09.07.2016, 18:00', end: '09.07.2016, 24:00', drinks: [{name: 'Beer', alcohol: '0.04', volume: '500'},{name: 'Beer', alcohol: '0.04', volume: '500'}]}, {name: 'Graduation Party', start: '25.06.2016, 17:00', end: '25.05.2016, 22:30', drinks: [{name: 'Wine', alcohol: '0.12', volume: '150'}]}]);
