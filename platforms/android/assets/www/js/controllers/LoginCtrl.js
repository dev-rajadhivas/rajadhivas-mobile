/* global app */

app.controller('LoginCtrl', function($filter, $cordovaGeolocation, $ionicModal, $location, $ionicPlatform, $rootScope, Fn, $scope, RestAPI, variable, $window) {

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.input = {};
        $scope.input.username = $window.localStorage["input.username"] ? $window.localStorage["input.username"] : '';
        $scope.register = {};
        $scope.repassword = {};
        rooms();
    });

    // #############################################################################
    // ห้องนักเรียน
    function rooms() {
        $scope.room = [{ id: 1, class: "ม.1/1" }, { id: 2, class: "ม.1/2" }, { id: 3, class: "ม.1/3" }, { id: 4, class: "ม.1/4" }, { id: 5, class: "ม.1/5" }, { id: 6, class: "ม.1/6" }, { id: 7, class: "ม.2/1" }, { id: 8, class: "ม.2/2" }, { id: 9, class: "ม.2/3" }, { id: 10, class: "ม.2/4" }, { id: 11, class: "ม.2/5" }, { id: 12, class: "ม.2/6" }, { id: 13, class: "ม.3/1" }, { id: 14, class: "ม.3/2" }, { id: 15, class: "ม.3/3" }, { id: 16, class: "ม.3/4" }, { id: 17, class: "ม.3/5" }, { id: 18, class: "ม.3/6" }, { id: 19, class: "ม.4/1" }, { id: 20, class: "ม.4/2" }, { id: 21, class: "ม.4/3" }, { id: 22, class: "ม.4/4" }, { id: 23, class: "ม.5/1" }, { id: 24, class: "ม.5/2" }, { id: 25, class: "ม.5/3" }, { id: 26, class: "ม.5/4" }, { id: 27, class: "ม.6/1" }, { id: 28, class: "ม.6/2" }, { id: 29, class: "ม.6/3" }, { id: 30, class: "ม.6/4" }];
    }

    // #############################################################################
    // fix username ตอนล็อคอินต้องเป็นตัวพิมพ์เล็กเท่านั้น
    $scope.toLowerCase = function(input) {
        input ? $scope.input.username = input.toLowerCase() : '';
    };

    // #############################################################################
    // fix username ตอนสมัครต้องเป็นตัวพิมพ์เล็กเท่านั้น
    $scope.toLowerCaseRegis = function(input) {
        input ? $scope.register.username = input.toLowerCase() : '';
    };

    // #############################################################################
    // modal สมัครสมาชิก
    $scope.openmodalRegister = function(url) {
        var id = "templates/modal/" + url + ".html";
        $ionicModal.fromTemplateUrl(id, {
            scope: $scope
        }).then(function(modal) {
            $rootScope.regisModal = modal;
            $rootScope.regisModal.show();
        });
        $scope.regis = function(data) {
            $rootScope.$broadcast('loading:show');
            data.latitude = variable.getGeolocation().latitude;
            data.longitude = variable.getGeolocation().longitude;
            data.devicetoken = variable.getTokens();
            if (data.password1 !== data.password2) {
                Fn.AlertPopup("", "รหัสผ่านไม่ตรงกัน");
                $scope.register.password1 = "";
                $scope.register.password2 = "";
                $rootScope.$broadcast('loading:hide');
            } else {
                data.password = data.password1;
                data.room_student = data.room_student ? data.room_student : null;
                var room_student_id = ($filter('filter')($scope.room, function(item) {
                    return item.class === data.room_student;
                }, true));
                data.room_id = room_student_id.length > 0 ? room_student_id[0].id : null;
                delete data.password1;
                delete data.password2;
                RestAPI.registers(data).success(function(results, status, headers, config) {
                    $rootScope.$broadcast('loading:hide');
                    if (results.status === true) {
                        Fn.AlertPopupSuccess("สำเร็จ!", results.msg);
                        $scope.register = {};
                    } else {
                        Fn.AlertPopup("", results.msg);
                    }
                }, function(error) {
                    $rootScope.$broadcast('loading:hide');
                    Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
                });
            }
        };
    };

    // #############################################################################
    // login
    $scope.doLogin = function(input) {
        $rootScope.$broadcast('loading:show');
        input.devicetoken = variable.getTokens();
        RestAPI.Login(input).success(function(results, status, headers, config) {
            if (results.status === true) {
                variable.setSession(results.data);
                variable.setUserrole(results.data.userrole);
                variable.setReadNews(results.data.news_id);
                $rootScope.$broadcast('newsUnRead:update', { event: results.data });
                $rootScope.$broadcast('favorites:update', { event: results.data });
                $window.localStorage["input.username"] = $scope.input.username;
                $rootScope.$broadcast('news:update');
                $rootScope.$broadcast('loading:hide');
                $location.path('app/home');
            } else {
                $rootScope.$broadcast('loading:hide');
                Fn.AlertPopup("", results.messages);
                $scope.input.password = "";
            }
        }, function(error) {
            $rootScope.$broadcast('loading:hide');
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    };

    // #############################################################################
    // forget password
    $scope.forgetPassword = function(v) {
        $rootScope.$broadcast('loading:show');
        var data = {};
        data.email = v.email;
        RestAPI.forgetPass(data).success(function(results, status, headers, config) {
            $rootScope.$broadcast('loading:hide');
            if (results.status === true) {
                Fn.AlertPopupSuccess("สำเร็จ!", results.messages);
                $scope.repassword.email = "";
            } else {
                Fn.AlertPopup("", results.messages);
            }
        }, function(error) {
            $rootScope.$broadcast('loading:hide');
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    };
});