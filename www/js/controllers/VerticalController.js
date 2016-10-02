(function(){
    angular.module('starter')
    .controller('VerticalController', ['$scope', '$state', 'localStorageService', 'SocketService', 'moment', '$ionicScrollDelegate', VerticalController]);

    function VerticalController($scope, $state, localStorageService, SocketService, moment, $ionicScrollDelegate){

        var me = this;

        me.messages = [];

        $scope.humanize = function(timestamp){
            return moment(timestamp).fromNow();
        };

        me.current_vertical = localStorageService.get('vertical');

        var current_user = localStorageService.get('username');

        $scope.isNotCurrentUser = function(user){

            if(current_user != user){
                return 'not-current-user';
            }
            return 'current-user';
        };


        $scope.sendTextMessage = function(){

            var msg = {
                'vertical': me.current_vertical,
                'user': current_user,
                'text': me.message,
                'time': moment()
            };

            me.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();

            me.message = '';

            SocketService.emit('send:message', msg);
        };


        $scope.leaveVertical = function(){
            var msg = {
                'user': current_user,
                'vertical': me.current_vertical,
                'time': moment()
            };

            SocketService.emit('leave:vertical', msg);
            $state.go('verticals');

        };


        SocketService.on('message', function(msg){
            me.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();
        });


    }

})();