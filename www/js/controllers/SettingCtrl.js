app.controller('SettingCtrl', function($scope, $ionicScrollDelegate, $ionicPlatform, RestAPI, variable, $rootScope, Fn) {

    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        $ionicScrollDelegate.scrollTop();
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.change = new Object();
    });

    $scope.changePassword = function(v) {
        if (v.password1 !== v.password2) {
            Fn.AlertPopup("", "รหัสผ่านไม่ตรงกัน");
        } else {
            $rootScope.$broadcast('loading:show');
            var profile = variable.getSession();
            profile.password = v.password1;
            RestAPI.changePass(profile).success(function(results, status, headers, config) {
                $rootScope.$broadcast('loading:hide');
                if (results.status === true) {
                    Fn.AlertPopupSuccess("สำเร็จ!", results.messages);
                    $scope.change.password1 = "";
                    $scope.change.password2 = "";
                } else {
                    Fn.AlertPopup("", results.messages);
                }
            }, function(error) {
                $rootScope.$broadcast('loading:hide');
                Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
            });
        }
    }
});