/* global app, WebSocket */
app.factory('variable', function($filter, $window) {
    var data = new Object();
    var jobNotify = new Array();
    var slide_doc = 0;
    var page_ac;
    var doc_forr = new Object();
    var docsAc = new Array();
    return {
        //##############################################################################
        setGeolocation: function(data) {
            $window.localStorage["location"] = JSON.stringify(data);
            this.location = data;
        },
        getGeolocation: function() {
            return $window.localStorage["location"] ? JSON.parse($window.localStorage["location"]) : { latitude: 13.8193243, longitude: 100.5142662 };
        },
        //##############################################################################
        setTokens: function(data) {
            data = data === null ? data : JSON.stringify(data);
            $window.localStorage["tokens"] = data;
        },
        getTokens: function() {
            return $window.localStorage["tokens"] ? JSON.parse($window.localStorage["tokens"]) : null;
        },
        //##############################################################################
        setSession: function(data) {
            data = data === null ? data : JSON.stringify(data);
            $window.localStorage["session"] = data;
        },
        getSession: function() {
            // return $window.localStorage["session"] ? JSON.parse($window.localStorage["session"]) : '';
            return {
                "firstname": "ทดสอบ",
                "lastname": "ลืมรหัส",
                "tel": "999",
                "email": "rmutpcpe123@gmail.com",
                "level": "นักเรียน",
                "room_student": "ม.6/2",
                "username": "plakk",
                "latitude": 13.8352587,
                "longitude": 100.49971,
                "devicetoken": "fhsVJ5utJfY:APA91bExZr7ZmvVeXYKOIfgFpvMS1hivH3hcelYKE2tzuy9R1SnDtQ34PvgNNm_lS42UdBw6ppZ9zFJfnoKZMvbz_er78G9kU5MVBdUpLQfCne6Mlkb8dc-VM0IxP9-dFVw4a7SOJG49",
                "news_id": [],
                "favorite_news_id": [],
                "user_id": 16,
                "active": true,
                "userrole": 4,
                "fullname": "คุณทดสอบ ลืมรหัส",
                "_id": "peEidash6TywSKDFS"
            }
        },
        //##############################################################################
        //สิทธิ์ user
        setUserrole: function(data) {
            data = data === null ? data : JSON.stringify(data);
            $window.localStorage["userrole"] = data;
        },
        getUserrole: function() {
            return $window.localStorage["userrole"] ? JSON.parse($window.localStorage["userrole"]) : '';
        },
        //##############################################################################
        //ข่าว
        setNews: function(value) {
            $window.localStorage["news"] = JSON.stringify(value);
            data["news"] = value;
        },
        getNews: function() {
            return $window.localStorage["news"] ? JSON.parse($window.localStorage["news"]) : [];
        },
        //##############################################################################
        //ข่าวที่ชื่นชอบ
        setFavorite: function(value) {
            $window.localStorage["favorite"] = JSON.stringify(value);
            data["favorite"] = value;
        },
        getFavorite: function() {
            return $window.localStorage["favorite"] ? JSON.parse($window.localStorage["favorite"]) : [];
        },
        //##############################################################################
        //ประวัติโรงเรียน
        setContact: function(value) {
            $window.localStorage["contact"] = JSON.stringify(value);
            data["contact"] = value;
        },
        getContact: function() {
            return $window.localStorage["contact"] ? JSON.parse($window.localStorage["contact"]) : [];
        },
        //##############################################################################
        //id งานที่อ่านแล้ว
        setReadNews: function(value) {
            $window.localStorage["readNews"] = JSON.stringify(value);
            data["readNews"] = value;
        },
        getReadNews: function() {
            return $window.localStorage["readNews"] ? JSON.parse($window.localStorage["readNews"]) : [];
        },
        //##############################################################################
        //งานที่ยังไม่อ่าน
        setUnReadNews: function(value) {
            $window.localStorage["UnreadNews"] = JSON.stringify(value);
            data["UnreadNews"] = value;
        },
        getUnReadNews: function() {
            return $window.localStorage["UnreadNews"] ? JSON.parse($window.localStorage["UnreadNews"]) : [];
        },
        find: function(name, filter) {
            data[name] = data[name] ? data[name] : $window.localStorage[name] ? JSON.parse($window.localStorage[name]) : [];
            if (name) {
                var query = new Object();
                if (filter) {
                    query = {};
                    for (var key in filter) {
                        query[key] = filter[key];
                    }
                }
                var v = $filter('filter')(data[name], query, true);
                return v ? v : new Array();
            }
        },
        findOne: function(name, filter) {
            data[name] = data[name] ? data[name] : $window.localStorage[name] ? JSON.parse($window.localStorage[name]) : [];
            if (name) {
                var query = new Object();
                if (filter) {
                    query = {};
                    for (var key in filter) {
                        query[key] = filter[key];
                    }
                }
                var v = $filter('filter')(data[name], query, true);
                return v ? v[0] : null;
            }
        }
    };
});