app.controller('MapCtrl', function(variable, $compile, $timeout, $cordovaGeolocation, $ionicPopup, $scope, $ionicPlatform, $ionicLoading) {

    $scope.$on('$ionicView.enter', function(e, config) {
        ionic.trigger('resize');
    });

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        $scope.map;
        $scope.Geolocation = variable.getGeolocation();
        // var here = new google.maps.LatLng(13.8188642, 100.5120992);
        var user = new google.maps.LatLng(variable.getGeolocation().latitude, variable.getGeolocation().longitude);
        var mapOptions = {
            center: user,
            zoom: 16,
            streetViewControl: false,
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        genMarker();
    });

    // #############################################################################
    // หมุด
    function genMarker() {
        var user = new google.maps.LatLng($scope.Geolocation.latitude, $scope.Geolocation.longitude);
        var school = new google.maps.LatLng(13.7749851, 100.5048563);
        var iconSchool = new google.maps.MarkerImage("img/map/school.png", null, /* size is determined at runtime */ null, /* origin is 0,0 */ null, /* anchor is bottom center of the scaled image */ new google.maps.Size(45, 45));
        var iconUser = new google.maps.MarkerImage("img/map/user_marker.png", null, /* size is determined at runtime */ null, /* origin is 0,0 */ null, /* anchor is bottom center of the scaled image */ new google.maps.Size(45, 45));
        //user
        var contentStringUser = "<div><a style='font-size: 22px;font-weight: bold;'>" + variable.getSession().fullname + "</a></div>";
        var compiledUser = $compile(contentStringUser)($scope);
        var infowindowUser = new google.maps.InfoWindow({ content: compiledUser[0] });
        var markerUser = new google.maps.Marker({
            position: user,
            map: $scope.map,
            icon: iconUser
        });
        google.maps.event.addListener(markerUser, 'click', function() {
            infowindowUser.open($scope.map, markerUser);
        });
        //school
        var lat = 13.7749851;
        var lng = 100.5048563;
        var contentStringSchool = "<div><a style='font-size: 22px;font-weight: bold;' ng-click='navigator(" + lat + "," + lng + ")'>โรงเรียนวัดราชาธิวาส</a></div>";
        var compiledSchool = $compile(contentStringSchool)($scope);
        var infowindowSchool = new google.maps.InfoWindow({ content: compiledSchool[0] });
        var markerSchool = new google.maps.Marker({
            position: school,
            map: $scope.map,
            icon: iconSchool
        });
        google.maps.event.addListener(markerSchool, 'click', function() {
            infowindowSchool.open($scope.map, markerSchool);
        });
    }

    // #############################################################################
    // หาหมุดโรงเรียน
    $scope.findSchool = function(lat, lng) {
        var school = new google.maps.LatLng(13.7749851, 100.5048563);
        $scope.map.setCenter(school);
    };

    // #############################################################################
    // หาหมุด user
    $scope.findme = function() {
        var user = new google.maps.LatLng($scope.Geolocation.latitude, $scope.Geolocation.longitude);
        $scope.map.setCenter(user);
    };

    // #############################################################################
    // นำทาง
    $scope.navigator = function(lat, lng) {
        var alertPopup = $ionicPopup.confirm({
            cssClass: 'alert-success',
            title: "โรงเรียนวัดราชาธิวาส",
            template: "ต้องการนำทางหรือไม่",
            buttons: [{
                text: '<b>ตกลง</b>',
                type: 'button-viriyah',
                onTap: function(res) {
                    if (res) {
                        var path;
                        path = 'google.navigation:' + "q=" + lat + "," + lng + "&mode=d&avoid=tf";
                        window.location.href = path;
                    }
                }
            }, {
                text: 'ยกเลิก'
            }]
        });
    };
});