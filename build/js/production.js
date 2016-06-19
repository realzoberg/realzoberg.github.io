/**
 * Виджет рейтинга.
 * Добавляет в контейнер container контрол выставления рейтинга от 0 до 5 баллов.
 *
 * @param      HTML DOM Node Element object       container      Контейнер для виджета
 * @param      {string}                           prefix         Префикс для id элементов виджета
 * @param      {(number)}                         currentRating  Начальный рейтинг (default 0)
 * @return     {(Object)}                         Объект Rating
 * 
 * Rating.currentRating()                         геттер для текущего рейтинга
 * Rating.currentRating(value)                    сеттер для текущего рейтинга
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