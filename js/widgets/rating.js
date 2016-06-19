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
function Rating(container, prefix, classPrefix) {
    var _maxRating = 5,
        _minRating = 0,
        currentRating = 0;

    prefix = prefix || "";
    classPrefix = classPrefix || "";

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

    rating.init = function() {
        if(!container) {
            throw Error("Rating widget: Wrong container.");
        }

        _element = container.appendChild(_element);
        updateDOM();
        return rating;
    };

    return rating;
}