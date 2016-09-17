'use strict';

angular.module('app')

  .value('settings', {sex: 'none', height: 0, weight: 0, address: ''})
  .value('partyData', {name: '', start: '', end: '', limit: {type: '', quantity: '', unit: ''}});
