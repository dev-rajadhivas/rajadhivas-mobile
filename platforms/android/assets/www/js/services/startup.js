/* global app */
app.run(function($ionicModal, $filter, RestAPI, $cordovaGeolocation, $rootScope, $ionicPlatform, variable, $timeout) {

    $ionicPlatform.ready(function() {
        getlocation();
        $rootScope.openModalHotnews = true;

        $rootScope.$on('news:update', function() {
            $rootScope.lengthNews = "";
            RestAPI.getNews().success(function(data, status, headers, config) {
                if (data.status === true) {
                    $rootScope.lengthNews = data.data.length;
                    variable.setNews(data.data);
                }
            }).error(function(data, status, headers, config) {
                $timeout(function() {
                    $rootScope.$broadcast('news:update');
                }, 10 * 1000);
            });
        });

        $rootScope.$on('newsUnRead:update', function(event, args) {
            RestAPI.getNewsUnRead(args.event).success(function(results, status, headers, config) {
                if (results.status === true) {
                    variable.setUnReadNews(results.data);
                    $rootScope.unRead = results.data;
                }
            }, function(error) {
                Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
            });
        });

        $rootScope.$on('favorites:update', function(event, args) {
            RestAPI.getFavorite(args.event).success(function(results, status, headers, config) {
                if (results.status === true) {
                    console.log("ddddddddddd", JSON.stringify(results.data));
                    variable.setFavorite(results.data);
                }
            }, function(error) {
                Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
            });
        });

        $rootScope.$on('contact:update', function() {
            RestAPI.getContact().success(function(data, status, headers, config) {
                if (data.status === true) {
                    variable.setContact(data.data);
                }
            }).error(function(data, status, headers, config) {
                $timeout(function() {
                    $rootScope.$broadcast('contact:update');
                }, 10 * 1000);
            });
        });
    });

    function getlocation() {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            result = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            variable.setGeolocation(result);
        }, function(err) {
            console.log(err)
        });
    }
});