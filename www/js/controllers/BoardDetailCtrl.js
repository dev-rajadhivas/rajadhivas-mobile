app.controller('BoardDetailCtrl', function($rootScope, $scope, $ionicPlatform, $stateParams, RestAPI, Fn, variable, $ionicHistory) {

    // #############################################################################
    // ทำเมื่อหน้าพร้อมใช้งาน
    $ionicPlatform.ready(function() {
        console.log($stateParams.board_id)
        findBoard();
    });

    // #############################################################################
    // ดึงข้อมูลบรอ์ด
    function findBoard() {
        var content_id = { content_id: parseInt($stateParams.board_id) };
        RestAPI.BoardOnelists(content_id).success(function(results, status, headers, config) {
            if (results.status === true) {
                $scope.dataBoard = results.data;
                findBoardComments(content_id);
            } else {
                Fn.AlertPopup("", results.messages);
            }
        }, function(error) {
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }

    // #############################################################################
    // ดึงข้อมูลบรอ์ด
    function findBoardComments(content_id) {
        RestAPI.BoardComments(content_id).success(function(results, status, headers, config) {
            if (results.status === true) {
                $scope.board_comment = results.data;
            }
        }, function(error) {
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }

    // #############################################################################
    // เขียนคอมเม้น
    $scope.createComment = function(val) {
        $rootScope.$broadcast('loading:show');
        var comment = new Object();
        comment.content_id = parseInt($stateParams.board_id);
        comment.content_detail = val;
        comment.create_by = variable.getSession().user_id;
        comment.create_by_name = variable.getSession().firstname + " " + variable.getSession().lastname;
        RestAPI.BoardcreateComments(comment).success(function(results, status, headers, config) {
            if (results.status === true) {
            	var content_id = { content_id: $stateParams.board_id };
            	$rootScope.$broadcast('loading:hide');
                findBoard();
            } else {
            	$rootScope.$broadcast('loading:hide');
                Fn.AlertPopup("", results.messages);
            }
        }, function(error) {
        	$rootScope.$broadcast('loading:hide');
            Fn.AlertPopup("", "การข้อผิดพลาดจากระบบ");
        });
    }
});