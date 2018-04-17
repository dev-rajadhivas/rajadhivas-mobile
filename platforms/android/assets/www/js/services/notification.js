/* global app */

app.run(function($rootScope, $cordovaPushV5, $cordovaLocalNotification, variable, Fn) {

    document.addEventListener("deviceready", function() {
        // var count_noti = 1;
        var options = {
            android: {
                senderID: "77660472674"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        };

        $cordovaPushV5.initialize(options).then(function() {
            $cordovaPushV5.onNotification();
            $cordovaPushV5.onError();
            $cordovaPushV5.register().then(function(registrationId) {
                variable.setTokens(registrationId);
            })
        });

        // triggered every time notification received
        $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
            // console.log(JSON.stringify(data));
            // if (data.additionalData.foreground === true) {
            $cordovaLocalNotification.schedule({
                text: data.message ? data.message : 'แจ้งงานใหม่ !',
                data: data,
                icon: "res://img/notification/icon.png",
                smallIcon: "res://img/notification/icon.png"
            }).then(function(result) {
                //
            });
        });

        // triggered every time error occurs
        $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e) {
            alert("errorOcurred" + e.message);
            // e.message
        });
    }, false);
});