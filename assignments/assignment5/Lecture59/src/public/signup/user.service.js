(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);


function UserService() {
  var service = this;

  service.setUser = function (user) {
    service.user = user
  };

  service.getUser = function () {
    return service.user;
  };

  service.setMenuItem = function (menuItem) {
    service.menuItem = menuItem
  };

  service.getMenuItem = function () {
    return service.menuItem;
  };
}



})();
