// factory auth
mycourse.factory('userService', function ($http) {

    const baseUrl = API + 'student';

    return {

        sigin: function (user) {

            return $http.post(baseUrl, user).then(function (response) {
                return response.data;
            });

        },

        loginUser: function (auth) {

            return $http.get(baseUrl + '/?email=' + auth.email + '&password=' + auth.password).then(function (response) {
                if (response.data.length > 0) {
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                } else {
                    throw new Error('không tồn tại');
                }

            });

        },

        checkEmailExits: function (email) {

            return $http.get(baseUrl + '/?email=' + email)
                .then(function (response) {
                    var email = response.data;
                    return email.length > 0;
                })
                .catch(function (error) {
                    console.log('lỗi này là ' + error);
                });

        }

    }

});

// đăng kí
mycourse.controller('authSigin', function ($scope, userService) {

    $scope.sigin = function () {

        let data = {
            id: Math.random(),
            email: $scope.email,
            fullname: $scope.fullname,
            password: $scope.password,
            phone: $scope.phone,
            gender: $scope.gender,
            date: $scope.birthday
        }

        userService.checkEmailExits(data.email).then(function (exits) {

            if (exits) {
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
                    icon: 'info',
                    title: 'Email đã có người sử dụng !'
                })
            } else {

                userService.sigin(data).then(function (response) {

                    Swal.fire(
                        'Thành công !',
                        'Chúc mừng bạn đăng ký tài khoản thành công !',
                        'success'
                    )

                    location.href = '#!/login'

                });
            }

        })

    }

});

// đăng nhập
mycourse.controller('authLogin', function ($scope, $rootScope, $http, userService) {

    $scope.login = function () {

        let auth = {
            email: $scope.email,
            password: $scope.password
        };

        if ($scope.remember) {
            localStorage.setItem('email', auth.email);
            localStorage.setItem('password', auth.password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

        userService.loginUser(auth)
            .then(function (response) {

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
                    title: 'Đăng nhập thành công !'
                })

                location.href = '#!/home'
                location.reload();

            })
            .catch(function (error) {
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
                    icon: 'error',
                    title: 'Sai thông tin đăng nhập !'
                })
            });

    }

    var saveEmail = localStorage.getItem('email');
    var savePassword = localStorage.getItem('password');

    if (saveEmail && savePassword) {
        $scope.email = saveEmail;
        $scope.password = savePassword;
        $scope.remember = true;
    }

    var userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        var user = JSON.parse(userInfo);
        $rootScope.SesionUser = user[0];
        $rootScope.SesionUser.date = new Date(user[0].date);
    }

    // đăng xuất
    $scope.logOut = function () {
        localStorage.removeItem('userInfo');
        window.location.href = '#!/home'
        location.reload();
        $scope.rememberPassword();
    };


    // Lấy lại mật khẩu
    $scope.fogotPass = function () {

        $scope.list_students = [];

        $http.get(API + 'student').then(function (response) {
            $scope.list_students = response.data;

            let fullname = $scope.fullname;
            let email = $scope.gmail;

            for (let i = 0; i < $scope.list_students.length; i++) {

                if (email == $scope.list_students[i].email && fullname == $scope.list_students[i].fullname) {

                    if (Swal.fire({
                        title: 'Thành công !',
                        text: 'Mật khẩu cũ của bạn là: ' + $scope.list_students[i].password,
                        icon: 'success',
                        confirmButtonText: 'Ẩn đi !'
                    }))

                        return;
                }
            };
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
                icon: 'error',
                title: 'Họ tên hoặc email không chính xác !'
            })

        })
    }

});