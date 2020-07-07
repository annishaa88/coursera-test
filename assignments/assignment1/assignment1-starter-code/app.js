(function () {
'use strict';

angular.module('MenuApp', [])
.controller('MenuController', MenuController);

MenuController.$inject = ['$scope'];
function MenuController($scope) {
  $scope.msg = "";
  $scope.items = "";

  $scope.checkIfTooMuch = function () {
    var splitItems = $scope.items.split(',')
    console.log(splitItems)
    if ($scope.items == ""){
      $scope.msg = "Please enter data first"
    } else if (splitItems.length <= 3) {
      $scope.msg = "Enjoy!"
    } else {
      $scope.msg = "Too much!"
    }

  };
}

})();
