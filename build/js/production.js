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
/**
 * Rating widget.
 * Appends rating widget inside container.
 *
 * @param      HTML DOM Node Element object       container      Container for a widget.
 * @param      {string}                           prefix         Prefix for widget element ids.
 * @param      {(number)}                         currentRating  (optional) Initial rating in [0,5] 
 *                                                               (default 0).
 * @param      {string}                           classPrefix    (optional) Prefix for widget
 *                                                               block class (default none).
 * @return     {(Object)}                         Rating Object
 * 
 * Rating.currentRating()                         getter
 * Rating.currentRating(value)                    setter
 */
function Rating(container, prefix, currentRating, classPrefix) {
    var _maxRating = 5,
        _minRating = 0;

    currentRating = currentRating || 0;
    classPrefix = classPrefix || "";

    if (currentRating > _maxRating || currentRating < _minRating) {
        throw Error("Rating widget: currentRating is too low or too high.");
    }

    function createElement() {
        var element = document.createElement("span");
        element.className = classPrefix + "rating";
        var template = '\
                <input id="#prefix#__rating__input_5" type="radio" value="5" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_5" class="rating__label"></label> \
                <input id="#prefix#__rating__input_4" type="radio" value="4" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_4" class="rating__label"></label> \
                <input id="#prefix#__rating__input_3" type="radio" value="3" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_3" class="rating__label"></label> \
                <input id="#prefix#__rating__input_2" type="radio" value="2" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_2" class="rating__label"></label> \
                <input id="#prefix#__rating__input_1" type="radio" value="1" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_1" class="rating__label"></label>';
        element.innerHTML = template.replace(/#prefix#/g, prefix);

        return element;
    }

    function resetDOM() {
        var checkedInput = _element.querySelectorAll("input:checked");
        if (checkedInput) {
            Array.prototype.forEach.call(checkedInput, function(input) {
                input.removeAttribute("checked");
            });
        }
    }

    function updateDOM() {
        resetDOM();
        var inputToBeChecked =
            _element.querySelector("input[value='" + _currentRating + "']");
        if (inputToBeChecked) {
            inputToBeChecked.setAttribute("checked", "checked");
        }
    }

    var _container = container,
        _currentRating = currentRating,
        _element = createElement();

    _element = _container.appendChild(_element);

    var rating = {
        currentRating: _currentRating
    };

    rating.currentRating = function(value) {
        if (!arguments.length) return _currentRating;

        if (value > _maxRating || value < _minRating) {
            throw Error("Rating widget: currentRating is too low or too high.");
        }
        _currentRating = value;

        updateDOM();

        return rating;
    };

    updateDOM();
    return rating;
}