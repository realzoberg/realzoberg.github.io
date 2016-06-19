(function () {
    var fakeDocument = {
        createElement: function(tagName) {
            var result = {
                className: undefined,
                innerHTML: "",
                querySelectorAll: function(string) {
                    return null;
                },
                querySelector: function(string) {
                   return null; 
                }
            };

            return result;
        },
        getElementById(id) {
            var result =  {
                appendChild: function(element) {
                    return element;
                }
            }
            return result;
        }
    }

    var document = fakeDocument;

    function equals(var1, var2, msg) {
        if(var1 != var2) {
            throw Error(msg);
        }
    }

    var container1 = document.getElementById("test-container-1");
    var rating1 = Rating(container1, "test-container-1").init();
    equals(0, rating1.currentRating(), "currentRating() failed");

    var container2 = document.getElementById("test-container-2");
    var rating2 = Rating(container2, "test-container-2").init();
    equals(0, rating2.currentRating(), "currentRating() failed");
    rating2.currentRating(2);
    equals(2, rating2.currentRating(), "currentRating() failed");
    rating2.currentRating(0);
    equals(0, rating2.currentRating(), "currentRating() failed");

    var container3 = document.getElementById("test-container-3");
    var rating3 = Rating(container3, "test-container-3").init();
    equals(0, rating3.currentRating(), "currentRating() failed");
    rating3.currentRating(0);
    equals(0, rating3.currentRating(), "currentRating() failed");
    rating3.currentRating(5);
    equals(5, rating3.currentRating(), "currentRating() failed");

    var container4 = document.getElementById("test-container-4");
    var rating4 = Rating(container4, "test-container-4", "other-").init();
    equals(0, rating4.currentRating(), "currentRating() failed");

    var container5 = document.getElementById("test-container-5");
    try {
        var rating5 = Rating(container5, "test-container-5").init();
        throw Error("init() throw Error test failed")
    } catch(err) {
    }

    try {
        var rating5 = Rating(container5, "test-container-5").init();
        rating3.currentRating(-1);
        throw Error("currentRating(value) throw Error test failed");
    } catch(err) {
    }

    alert("All tests passed successfully!")

})();
