app.controller('SearchCtrl', function($filter, variable, $rootScope, $ionicModal, $scope, $ionicPlatform, RestAPI) {
    
    // #############################################################################
    // ทำเมื่อเข้าหน้าทุกครั้ง
    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        if (config.stateId === "app.search") {
            config.enableBack = false;
        }
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.arrSearch = [];
    });

    // #############################################################################
    // เก็บข่าวที่อ่านแล้วเข้า mongo collection user
    function collectReadNewss(news_id) {
        var arrNews_id = [];
        arrNews_id = variable.getReadNews();
        var v = ($filter('filter')(arrNews_id, function(item) {
            return item === news_id;
        }, true));
        if (v.length === 0) {
            arrNews_id.push(news_id);
            variable.setReadNews(arrNews_id);
            var profile = variable.getSession();
            profile.news_id = arrNews_id;
            variable.setSession(profile);
            RestAPI.checkReadNews(profile).success(function(data, status, headers, config) {
                if (data.status === true) {
                    $rootScope.$broadcast('newsUnRead:update', { event: profile });
                }
            });
        }
    }

    // #############################################################################
    // ตรวจสอบข่าวที่ชื่นชอบ
    function checkfavorite(news_id) {
        var arr = variable.getFavorite();
        var v = ($filter('filter')(arr, function(item) {
            return item === news_id;
        }, true));
        return v.length;
    }

    // #############################################################################
    // ค้นหาข่าว call ไป server
    $scope.search = function(data) {
        $rootScope.$broadcast('loading:show');
        RestAPI.search(data).success(function(results, status, headers, config) {
            console.log(results);
            if (results.status === true) {
                $scope.arrSearch = results.data;
                $rootScope.$broadcast('loading:hide');
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
    // modal เนื้อหาข่าว
    $scope.readNews = function(_id, news_id) {
        var v = checkfavorite(news_id);
        if (v === 0) {
            $scope.unfavorite = true;
            $scope.favorite = false;
        } else {
            $scope.unfavorite = false;
            $scope.favorite = true;
        }
        var id = "templates/modal/modal-feed.html";
        $ionicModal.fromTemplateUrl(id, {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
        $scope.detailNews = variable.findOne("news", { _id: _id });
        collectReadNewss(news_id);
    };

    // #############################################################################
    // เพิ่มเป็นข่าวที่ชอบ
    $scope.addfavorite = function(news_id) {
        $rootScope.$broadcast('loading:show');
        $scope.unfavorite = false;
        $scope.favorite = true;
        var arr = variable.getFavorite();
        var v = checkfavorite(news_id);
        if (v === 0) {
            arr.push(news_id);
            variable.setFavorite(arr);
            var profile = variable.getSession();
            profile.favorite_news_id = arr;
            variable.setSession(profile);
            RestAPI.favoriteAdd(profile).success(function(data, status, headers, config) {
                $rootScope.$broadcast('loading:hide');
                if (data.status !== true) {
                    Fn.AlertPopup("", "กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต");
                }
            });
        } else {
            console.log("มี news_id แล้ว");
        }
    };

    // #############################################################################
    // ลบข่าวที่ชอบ
    $scope.removefavorite = function(news_id) {
        $rootScope.$broadcast('loading:show');
        $scope.favorite = false;
        $scope.unfavorite = true;
        var arr = variable.getFavorite();
        var index = findWithAttr(arr, news_id);
        arr.splice(index, 1);
        variable.setFavorite(arr);
        var profile = variable.getSession();
        profile.favorite_news_id = arr;
        variable.setSession(profile);
        RestAPI.favoriteAdd(profile).success(function(data, status, headers, config) {
            $rootScope.$broadcast('loading:hide');
            if (data.status !== true) {
                Fn.AlertPopup("", "กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต");
            }
        });

        function findWithAttr(array, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
    };
});