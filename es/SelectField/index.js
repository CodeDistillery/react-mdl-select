'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMdl = require('react-mdl');

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

require('./react-mdl-select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectField = function (_React$Component) {
    _inherits(SelectField, _React$Component);

    function SelectField(props) {
        _classCallCheck(this, SelectField);

        var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props));

        _this.search = (0, _debounce2.default)(_this.search, 100);
        _this.state = {
            items: props.items,
            foundResult: props.items,
            keyField: props.keyField,
            valueField: props.valueField,
            template: props.template,
            showList: false,
            value: _this.getValue(props.value, props.items) || ''
        };
        return _this;
    }

    _createClass(SelectField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                items: nextProps.items,
                foundResult: nextProps.items
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!(0, _isEqual2.default)(this.state.foundResult, prevState.foundResult)) {
                this.setState({
                    value: ''
                });
                this.props.onChange(null);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            e.persist();
            var value = e.target.value;
            this.setState({
                value: value
            });
            this.search(value);

            if (!value) {
                this.props.onChange(null);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue(key, items) {
            var _this2 = this;

            var result = void 0;

            items.forEach(function (item) {
                if (key === item[_this2.props.keyField]) {
                    result = item[_this2.props.valueField];
                }
            });

            return result;
        }
    }, {
        key: 'mouseSelect',
        value: function mouseSelect(item) {
            var valueField = this.state.valueField;
            var keyField = this.state.keyField;

            this.props.onChange(item[keyField]);

            this.setState({
                value: item[valueField]
            });

            if (this.state.template) {
                this.setState({
                    value: this.state.template(item)
                });
            }
        }
    }, {
        key: 'hideList',
        value: function hideList() {
            var _this3 = this;

            setTimeout(function () {
                _this3.setState({
                    showList: false
                });
            }, 300);
        }
    }, {
        key: 'showList',
        value: function showList() {
            this.setState({
                showList: true
            });
        }
    }, {
        key: 'search',
        value: function search(value) {
            var foundItems = this.filterItems(value);

            this.setState({
                foundResult: foundItems
            });
        }
    }, {
        key: 'filterItems',
        value: function filterItems(value) {
            var _this4 = this;

            var result = [];
            var pattern = new RegExp(value, 'i');

            this.state.items.forEach(function (item) {
                if (pattern.test(item[_this4.state.valueField])) {
                    result.push(item);
                }
            });

            return result;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                _reactMdl.Textfield,
                {
                    className: this.props.className,
                    readOnly: !this.props.autocomplete,
                    floatingLabel: this.props.floatingLabel,
                    label: this.props.label,
                    onFocus: this.showList.bind(this),
                    onBlur: this.hideList.bind(this),
                    value: this.state.value,
                    onChange: this.onChange.bind(this)
                },
                function () {
                    if (_this5.state.showList) {
                        return _react2.default.createElement(
                            _reactMdl.List,
                            { className: 'autocomplete-list' },
                            _this5.state.foundResult.map(function (item, index) {
                                return _react2.default.createElement(
                                    _reactMdl.ListItem,
                                    {
                                        key: index,
                                        onClick: _this5.mouseSelect.bind(_this5, item),
                                        className: 'autocomplete-list__found-item'
                                    },
                                    function () {
                                        if (!_this5.state.template) {
                                            return item[_this5.state.valueField];
                                        }
                                        return _this5.state.template(item);
                                    }()
                                );
                            })
                        );
                    }
                }()
            );
        }
    }]);

    return SelectField;
}(_react2.default.Component);

exports.default = SelectField;