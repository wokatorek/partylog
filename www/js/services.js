'use strict';

angular.module('app')

  .value('settings', {sex: 'none', height: 0, weight: 0, address: ''})
  .value('partyData', {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''}})
  .value('historyData', [{name: 'My Birthday', start: '09.07.2016, 18:00', end: '09.07.2016, 24:00', drinks: {type: 'beer', quantity: '5%', unit: '0,5l'}}, {name: 'Graduation Party', start: '25.06.2016, 17:00', end: '25.05.2016, 22:30', drinks: {type: 'wine', quantity: '12%', unit: '0,1l'}}]);
