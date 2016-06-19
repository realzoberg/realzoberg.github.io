if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function(callback, context) {
        for (var i = 0; i < this.length; i++) {
            callback.apply(context, [ this[i], i, this ]);
        }
    };
}

function onload() {
    var container1 = document.getElementById("test-container-1");
    var rating1 = Rating(container1, "test-container-1", 5);
    console.log("Rating1: ", rating1.currentRating());

    var container2 = document.getElementById("test-container-2");
    var rating2 = Rating(container2, "test-container-2", 0);
    console.log("Rating2: ", rating2.currentRating());
    rating2.currentRating(2);
    console.log("Rating2: ", rating2.currentRating());
    rating2.currentRating(0);
    console.log("Rating2: ", rating2.currentRating());

    var container3 = document.getElementById("test-container-3");
    var rating3 = Rating(container3, "test-container-3", 3);
    console.log("Rating3: ", rating3.currentRating());
    rating3.currentRating(0);
    console.log("Rating3: ", rating3.currentRating());
    rating3.currentRating(3);
    console.log("Rating3: ", rating3.currentRating());

    var container4 = document.getElementById("test-container-4");
    var rating4 = Rating(container4, "test-container-4", undefined, "other-");
    console.log("Rating4: ", rating4.currentRating());

    var container5 = document.getElementById("test-container-5");
    try {
        var rating5 = Rating(container5, "test-container-5", 6);
    } catch(err) {
        console.log("Throw test success!", err);
    }

    try {
        var rating5 = Rating(container5, "test-container-5", 3);
        rating3.currentRating(-1);
    } catch(err) {
        console.log("Throw test success!", err);
    }
}

document.addEventListener('DOMContentLoaded', onload, false);