(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('NarrowItDownService', NarrowItDownService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);;

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var menu = this;

  menu.nothingFound = function(){
    return menu.items && (menu.items.length == 0);
  };

}

NarrowItDownController.$inject = ['NarrowItDownService'];
function NarrowItDownController(NarrowItDownService) {
  var menu = this;
  menu.items = null;
  menu.searchPhrase = "";

  menu.getMenuItems = function(){
    if (menu.searchPhrase == "") {
      menu.items = [];
      return;
    }

    var promise = NarrowItDownService.getMenuItems(menu.searchPhrase);

    promise.then(function (response) {
      menu.items = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  menu.removeItem = function (index) {
    menu.items.splice(index, 1)
  };
}

NarrowItDownService.$inject = ['$http', 'ApiBasePath'];
function NarrowItDownService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function (searchPhrase) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      var filteredItems = response.data.menu_items.filter(item => {
        return item.description.toLowerCase().indexOf(searchPhrase) !== -1
      })
      return filteredItems;
    })
  };
}

})();
