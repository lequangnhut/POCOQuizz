// đổi pass
mycourse.controller('changePass', function ($scope, $rootScope, $http, $routeParams) {

    $http.get(API + 'student/?email=' + $rootScope.SesionUser.email).then(function (response) {
        $scope.student = response.data;

        $scope.changePass = function () {

            let oldPass = $scope.oldPass;
            let newPass = $scope.newPass;
            let cofirmPass = $scope.cofirmPass;

            if ($scope.student[0].password == oldPass) {

                if ($scope.student[0].password == newPass) {
                    Swal.fire({
                        title: 'Thất bại !',
                        text: 'Mật khẩu mới không được trùng với mật khẩu cũ !',
                        icon: 'error',
                        confirmButtonText: 'Ẩn đi !'
                    });
                    return;
                }

                if (newPass != cofirmPass) {
                    $
                    Swal.fire({
                        title: 'Thất bại !',
                        text: 'Mật khẩu không đồng nhất !',
                        icon: 'error',
                        confirmButtonText: 'Ẩn đi !'
                    });
                    return;
                }

                if (newPass == cofirmPass && $scope.student[0].password != newPass) {

                    Swal.fire({
                        title: 'Đổi mật khẩu ?',
                        text: "Bạn có chắc muốn đổi mật khẩu không ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Đồng ý !'
                    }).then((result) => {

                        if (result.isConfirmed) {

                            var data = {
                                id: $rootScope.SesionUser.id,
                                email: $rootScope.SesionUser.email,
                                fullname: $rootScope.SesionUser.fullname,
                                password: newPass,
                                phone: $rootScope.SesionUser.phone,
                                gender: $rootScope.SesionUser.gender,
                                date: $rootScope.SesionUser.date
                            }

                            $http({
                                method: 'PUT',
                                url: API + 'student/' + $routeParams.id,
                                data: data
                            }).then(function successCallback(response) {

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
                                    icon: 'Thành công !',
                                    title: 'Đổi mật khẩu thành công !'
                                })

                                localStorage.removeItem('userInfo');
                                window.location.href = '#!/home'
                                location.reload();

                            }, function errorCallback(error) {
                                console.log('lỗi này là ' + error);
                            });

                        }

                    })

                }

            } else {
                Swal.fire({
                    title: 'Thất bại !',
                    text: 'Mật khẩu cũ không khớp !',
                    icon: 'error',
                    confirmButtonText: 'Ẩn đi !'
                });
            }

        };

    });

});