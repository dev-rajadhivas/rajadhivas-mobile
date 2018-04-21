app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    // $ionicConfigProvider.backButton.icon('ion-ios-arrow-back').previousTitleText(true);
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        // login
        .state('login', {
            cache: false,
            url: '/login',
            templateUrl: 'templates/Login/login.html',
            controller: 'LoginCtrl'
        })
        //################################## ข่าวสาร ##################################
        .state('app.feed', {
            url: '/feed',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Feed/feed.html',
                    controller: 'FeedCtrl'
                }
            }
        })
        //ข่าวที่ยังไม่ได้อ่าน
        .state('app.feed_unread', {
            url: '/feed_unread',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Feed/feed_unread.html',
                    controller: 'FeedUnreadCtrl'
                }
            }
        })
        //################################## กระดานสนทนา ##################################
        .state('app.board', {
            url: '/board',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Board/board.html',
                    controller: 'BoardCtrl'
                }
            }
        })
        .state('app.board-detail', {
            url: '/board_detail/:board_id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Board/board-detail.html',
                    controller: 'BoardDetailCtrl'
                }
            }
        })
        .state('app.board-create', {
            url: '/board_create',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Board/board-create.html',
                    controller: 'BoardCreateCtrl'
                }
            }
        })
        //################################## ข่าวที่ชอบ ##################################
        .state('app.favorite-news', {
            url: '/favorite_news',
            views: {
                'menuContent': {
                    templateUrl: 'templates/FavoriteNews/favorite_news.html',
                    controller: 'FavoriteNewsCtrl'
                }
            }
        })
        //################################## ค้นหา ##################################
        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Search/search.html',
                    controller: 'SearchCtrl'
                }
            }
        })
        //################################## แผนที่ ##################################
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Map/map.html',
                    controller: 'MapCtrl'
                }
            }
        })
        //################################## ประวัติโรงเรียน ##################################
        .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Contact/contact.html',
                    controller: 'ContactCtrl'
                }
            }
        })
        //################################## ตั้งค่า ##################################
        .state('app.setting', {
            url: '/setting',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Setting/setting.html',
                    controller: 'SettingCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise(function($injector, $location) {
        $injector.invoke(function($rootScope, variable) {
            if (variable.getSession()) {
                $rootScope.session = variable.getSession();
                $location.path('app/feed');
            } else {
                variable.setSession(null);
                $location.path('/login');
            }
        });
        return true;
    });
});