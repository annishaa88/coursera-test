(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListToBuyController', ShoppingListToBuyController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.service('ShoppingListService', ShoppingListService);

ShoppingListToBuyController.$inject = ['ShoppingListService'];
function ShoppingListToBuyController(ShoppingListService) {
  var list = this;
  list.items = ShoppingListService.getItemsToBuy();

  list.isEmpty = function () {
    return ShoppingListService.isEmptyItemsToBuy();
  };

  list.removeItem = function (idx) {
    ShoppingListService.removeItem(idx);
  };

}


ShoppingListBoughtController.$inject = ['ShoppingListService'];
function ShoppingListBoughtController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItemsAlreadyBought();

  list.isEmpty = function () {
    return ShoppingListService.isEmptyItemsAlreadyBought();
  };
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [{
    name: 'item1',
    quantity: 10
  },{
    name: 'item2',
    quantity: 5
  },{
    name: 'item3',
    quantity: 3
  },{
    name: 'item4',
    quantity: 2
  },{
    name: 'item5',
    quantity: 90
  }];

  var itemsAlreadyBought = [];

  service.removeItem = function (itemIndex) {
    var items = itemsToBuy.splice(itemIndex, 1);
    itemsAlreadyBought.push(items[0])
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsAlreadyBought = function () {
    return itemsAlreadyBought;
  };

  service.isEmptyItemsToBuy = function () {
    return itemsToBuy.length == 0;
  };

  service.isEmptyItemsAlreadyBought = function () {
    return itemsAlreadyBought.length == 0;
  };
}

})();
