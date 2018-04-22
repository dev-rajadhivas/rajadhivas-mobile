/* global app, WebSocket */

app.factory('RestAPI', function($http, $rootScope) {
    var server = "http://rajadhivas.ddns.net:3000"; // server develop
    $rootScope.server_url = "http://rajadhivas.ddns.net:3000";
    var headers = 'application/json';
    return {
        Login: function(data) {
            return $http({
                method: 'POST',
                url: server + '/signin',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        registers: function(data) {
            return $http({
                method: 'POST',
                url: server + '/register',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        changePass: function(data) {
            return $http({
                method: 'POST',
                url: server + '/changePassword',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        forgetPass: function(data) {
            return $http({
                method: 'POST',
                url: server + '/forgetPassword',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        getContact: function() {
            return $http({
                method: 'GET',
                url: server + '/queryContact',
                headers: {
                    'Content-Type': headers
                }
            });
        },
        getNews: function() {
            return $http({
                method: 'GET',
                url: server + '/queryNews',
                headers: {
                    'Content-Type': headers
                }
            });
        },
        search: function(data) {
            return $http({
                method: 'POST',
                url: server + '/newsSearch',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        checkReadNews: function(data) {
            return $http({
                method: 'POST',
                url: server + '/readNews',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        favoriteAdd: function(data) {
            return $http({
                method: 'POST',
                url: server + '/favorites',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        getNewsUnRead: function(data) {
            return $http({
                method: 'POST',
                url: server + '/newsFilter',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        getFavorite: function(data) {
            return $http({
                method: 'POST',
                url: server + '/queryfavorites',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        createBoards: function(data) {
            return $http({
                method: 'POST',
                url: server + '/insertBoard',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        Boardlists: function() {
            return $http({
                method: 'GET',
                url: server + '/BoardList',
                headers: {
                    'Content-Type': headers
                }
            });
        },
        Boardreads: function(data) {
            return $http({
                method: 'POST',
                url: server + '/Boardread',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        BoardOnelists: function(data) {
            return $http({
                method: 'POST',
                url: server + '/BoardOnelist',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        BoardComments: function(data) {
            return $http({
                method: 'POST',
                url: server + '/BoardComment',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        },
        BoardcreateComments: function(data) {
            return $http({
                method: 'POST',
                url: server + '/BoardcreateComment',
                headers: {
                    'Content-Type': headers
                },
                data: data
            });
        }
    };
});