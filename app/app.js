"use strict";

const app = angular.module('app', ['ngRoute']);

// Inject app into controllers.
const WelcomeCtrl = require('./welcome/welcome-controller')(app);
const ChatroomCtrl = require('./chatroom/chatroom-controller')(app);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $routeProvider
        .when('/', {
            template: require('./welcome/welcome.html'),
            controller: 'WelcomeCtrl'
      })
        .when('/:userId', {
            templateUrl: require('./chatroom/chatroom.html'),
            controller: 'ChatroomCtrl'
      })
        .otherwise({
            redirectTo: '/'
      });
  }
]);
