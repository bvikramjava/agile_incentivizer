app.controller('HomeController', function($scope, $location, instanceService){
    $scope.instance = instanceService;
    $scope.total = 0;
    $scope.remaining = 0;
    $scope.pending = 0;
    $scope.loadTask = function(id){
        $location.path('/tasks/detail/' + id);
    };
    $scope.loadCategory = function(id){
        $location.path('/categories/detail/' + id);
    };
    $scope.instance.$on('loaded', function(){
        angular.forEach($scope.instance['categories'], function(c){
            c['tasks'] = [];
            c.total_weight = 0;
            angular.forEach($scope.instance.tasks, function(t){
                if (t.category == c.name){
                    c['tasks'].push(t);
                    c.total_weight += t.weight;
                }
            })
        });
        angular.forEach($scope.instance.tasks, function(t){
            if (t.approved){
                $scope.total += t.weight;
                if (t.status == 'Open'){
                    $scope.remaining += t.weight;
                }
            }else{
                $scope.pending += t.weight;
            }
        })
    });
});

app.controller('TaskController', function($scope, $location, taskService, categoryService, instanceService, task){
    $scope.instance = instanceService;
    $scope.categories = categoryService;

    $scope.tasks = taskService;

    if (task && task != 'undefined'){
        $scope.title = "Edit Task";
        $scope.task = task;
        $scope.task_selected = true;
    }else if (task == 'undefined') {
        $location.path('/tasks');
    } else {
        $scope.title = "New Task";
        $scope.task = "new";
        $scope.tasks["new"] = {};
        $scope.task_selected = false;
    }
    $scope.loadCategory = function(name){
        angular.forEach($scope.instance.categories, function(c,k){
            if (c.name == name){
                $location.path('/categories/detail/' + k)
            }
        });
    };
    $scope.loadTask = function(id){
        $location.path('/tasks/detail/' + id);
    };
    $scope.editTask = function(id){
        $location.path('/tasks/edit/' + id);
    };
    $scope.deleteTask = function(id){
        $scope.tasks.$remove(id).then(function(){
            $location.path('/tasks')
        });
    };
    $scope.completeTask = function(id){
        $scope.tasks[id].status = "Complete";
        $scope.instance.account.points += $scope.tasks[id].weight;
        $scope.instance.$save('account');
        $scope.tasks.$save(id).then(function(id){
            $location.path('/tasks/detail/' + id);
        });
    };

    $scope.createTask = function(){
        $scope.tasks.$add({
            name:$scope.tasks["new"].name,
            category:$scope.tasks["new"].category,
            description:$scope.tasks["new"].description,
            due_date:$scope.tasks["new"].due_date,
            weight:$scope.tasks["new"].weight,
            status:"Open",
            approved:false
        }).then(function(){
            delete $scope.tasks["new"];
            $location.path('/tasks');
        });
        $location.path('/tasks');
    };
    
    $scope.updateTask = function(id){
        $scope.tasks.$save(id).then(function(id){
        });
        $location.path('/tasks/detail/' + id);
    };

    $scope.completeFilter = function(itask){
        if ($scope.show_complete){
            return itask.status == "Open";
        }else {
            return true;
        }


    };
    
});

app.controller('CategoryController', function($scope, $location, taskService, categoryService, instanceService, category) {
    $scope.instance = instanceService;
    $scope.tasks = taskService;
    $scope.categories = categoryService;


    if (category && category != 'undefined'){
        $scope.title = "Edit Category";
        $scope.category = category;
        $scope.category_selected = true;
    }else if (category == 'undefined') {
        $location.path('/categories');
    } else {
        $scope.title = "New Category";
        $scope.category = "new";
        $scope.categories["new"] = {};
        $scope.category_selected = false;
    }
    $scope.instance.$on('loaded', function(){
        angular.forEach($scope.instance['categories'], function(c){
            c['tasks'] = [];
            c.total_weight = 0;
            angular.forEach($scope.instance.tasks, function(t, k){
                if (t.category == c.name){
                    t['key'] = k;
                    c['tasks'].push(t);
                    c.total_weight += t.weight;
                }
            })
        });
    });

    $scope.loadTask = function(id){
        $location.path('/tasks/detail/' + id);
    };
    $scope.loadCategory = function(id){
        $location.path('/categories/detail/' + id);
    };
    $scope.editCategory = function(id){
        $location.path('/categories/edit/' + id);
    };
    $scope.deleteCategory = function(id){
        $scope.categories.$remove(id).then(function(){
            $location.path('/categories')
        });
    };
    $scope.completeCategory = function(id){
        $scope.categories[id].status = "Complete";
        $scope.instance.account.points += $scope.categories[id].weight;
        $scope.instance.$save('account');
        $scope.categories.$save(id).then(function(id){
            $location.path('/categories/detail/' + id);
        });
    };

    $scope.createCategory = function(){
        $scope.categories.$add({
            name:$scope.categories["new"].name
        }).then(function(){
            delete $scope.categories["new"];
            $location.path('/categories');
        });
    };

    $scope.updateCategory = function(id){
        $scope.categories.$save(id).then(function(id){
            $location.path('/categories/detail/' + id);
        });
    };
});
app.controller('RewardController', function($scope, $location, rewardService, categoryService, instanceService) {
    $scope.instance = instanceService;
    $scope.rewards = rewardService;
    $scope.cart = [];
    $scope.total = 0;
    $scope.remaining = 0;
    $scope.pending= 0;

    $scope.addToCart = function(id){
        $scope.cart.push(angular.copy($scope.rewards[id]));
    };
    $scope.removeFromCart = function(item){
        $scope.cart.splice($scope.cart.indexOf(item),1);
    };
    $scope.totalCart = function(){
        var total = 0;
        angular.forEach($scope.cart, function(item){
            total += parseInt(item.cost);
        });
        return total;
    };
    $scope.instance.$on('loaded', function(){
        angular.forEach($scope.instance.tasks, function(t){
            if (t.approved){
                $scope.total += t.weight;
                if (t.status == 'Open'){
                    $scope.remaining += t.weight;
                }
            }else{
                $scope.pending += t.weight;
            }
        })
    });
    $scope.purchase = function(){
        angular.forEach($scope.cart, function(item){
            $scope.instance.account.points = parseInt($scope.instance.account.points) - parseInt(item.weight);
            $scope.instance.$save('account');
            if (!$scope.instance.account.hasOwnProperty('rewards')){
                $scope.instance.account['rewards'] = [];
            }
            $scope.instance.account.rewards.push(item);
            $scope.instance.$save('account');
        });
        $scope.cart = [];
    }
});
app.controller('AdminController', function($scope, $location, rewardService, categoryService, taskService, instanceService) {
    $scope.instance = instanceService;
    $scope.rewards = rewardService;
    $scope.tasks = taskService;
    $scope.cart = [];
    $scope.total = 0;
    $scope.remaining = 0;
    $scope.pending= 0;

    $scope.instance.$on('loaded', function(){
        $scope.calculate();
    });
    $scope.calculate = function(){
        angular.forEach($scope.instance.tasks, function(t){
            if (t.approved){
                $scope.total += t.weight;
                if (t.status == 'Open'){
                    $scope.remaining += t.weight;
                }
            }else{
                $scope.pending += t.weight;
            }
        })
    };

    $scope.approve = function(id){
        $scope.tasks[id].approved = true;
        $scope.tasks.$save(id);
        $scope.calculate();
    };

    $scope.newReward = function() {
        $scope.rewards.$add({
            name:$scope.r_name,
            description:$scope.r_description,
            cost:$scope.r_cost
        })
    };
});