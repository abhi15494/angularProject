var app = angular.module('myapp', ['ngRoute']);
// Function before app run
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: './views/home.html',
        controller: 'appController' 
    })
    .when("/data", { 
        templateUrl: './views/data.html',
        controller: 'appController'
    })
    .when("/contact", { templateUrl: './views/contact.html' })
    .otherwise({
        redirectTo: '/home'
    })
}]);

// Function after app run
app.run(function(){
});

app.directive("random-data", [function(){
    return {
        // E for element like html and A is for attribute in html
        restrict: "E",
        scope: {
            
        }
    };
}]);

// app.controller
app.controller("appController", ['$scope', '$http', function($scope, $http){
    $scope.ninclose = function(data){
        dtr = $scope.list.indexOf(data);
        $scope.list.splice(dtr, 1);
    };
    
    $scope.addnin = function(){
        $scope.list.push({
            name: $scope.newnin.name,
            belt: $scope.newnin.belt,
            rate:parseInt($scope.newnin.price),
            status: true
        });
        
        $scope.list.name = "";
        $scope.list.belt = "";
        $scope.list.rate = 0;
        $scope.list.true = false;
    }
    
    $http.get('../eg1/data/data.json').then(function(response){
        $scope.list = response.data;
    });

    // Convert object to JSON
    // console.log(angular.toJson($scope.list));
}]);