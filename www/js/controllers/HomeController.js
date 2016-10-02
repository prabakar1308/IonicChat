(function(){
    angular.module('starter')
    .controller('HomeController', ['$scope', '$state', 'localStorageService', 'SocketService', HomeController]);

    function HomeController($scope, $state, localStorageService, SocketService){

        var me = this;

        me.current_vertical = localStorageService.get('vertical');
        me.verticals = ['All Verticals','TMS'];

        $scope.login = function(username){
            localStorageService.set('username', username);
            $state.go('verticals');
        };

        $scope.enterVertical = function(vertical_name){

            me.current_vertical = vertical_name;
            localStorageService.set('vertical', vertical_name);

            var vertical = {
                'vertical_name': vertical_name
            };

            SocketService.emit('join:vertical', vertical);

            $state.go('vertical');
        };

    }

})();