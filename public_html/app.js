var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
# Basic React component to load JSON from the specified endpoint
# and return each item as a card in an unordered list
#
# Constructor: Load the data and call setState to update the data value and re-render the component
# Render: Log the data and return the li elements from the array map with values
# DOM Render: Wrap the returned li elements in a ul into the #app element
#
# Improve: Abstract the card to a separate component and pass the item as a prop to the card
#
# @author Andy Gargan
*/
var Cards = function (_React$Component) {
    _inherits(Cards, _React$Component);

    function Cards(props) {
        _classCallCheck(this, Cards);

        var _this = _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).call(this, props));

        var dataSrc = 'http://prototype.carter-dev.net/fed-test/items.json';

        _this.state = { data: [] };
        fetch(dataSrc).then(function (response) {
            return response.json();
        }).then(function (data) {
            return _this.setState({ data: data.items });
        });
        return _this;
    }

    _createClass(Cards, [{
        key: 'render',
        value: function render() {
            console.log(this.state.data);
            return this.state.data.map(function (item) {
                return React.createElement(
                    'li',
                    { key: item.id, 'data-category': item.category, className: "card" + (item.featured == 'true' ? ' featured' : '') },
                    React.createElement('a', { title: item.link, href: item.link }),
                    React.createElement(
                        'h2',
                        null,
                        item.title
                    ),
                    typeof item.description != 'undefined' ? React.createElement(
                        'p',
                        null,
                        item.description
                    ) : '',
                    typeof item.documentSize != 'undefined' ? React.createElement(
                        'div',
                        { className: 'card-document' },
                        'PDF ',
                        item.documentSize
                    ) : '',
                    typeof item.documentSize != 'undefined' ? React.createElement('img', { className: 'card-cta', src: 'assets/svg/arrow-down.svg' }) : React.createElement('img', { className: 'card-cta', src: 'assets/svg/arrow-right.svg' })
                );
            });
        }
    }]);

    return Cards;
}(React.Component);

ReactDOM.render(React.createElement(
    'div',
    { className: 'o_cards' },
    React.createElement(
        'ul',
        null,
        React.createElement(Cards, null)
    )
), document.getElementById('app'));