app.controller('FeedCtrl', function($ionicSideMenuDelegate, ionicDatePicker, $ionicPopover, $rootScope, $timeout, $ionicSlideBoxDelegate, $ionicModal, variable, $scope, $ionicPlatform, RestAPI, $filter) {

    // #############################################################################
    // ทำเมื่อเข้าหน้าทุกครั้ง
    $scope.$on('$ionicView.beforeEnter', function(e, config) {
        if (config.stateId === "app.feed") {
            config.enableBack = false;
        }
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $ionicSideMenuDelegate.toggleLeft(false);
        $rootScope.$broadcast('news:update');
        getNews();
        getNewsUnRead();
        $scope.titile = "ประชาสัมพันธ์";
        $rootScope.$broadcast('newsUnRead:update', { event: variable.getSession() });
        $scope.slidefeed = 0;
        // $ionicSlideBoxDelegate.$getByHandle("modalhandle").slide(0);
        $scope.loadingShow = false;
        $scope.MaxWidth = window.screen.width;
        $scope.feed1 = [];
        $scope.feed2 = [];
        $scope.feed3 = [];
        $scope.date1 = null;
        $scope.date2 = null;
        $scope.date3 = null;
    });

    // #############################################################################
    // ตัว bedge จำนวนข่าวที่ยังไม่อ่าน
    function getNewsUnRead() {
        if (variable.getUnReadNews().length === 0) {
            $timeout(function() {
                getNewsUnRead();
            }, 500);
        } else {
            $rootScope.unRead = variable.getUnReadNews();
        }
    }

    // #############################################################################
    // Date Picker
    $scope.datePicker = function() {
        switch ($scope.slidefeed) {
            case 0:
                var d = $scope.date1 ? new Date($scope.date1) : new Date();
                break;
            case 1:
                var d = $scope.date2 ? new Date($scope.date2) : new Date();
                break;
            case 2:
                var d = $scope.date3 ? new Date($scope.date3) : new Date();
                break;
        }
        ionicDatePicker.openDatePicker({
            inputDate: d,
            callback: function(val) { //Mandatory
                switch ($scope.slidefeed) {
                    case 0:
                        $scope.date1 = new Date(val);
                        $scope.feedPage1 = ($filter('filter')($scope.feed1, function(item) {
                            return new Date(item.create_date).getFullYear() === new Date(val).getFullYear() && (new Date(item.create_date).getMonth() + 1) === (new Date(val).getMonth() + 1) && new Date(item.create_date).getDate() === new Date(val).getDate();
                        }, true));
                        break;
                    case 1:
                        $scope.date2 = new Date(val);
                        $scope.feedPage2 = ($filter('filter')($scope.feed2, function(item) {
                            return new Date(item.create_date).getFullYear() === new Date(val).getFullYear() && (new Date(item.create_date).getMonth() + 1) === (new Date(val).getMonth() + 1) && new Date(item.create_date).getDate() === new Date(val).getDate();
                        }, true));
                        break;
                    case 2:
                        $scope.date3 = new Date(val);
                        $scope.feedPage3 = ($filter('filter')($scope.feed3, function(item) {
                            return new Date(item.create_date).getFullYear() === new Date(val).getFullYear() && (new Date(item.create_date).getMonth() + 1) === (new Date(val).getMonth() + 1) && new Date(item.create_date).getDate() === new Date(val).getDate();
                        }, true));
                        break;
                }
            }
        });
    };

    // #############################################################################
    // clear Date
    $scope.clearDate = function() {
        switch ($scope.slidefeed) {
            case 0:
                $scope.feedPage1 = $scope.feed1;
                $scope.date1 = null;
                break;
            case 1:
                $scope.feedPage2 = $scope.feed2;
                $scope.date2 = null;
                break;
            case 2:
                $scope.feedPage3 = $scope.feed3;
                $scope.date3 = null;
                break;
        }
    };

    // #############################################################################
    // ดึงข่าว
    function getNews() {
        var data = variable.getNews();
        if (data.length !== $rootScope.lengthNews) {
            $timeout(function() {
                getNews();
            }, 500);
        } else {
            $scope.feedPage1 = ($filter('filter')(data, function(item) {
                return item.category_id === 2 && item.hotnews === false;
            }, true));
            $scope.feedPage2 = ($filter('filter')(data, function(item) {
                return item.category_id === 1 && item.hotnews === false;
            }, true));
            $scope.feedPage3 = ($filter('filter')(data, function(item) {
                return item.category_id === 3 && item.hotnews === false;
            }, true));
            $scope.loadingShow = true;
            $scope.hotnews = ($filter('filter')(data, function(item) {
                return item.hotnews === true;
            }, true));
            $scope.feed1 = $scope.feedPage1;
            $scope.feed2 = $scope.feedPage2;
            $scope.feed3 = $scope.feedPage3;
            if (variable.getSession() && $scope.hotnews.length > 0) {
                $timeout(function() {
                    modalHotnews();
                }, 600);
            }
        }
    }

    // #############################################################################
    // modal ข่าวด่วน
    function modalHotnews() {
        if ($rootScope.openModalHotnews === true) {
            var id = "templates/modal/modal-hotnews.html";
            $ionicModal.fromTemplateUrl(id, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.hotnewsModal = modal;
                $scope.hotnewsModal.show();
                $rootScope.openModalHotnews = false;
            });
        }
    }

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
    // ดึงจอ รีเฟรชงาน
    $scope.doRefrsesh = function() {
        // $scope.loadingADS = true;
        $rootScope.$broadcast('news:update');
        getNews();
        $rootScope.$broadcast('newsUnRead:update', { event: variable.getSession() });
        $scope.$broadcast('scroll.refreshComplete');
    };

    // #############################################################################
    // คลิกเปลี่ยนแท็บ
    $scope.click = function(index) {
        $scope.slidefeed = index;
        $ionicSlideBoxDelegate.slide(index);
        switch (index) {
            case 0:
                $scope.titile = "ประชาสัมพันธ์";
                break;
            case 1:
                $scope.titile = "ประกาศ";
                break;
            case 2:
                $scope.titile = "กิจกรรม";
                break;
        }
    };

    // #############################################################################
    // สไลค์เปลี่ยนแท็บ
    $scope.slide = function(index) {
        $scope.slidefeed = index;
        switch (index) {
            case 0:
                $scope.titile = "ประชาสัมพันธ์";
                break;
            case 1:
                $scope.titile = "ประกาศ";
                break;
            case 2:
                $scope.titile = "กิจกรรม";
                break;
        }
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