var myApp = angular.module('myApp');

myApp.controller('MsgCtrl', function ($scope) {
  console.log('MsgCtrl');

  $scope.message = '';
});

myApp.controller('RootCtrl', function (auth, $scope) {
  console.log('RootCtrl');
  $scope.$parent.message = '';
  $scope.auth = auth;
});

var saveUserInfo = function(profile, token, store) {
  store.set('profile', profile);
  store.set('token', token);
};

myApp.controller('LoginCtrl', function (auth, $scope, $state, store) {
  console.log('LoginCtrl');

  $scope.$parent.message = 'loading signin...';

  auth.signin({}, function (profile, id_token) {
    saveUserInfo(profile, id_token, store);
    $state.go('root');
  }, function () {
    $scope.$parent.message = 'invalid credentials';
    $scope.loading = false;
  });
});

myApp.controller('SignupCtrl', function (auth, $scope, $state, store) {
  console.log('SignupCtrl');

  $scope.$parent.message = 'loading signup...';

  auth.signup({ popup:  true, auto_login: false }, function (profile, id_token) {
    saveUserInfo(profile, id_token, store);
    $state.go('root');
  }, function  () {
    console.log('foo');
  });
});

myApp.controller('ResetCtrl', function (auth, $scope) {
  console.log('ResetCtrl');

  $scope.$parent.message = 'loading password reset...';

  auth.reset({}, function () {
    console.log('reset success');
  }, function  () {
    console.log('reset fail');
  });
});

myApp.controller('LogoutCtrl', function (auth, $location, store, $scope, $state) {
  console.log('LogoutCtrl');

  auth.signout();
  store.remove('profile');
  store.remove('token');
  $scope.$parent.message = '';
  $state.go('root');
});
