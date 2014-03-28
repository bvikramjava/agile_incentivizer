var firebaseUrl = "https://luminous-fire-9343.firebaseio.com";

app.factory("taskService", ["$firebase", function($firebase) {
    var ref = new Firebase(firebaseUrl + "/tasks");
    return $firebase(ref);
}]);

app.factory("categoryService", ["$firebase", function($firebase) {
    var ref = new Firebase(firebaseUrl + "/categories");
    return $firebase(ref);
}]);

app.factory("instanceService", ["$firebase", function($firebase) {
    var ref = new Firebase(firebaseUrl + "");
    return $firebase(ref);
}]);

app.factory("rewardService", ["$firebase", function($firebase) {
    var ref = new Firebase(firebaseUrl + "/rewards");
    return $firebase(ref);
}]);

app.factory("accountService", ["$firebase", function($firebase) {
    var ref = new Firebase(firebaseUrl + "/account");
    return $firebase(ref);
}]);