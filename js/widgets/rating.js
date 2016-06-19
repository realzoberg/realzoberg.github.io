/**
 * Rating widget.
 * Appends rating widget inside container.
 *
 * @param      HTML DOM Node Element object       container      Container for a widget.
 * @param      {string}                           prefix         Prefix for widget element ids.
 * @param      {(number)}                         currentRating  Initial rating in [0,5] (default 0).
 * @return     {(Object)}                         Rating Object
 * 
 * Rating.currentRating()                         getter
 * Rating.currentRating(value)                    setter
 */
function Rating(container, prefix, currentRating) {
    var _maxRating = 5,
        _minRating = 0;

    if (currentRating === undefined) {
        currentRating = 0;
    }

    if (currentRating > _maxRating || currentRating < _minRating) {
        throw Error("Rating widget: currentRating is too low or too high.");
    }

    function createElement() {
        var element = document.createElement('span');
        element.className = 'rating';
        var template = '<span class="rating"> \
                <input id="#prefix#__rating__input_5" type="radio" value="5" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_5" class="rating__label"></label> \
                <input id="#prefix#__rating__input_4" type="radio" value="4" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_4" class="rating__label"></label> \
                <input id="#prefix#__rating__input_3" type="radio" value="3" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_3" class="rating__label"></label> \
                <input id="#prefix#__rating__input_2" type="radio" value="2" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_2" class="rating__label"></label> \
                <input id="#prefix#__rating__input_1" type="radio" value="1" name="#prefix#-group"> \
                <label for="#prefix#__rating__input_1" class="rating__label"></label> \
            </span>';
        element.innerHTML = template.replace(/#prefix#/g, prefix)

        return element;
    }

    function resetDOM() {
        var checkedInput = _element.querySelectorAll("input:checked");
        if (checkedInput) {
            checkedInput.forEach(function(input) {
                input.removeAttribute("checked");
            });
        }
    }

    function updateDOM() {
        resetDOM();
        var inputToBeChecked =
            _element.querySelectorAll("input[value='" + _currentRating + "']");
        if (inputToBeChecked && inputToBeChecked[0]) {
            inputToBeChecked[0].setAttribute("checked", "checked");
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