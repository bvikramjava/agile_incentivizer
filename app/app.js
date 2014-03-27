
var app = angular.module('agileApp',['firebase']);

app.config(function($routeProvider){
    $routeProvider
        .when('/tasks/new',
            {
                controller:'TaskController',
                templateUrl:'app/views/edit_task.html',
                resolve:{
                    task:function(){return false}
                }
            })
        .when('/tasks/detail/:id',
            {
                controller:'TaskController',
                templateUrl:'app/views/task_detail.html',
                resolve:{
                    task:function($route){
                        return $route.current.params.id;
                    }
                }
            })
        .when('/tasks/edit/:id',
            {
                controller:'TaskController',
                templateUrl:'app/views/edit_task.html',
                resolve:{
                    task:function($route){
                        return $route.current.params.id;
                    }
                }
            })
        .when('/tasks',
            {
                controller:'TaskController',
                templateUrl:'app/views/tasks.html',
                resolve:{
                    task:function(){return false}
                }
            })
        .when('/categories/edit/:id',
            {
                controller:'CategoryController',
                templateUrl:'app/views/edit_category.html',
                resolve:{
                    category:function($route){
                        return $route.current.params.id;
                    }
                }
            })
        .when('/categories/detail/:id',
            {
                controller:'CategoryController',
                templateUrl:'app/views/category_detail.html',
                resolve:{
                    category:function($route){
                        return $route.current.params.id;
                    }
                }
            })
        .when('/categories/new',
            {
                controller:'CategoryController',
                templateUrl:'app/views/edit_category.html',
                resolve:{
                    category:function(){return false}
                }
            })
        .when('/categories',
            {
                controller:'CategoryController',
                templateUrl:'app/views/categories.html',
                resolve:{
                    category:function(){return false}
                }
            })
        .when('/rewards',
            {
                controller:'RewardController',
                templateUrl:'app/views/rewards.html'
            })
        .when('/admin',
            {
                controller:'AdminController',
                templateUrl:'app/views/admin.html'
            })
        .when('/',
            {
                controller:'HomeController',
                templateUrl:'app/views/home.html'
            })
        .otherwise({redirectTo:'/'});
});