var app = angular.module('myapp', ['ngRoute', 'ngAnimate']);
// Function before app run
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: './views/home.html'
        // ,controller: 'appController' 
    })
    .when("/result", {
        templateUrl: './views/random.html'
    })
    .when("/data", { 
        templateUrl: './views/data.html',
        controller: 'appController'
    })
    .when("/contact", { 
        templateUrl: './views/contact.html' 
    })
    .otherwise({
        redirectTo: '/home'
    })
}]);

// Function after app run
app.run(function(){
});

app.directive("randomData", [function(){
    // Define properties and functionality
    return {
        // E for element like html and A is for attribute in html { C and N }
        restrict: "E", // Used as an element 
        // To get access and manipulate data between modal and view
        scope: { // Isolate scope
            datatopass: "=", //Key value pair to access data and = means we are binding the data together
            titletopass: "="
        },
        templateUrl: "./views/random.html", //
        // template: "<img ng-src="{{listp[0].thumb}}"/>", //use template to send data to views
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 4);
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