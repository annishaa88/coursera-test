(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'menuitem', 'ApiPath'];
function MyInfoController(user, menuitem, ApiPath) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.menuitem = menuitem;
  $ctrl.basePath = ApiPath;
}

})();
