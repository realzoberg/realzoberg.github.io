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
}

document.addEventListener('DOMContentLoaded', onload, false);