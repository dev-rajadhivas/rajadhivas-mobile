app.controller('BoardCtrl', function($scope, $ionicPlatform, RestAPI, Fn) {

	// #############################################################################
    // ทำเมื่อเข้าหน้าทุกครั้ง
    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        findBoard();
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.listBoard = [];
    });

    function findBoard() {
        RestAPI.Boardlists().success(function(results, status, headers, config) {
            if (results.status === true) {
                $scope.listBoard = results.data;
            }
        }, function(error) {
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }
});