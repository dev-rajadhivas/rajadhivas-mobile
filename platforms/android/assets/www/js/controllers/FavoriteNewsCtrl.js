app.controller('FavoriteNewsCtrl', function(RestAPI, $ionicModal, $filter, variable, $rootScope, $timeout, $scope, $ionicPlatform) {

    // #############################################################################
    // ทำเมื่อเข้าหน้าทุกครั้ง
    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        if (config.stateId === "app.favorite-news") {
            config.enableBack = false;
        }
        getFavoriteNews();
        $scope.tempMultiRemove = variable.getFavorite();
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.loadingShow = false;
        $scope.disableDel = [];
    });

    // #############################################################################
    // กด back android
    $ionicPlatform.on('backbutton', function() {
        variable.setFavorite($scope.tempMultiRemove);
        $scope.disableDel = [];
    });

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
    // ดึงข่าวที่ชื่นชอบ
    function getFavoriteNews() {
        var arr = [];
        var favorite_id = variable.getFavorite();
        for (var i = 0; i < favorite_id.length; i++) {
            var favoriteNewss = variable.findOne("news", { news_id: favorite_id[i] });
            delete favoriteNewss.checked;
            arr.push(favoriteNewss);
        }
        $scope.favoriteNews = arr;
    }

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
                if (data.status === true) {
                    getFavoriteNews();
                } else {
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
        $scope.favorite = false;
        $scope.unfavorite = true;
        var arr = variable.getFavorite();
        var index = findWithAttr(arr, news_id);
        arr.splice(index, 1);
        variable.setFavorite(arr);
        getFavoriteNews();
        var profile = variable.getSession();
        profile.favorite_news_id = arr;
        variable.setSession(profile);
        RestAPI.favoriteAdd(profile).success(function(data, status, headers, config) {
            $rootScope.$broadcast('loading:hide');
            if (data.status !== true) {
                Fn.AlertPopup("", "กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต");
            }
        });
    };

    // #############################################################################
    // เปิด modal ลบข่าวที่ชอบ
    $scope.modalMultiRemoveFavorite = function() {
        getFavoriteNews();
        var id = "templates/modal/modal-remove-favorite.html";
        $ionicModal.fromTemplateUrl(id, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    // #############################################################################
    // ปิด modal ลบข่าวที่ชอบ
    $scope.closeModal = function() {
        $scope.modal.hide();
        variable.setFavorite($scope.tempMultiRemove);
        $scope.disableDel = [];
    }

    // #############################################################################
    // ลบข่าวที่ชอบ แบบหลายข่าว
    $scope.Multiremovefavorite = function(data) {
        if (data !== "remove") {
            if (data.checked === true) {
                var arr = variable.getFavorite();
                var index = findWithAttr(arr, data.news_id);
                arr.splice(index, 1);
                variable.setFavorite(arr);
                $scope.disableDel.push(data.news_id);
            } else {
                var arr = variable.getFavorite();
                var ch = ($filter('filter')(arr, function(item) {
                    return item.doc_type_ac === data.news_id;
                }, true));
                if (ch.length === 0) {
                    arr.push(data.news_id);
                }
                variable.setFavorite(arr);
                var index = findWithAttr($scope.disableDel, data.news_id);
                $scope.disableDel.splice(index, 1);
            }
        } else {
            $rootScope.$broadcast('loading:show');
            var arr = variable.getFavorite();
            var profile = variable.getSession();
            profile.favorite_news_id = arr;
            $scope.tempMultiRemove = arr;
            variable.setFavorite(arr);
            variable.setSession(profile);
            RestAPI.favoriteAdd(profile).success(function(data, status, headers, config) {
                getFavoriteNews();
                $scope.disableDel = [];
                $rootScope.$broadcast('loading:hide');
                if (data.status !== true) {
                    Fn.AlertPopup("", "กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต");
                }
            });
        }
    };

    // #############################################################################
    // หาลำดับ index ตัวที่จะลบ
    function findWithAttr(array, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }
});