/* global cordova */

var app = angular.module('starter', ['ionic', 'angular.filter', 'ngCordova', 'ionic-datepicker']);

app.run(function($rootScope, $ionicPlatform, $cordovaStatusbar, $ionicHistory) {
    $ionicPlatform.ready(function() {
        $rootScope.footerhide = true;
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            $cordovaStatusbar.style(1);
        }

        window.addEventListener('native.keyboardshow', keyboardShowHandler);

        function keyboardShowHandler(e) {
            $rootScope.footerhide = false;
            $rootScope.$apply();
        }

        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        function keyboardHideHandler(e) {
            $rootScope.footerhide = true;
            $rootScope.$apply();
        }

    });

});

app.run(function($ionicPlatform, $ionicLoading, $rootScope, $location, $ionicScrollDelegate, variable, $ionicHistory) {
    $ionicPlatform.ready(function() {

        // #############################################################################
        // ปิด back android ตอนถ่ายภาพ
        $ionicPlatform.registerBackButtonAction(function() {
            if ($ionicHistory.currentView().stateName === "app.feed") {
                navigator.app.exitApp();
            }
        }, 100);

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({
                template: '<ion-spinner class="loadding-content" icon="bubbles"></ion-spinner> <span style="position: relative;z-index: 999;">{{timerCounter}}</span>'
            });
        });
        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });
    });

    $rootScope.goto = function(path) {
        $location.path(path);
    };

    $rootScope.scrollResize = function(v) {
        $ionicScrollDelegate.$getByHandle(v).resize();
    };

    // ตัวแปรเก็บ drop
    $rootScope.event = [];

});