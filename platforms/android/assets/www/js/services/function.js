/* global app, backgroundGeolocation, parseInt, cordova, $rootScopse, ionic, Fn */
app.service('Fn', function($window, $ionicConfig, $ionicSideMenuDelegate, $cordovaBadge, $interval, $cordovaMedia, $cordovaVibration, $filter, $ionicHistory, $rootScope, variable, $timeout, $q, RestAPI, $ionicPopup, $location, $ionicViewSwitcher) {
    var _this = this;

    //##############################################################################
    //alert popup error
    var countAlert = 0;
    _this.AlertPopup = function(subTitle, template) {
        if (countAlert === 0) {
            countAlert++;
            var alertPopup = $ionicPopup.alert({
                cssClass: 'alert-error',
                title: "แจ้งเตือน!",
                subTitle: subTitle,
                template: template,
                buttons: [{
                    text: 'ตกลง',
                    type: 'button-assertive'
                }]
            });
            alertPopup.then(function(res) {
                countAlert = 0;
            });
        }
    };
    //alert popup save
    _this.AlertPopupSave = function(subTitle, template, back) {
        if (countAlert === 0) {
            countAlert++;
            var alertPopup = $ionicPopup.alert({
                cssClass: 'alert-success',
                title: "บันทึกข้อมูลเรียบร้อย",
                subTitle: subTitle ? subTitle : null,
                template: template ? template : null,
                buttons: [{
                    text: 'ตกลง',
                    type: 'button-viriyah'
                }]
            });
            alertPopup.then(function(res) {
                countAlert = 0;
                if (back) {
                    $ionicHistory.goBack(back);
                    $timeout(function() {
                        $rootScope.$broadcast('AccidentCtrl:update');
                    }, 1000);
                }
            });
        }
    };
    //##############################################################################
    //alert popup success
    _this.AlertPopupSuccess = function(title, subTitle, template) {
        if (countAlert === 0) {
            countAlert++;
            var alertPopup = $ionicPopup.alert({
                cssClass: 'alert-success',
                title: title,
                subTitle: subTitle,
                template: template,
                buttons: [{
                    text: 'ตกลง',
                    type: 'button-viriyah'
                }]
            });
            alertPopup.then(function(res) {
                countAlert = 0;
                if (subTitle === "สร้างผู้ใช้เสร็จสมบูรณ์") {
                    $rootScope.regisModal.hide();
                }
                // $ionicViewSwitcher.nextDirection('back');
                // $location.path("/app/notify_queue");
            });
        }
    };
    //##############################################################################
    //ออกจากระบบ
    _this.Logout = function(events) {
        $ionicSideMenuDelegate.toggleLeft(false);
        variable.setSession(null);
        variable.setNews([]);
        variable.setUserrole(null);
        variable.setReadNews([]);
        variable.setUnReadNews([]);
        $rootScope.unRead = [];
        $rootScope.lengthNews = "";
        // $cordovaBadge.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicConfig.views.maxCache(0);
        $rootScope.$broadcast('loading:hide');
        $rootScope.event = [];
        $location.path('/login');
    };
    _this.convertDateViewTh = function(val) {
        var m = {};
        m.mth = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        var mth = m.mth[new Date(val).getMonth() + 1],
            ViewTh = new Date(val).getDate() + " " + mth + " " + (new Date(val).getFullYear() + 543);
        return ViewTh;
    };
    _this.convertTodatetimeISO = function(value) {
        return value ? new Date(value).toISOString() : value;
    };
    _this.convertToInputDate = function(value) {
        return value ? $filter('date')(value, "yyyy-MM-dd") : value;
    };
    _this.convertToInputYearMonthDay = function(value) {
        return value ? $filter('date')(value, "yyyy/MM/dd") : value;
    };
    _this.checkstate_jobtransaction = function(value) {
        if (value && value.id && (value.ntf_status_last_update === 4 || value.ntf_status_last_update === 5 || value.ntf_status_last_update === 6 || value.ntf_status_last_update === 10 || value.ntf_status_last_update === 11 || value.ntf_status_last_update === 12)) {
            return false;
        } else {
            return true;
        }
    };
    //##############################################################################
    return _this;
}).constant('$cordovaFileError', {
    1: 'NOT_FOUND_ERR',
    2: 'SECURITY_ERR',
    3: 'ABORT_ERR',
    4: 'NOT_READABLE_ERR',
    5: 'ENCODING_ERR',
    6: 'NO_MODIFICATION_ALLOWED_ERR',
    7: 'INVALID_STATE_ERR',
    8: 'SYNTAX_ERR',
    9: 'INVALID_MODIFICATION_ERR',
    10: 'QUOTA_EXCEEDED_ERR',
    11: 'TYPE_MISMATCH_ERR',
    12: 'PATH_EXISTS_ERR'
});