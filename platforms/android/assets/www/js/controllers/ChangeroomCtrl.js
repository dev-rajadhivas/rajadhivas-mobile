app.controller('ChangeroomCtrl', function(Fn, RestAPI, variable, $rootScope, $scope, $ionicPlatform) {

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.student = new Object();
        rooms();
    });

    // #############################################################################
    // ห้องนักเรียน
    function rooms() {
        $scope.room = [{ id: 1, class: "ม.1/1" }, { id: 2, class: "ม.1/2" }, { id: 3, class: "ม.1/3" }, { id: 4, class: "ม.1/4" }, { id: 5, class: "ม.1/5" }, { id: 6, class: "ม.1/6" }, { id: 7, class: "ม.2/1" }, { id: 8, class: "ม.2/2" }, { id: 9, class: "ม.2/3" }, { id: 10, class: "ม.2/4" }, { id: 11, class: "ม.2/5" }, { id: 12, class: "ม.2/6" }, { id: 13, class: "ม.3/1" }, { id: 14, class: "ม.3/2" }, { id: 15, class: "ม.3/3" }, { id: 16, class: "ม.3/4" }, { id: 17, class: "ม.3/5" }, { id: 18, class: "ม.3/6" }, { id: 19, class: "ม.4/1" }, { id: 20, class: "ม.4/2" }, { id: 21, class: "ม.4/3" }, { id: 22, class: "ม.4/4" }, { id: 23, class: "ม.5/1" }, { id: 24, class: "ม.5/2" }, { id: 25, class: "ม.5/3" }, { id: 26, class: "ม.5/4" }, { id: 27, class: "ม.6/1" }, { id: 28, class: "ม.6/2" }, { id: 29, class: "ม.6/3" }, { id: 30, class: "ม.6/4" }, { id: 31, class: "ม.4/5" }, { id: 32, class: "ม.5/5" }, { id: 33, class: "ม.6/5" }];
    }

    $scope.changeRoom = function(data) {
        $rootScope.$broadcast('loading:show');
        var profile = variable.getSession();
        profile.room_student = data.room_student;
        RestAPI.changeRoom(profile).success(function(results, status, headers, config) {
            $rootScope.$broadcast('loading:hide');
            if (results.status === true) {
                Fn.AlertPopupSuccess("สำเร็จ!", results.messages);
                $scope.student.room_student = "";
            } else {
                Fn.AlertPopup("", results.messages);
            }
        }, function(error) {
            $rootScope.$broadcast('loading:hide');
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }
});