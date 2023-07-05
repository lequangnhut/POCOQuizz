// facotry
mycourse.factory('quizFactory', function ($http, $routeParams) {

    return {
        getQuestions: function () {
            return $http.get(API + 'quizs/' + $routeParams.id).then(function (response) {
                questions = response.data;
            })
        },
        getQuestion: function (id) {
            var randomItem = questions.data[Math.floor(Math.random() * questions.data.length)];
            var count = questions.data.length;

            if (count > 11) {
                count = 11;
            }
            if (id < count) {
                return randomItem;
            }
            else {
                return false;
            }
        }
    }

});

// câu hỏi
mycourse.controller('quizController', function ($http, $routeParams, quizFactory) {
    $http({
        method: 'GET',
        url: API + 'quizs/' + $routeParams.id
    }).then(function successCallback(response) {
        quizFactory.questions = response.data;
    }, function errorCallback(response) {
        console.log(response.data);
    });
});

// bắt đầu bài quizz
mycourse.directive('quizfpoly', function (quizFactory, $routeParams, $timeout) {

    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'view/quiz/template-quiz.html',
        link: function (scope, elem, attrs) {

            scope.nameQuiz = $routeParams.name;

            scope.start = function () {
                quizFactory.getQuestions().then(function () {
                    scope.subjectName = $routeParams.name;
                    scope.id = 1;
                    scope.quizOver = false; //chưa hoàn thành
                    scope.inProgess = true;
                    scope.getQuestion();
                    scope.startTime();
                })
            };

            scope.onTimeOut = function () {
                scope.counter--;
                scope.myTimeOut = $timeout(scope.onTimeOut, 1000);
                if (scope.counter == -1) {
                    $timeout.cancel(scope.myTimeOut);
                    scope.quizOver = true;
                    Swal.fire({
                        title: 'Thông báo !',
                        text: 'Bạn hết thời gian làm bài !',
                        icon: 'info',
                        confirmButtonText: 'Ẩn đi !'
                    })
                }
            }

            scope.startTime = function () {
                scope.counter = 600;
                $timeout(scope.onTimeOut, 1000);
            }

            scope.reset = function () {
                scope.score = 0;
                scope.inProgess = false;
            };

            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);

                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                }
                else {
                    scope.quizOver = true;
                }

            }

            scope.checkAnswer = function () {
                if (!$('input[name = answer]:checked').length) {
                    Swal.fire({
                        title: 'Thông tin !',
                        text: 'Vui lòng chọn đáp án !',
                        icon: 'info',
                        confirmButtonText: 'Ẩn đi !'
                    })
                    return;
                };

                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    scope.score++;
                    scope.correctAns = true;
                }
                else {
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            }

            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            }
            scope.reset();

            scope.saveQuiz = function () {
                Swal.fire({
                    title: 'Thành công !',
                    text: 'Lưu kết quả thành công !',
                    icon: 'success',
                    confirmButtonText: 'Ẩn đi !'
                })
            }
        }
    }
});

//Đồng hồ
mycourse.filter('Timer', function ($filter) {
    return function (number) {
        var minutes = Math.round((number - 30) / 60);
        var remainingSeconds = number % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }
        var timer = (minutes = (minutes < 10) ? "0" + minutes : minutes) + ":" + remainingSeconds;
        return timer;
    }
});