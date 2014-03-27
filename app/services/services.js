app.factory("taskService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://luminous-fire-9343.firebaseio.com/tasks");
    return $firebase(ref);
}]);

app.factory("categoryService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://luminous-fire-9343.firebaseio.com/categories");
    return $firebase(ref);
}]);

app.factory("instanceService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://luminous-fire-9343.firebaseio.com");
    return $firebase(ref);
}]);

app.factory("rewardService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://luminous-fire-9343.firebaseio.com/rewards");
    return $firebase(ref);
}]);