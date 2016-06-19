if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function(callback, context) {
        for (var i = 0; i < this.length; i++) {
            callback.apply(context, [ this[i], i, this ]);
        }
    };
}

(function (document) {
    function onload() {
        var container1 = document.getElementById("test-container-1");
        var rating1 = Rating(container1, "test-container-1").init();

        var container2 = document.getElementById("test-container-2");
        var rating2 = Rating(container2, "test-container-2").init();
        rating2.currentRating(2);

        var container3 = document.getElementById("test-container-3");
        var rating3 = Rating(container3, "test-container-3").init();
        rating3.currentRating(5);

        var container4 = document.getElementById("test-container-4");
        var rating4 = Rating(container4, "test-container-4", "other-").init();
    }

    document.addEventListener('DOMContentLoaded', onload, false);

})(document);
