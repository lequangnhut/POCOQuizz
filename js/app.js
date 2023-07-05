// backtop
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });
    $("#backtop").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 0);
    });
});


// angular js

let API = 'http://localhost:3000/';

let mycourse = angular.module('poco', ['ngRoute']);

mycourse.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'view/home/home.html',
            controller: 'listCourseFloat'
        })
        .when('/sigin', {
            templateUrl: 'view/auth/sigin.html',
            controller: 'authSigin'
        })
        .when('/login', {
            templateUrl: 'view/auth/login.html',
            controller: 'authLogin'
        })
        .when('/allCourse', {
            templateUrl: 'view/home/all-Course.html',
            controller: 'listCourse'
        })
        .when('/quiz/:id/:name', {
            templateUrl: 'view/quiz/quiz.html',
            controller: 'quizController'
        })
        .when('/info-profile/:id', {
            templateUrl: 'view/profile/info-profile.html',
            controller: 'changeInfo'
        })
        .when('/edit-profile/:id', {
            templateUrl: 'view/profile/edit-profile.html',
            controller: 'changeInfo'
        })
        .when('/edit-password/:id', {
            templateUrl: 'view/auth/edit-password.html',
            controller: 'changePass'
        })
        .otherwise('/home', {
            redirectTo: 'view/home/home.html'
        })
});

// show danh sách khoá học 
mycourse.controller('listCourse', function ($scope, $http) {
    $http({
        method: 'GET',
        url: API + 'subjects'
    }).then(function successCallback(response) {
        $scope.subjects = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });
});

mycourse.controller('listCourseFloat', function ($scope, $http) {
    $http({
        method: 'GET',
        url: API + 'subjectFloat'
    }).then(function successCallback(response) {
        $scope.subjectFloat = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });
});