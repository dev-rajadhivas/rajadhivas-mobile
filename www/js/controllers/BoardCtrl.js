app.controller('BoardCtrl', function($rootScope, $scope, $ionicPlatform, RestAPI, Fn, $location, variable, $filter) {

    // #############################################################################
    // ทำเมื่อเข้าหน้าทุกครั้ง
    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        findBoard();
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.listBoard = [];
        $scope.loadingShow = false;
    });

    // #############################################################################
    // รายการเว็บบอร์ด
    function findBoard() {
        RestAPI.Boardlists().success(function(results, status, headers, config) {
            if (results.status === true) {
                // $scope.listBoard = results.data;
                var active_permission = true;
                if (!variable.getSession().room_id) {
                    active_permission = false;
                }
                $scope.listBoard = ($filter('filter')(results.data, function(item) {
                    return item.room_id === variable.getSession().room_id && item.active_permission === active_permission;
                }, true));
                console.log(variable.getSession())
                $scope.loadingShow = true;
            }
        }, function(error) {
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }

    // #############################################################################
    // เก็บการอ่านและเแลี่ยนหน้า
    $scope.gotoBoard = function(data) {
        $rootScope.$broadcast('loading:show');
        console.log(data);
        var _id = { _id: data._id };
        RestAPI.Boardreads(_id).success(function(results, status, headers, config) {
            if (results.status === true) {
                $location.path('/app/board_detail/' + data.content_id);
            } else {
                Fn.AlertPopup("", results.messages);
            }
        }, function(error) {
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
        $rootScope.$broadcast('loading:hide');
    }
});