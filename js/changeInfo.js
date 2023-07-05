// đổi thông tin 
mycourse.controller('changeInfo', function ($scope, $http, $routeParams) {

    $http({
        method: 'GET',
        url: API + 'student/' + $routeParams.id,
        data: $scope.quiz
    }).then(function successCallback(response) {
        $scope.quiz = response.data;
        $scope.quiz.date = new Date($scope.quiz.date);
    }, function errorCallback(response) {
        console.log(response.data);
    });

    $scope.saveInfo = function () {

        $http({
            method: 'PUT',
            url: API + 'student/' + $routeParams.id,
            data: $scope.quiz
        }).then(function successCallback(response) {

            $scope.quiz = response.data;

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Lưu thông tin thành công !'
            })

        }, function errorCallback(response) {
            console.log(response.data);
        });

    }

});

function myFunction() {
    var x = document.getElementById("profilePass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}