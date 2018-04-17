/* global app */

app.controller('AppCtrl', function($scope, Fn, $rootScope) {
	$rootScope.$broadcast('contact:update');
	// #############################################################################
    // ออกจากระบบ
    $scope.logout = function() {
        Fn.Logout();
    };
});