app.controller('ContactCtrl', function(variable, $scope, $ionicScrollDelegate, $ionicPlatform) {

	$scope.$on('$ionicView.beforeEnter', function (e, config) {
        $ionicScrollDelegate.scrollTop();
    });

	// #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.textContact = variable.getContact();
        console.log($scope.textContact)
    });
});