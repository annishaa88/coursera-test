(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.directive('numenumber', numnumberDirective);

numnumberDirective.$inject = ['$q','MenuService', 'UserService'];
function numnumberDirective($q, MenuService, UserService) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.numenumber = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.resolve();
        }

        var def = $q.defer();

        var promise = MenuService.getMenuItem(modelValue);

        promise.then(function (response) {
          console.log(response);
          UserService.setMenuItem(response);
          def.resolve();
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
          UserService.setMenuItem(null);
          def.reject();
        });

        return def.promise;
      };
    }
  }
}

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var reg = this;
  reg.completed = false;

  reg.submit = function () {
    reg.completed = true;
    UserService.setUser(reg.user);
  };
}

})();
