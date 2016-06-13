"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var assign = require('object-assign');
var BS = require('react-bootstrap');
var AjaxPicker = (function (_super) {
    __extends(AjaxPicker, _super);
    function AjaxPicker(props) {
        var _this = this;
        _super.call(this, props);
        this.onChangeText = function (evt) {
            var text = evt.target.value;
            //Set State for loading
            _this.setState({
                text: text,
                value: null,
                items: _this.state.items
            }, function () {
                if (text.length >= (_this.props.minChar || 3)) {
                    _this.props.onSearch(text, function (data) {
                        //Set State for data
                        _this.setState({
                            text: _this.state.text,
                            value: null,
                            items: data,
                            selectingIndex: data.length > 0 ? 0 : null
                        });
                    });
                }
                else {
                    _this.setState({
                        text: text,
                        value: null,
                        items: []
                    });
                }
            });
        };
        this.onSelectItem = function (item) {
            _this.setState({
                text: _this.props.clearAfterSelect ? "" : _this.props.itemDisplay(item),
                value: _this.props.clearAfterSelect ? item : null,
                items: [],
                selectingIndex: null
            }, function () {
                _this.props.onSelected(item);
            });
        };
        this.onNewItem = function (item) {
            if (_this.props.onNewItem) {
                _this.setState({
                    text: _this.props.clearAfterSelect ? "" : item,
                    value: null,
                    items: [],
                    selectingIndex: null
                }, function () {
                    _this.props.onNewItem(item);
                });
            }
        };
        this.onKey = function (evt) {
            if (evt.type == 'keydown') {
                var ix = _this.props.acceptNewElement ? 1 : 0;
                if (evt.keyCode == 27) {
                    //ESC
                    var newState = assign({}, _this.state);
                    newState.text = "";
                    newState.value = null;
                    newState.items = [];
                    newState.selectingIndex = null;
                    _this.props.onSelected(null);
                    _this.setState(newState);
                }
                ;
                if (evt.keyCode == 13) {
                    evt.preventDefault();
                    if (_this.props.acceptNewElement) {
                        if ((_this.state.selectingIndex || 0) == 0) {
                            _this.onNewItem(_this.state.text);
                        }
                        else {
                            _this.onSelectItem(_this.state.items[_this.state.selectingIndex - ix]);
                        }
                    }
                    else {
                        if (_this.state.items.length > 0) {
                            _this.onSelectItem(_this.state.items[_this.state.selectingIndex || 0]);
                        }
                    }
                }
                else if (evt.keyCode == 40) {
                    //KEY DOWN
                    if (_this.state.items.length > 0) {
                        var defaultSelIndex = _this.state.selectingIndex || 0;
                        var newState = assign({}, _this.state);
                        newState.selectingIndex = Math.min(defaultSelIndex + 1, (_this.state.items.length - 1 + ix));
                        _this.setState(newState);
                    }
                }
                else if (evt.keyCode == 38) {
                    //KEY UP
                    if (_this.state.items.length > 0) {
                        var defaultSelIndex = _this.state.selectingIndex || 0;
                        var newState = assign({}, _this.state);
                        newState.selectingIndex = Math.max(defaultSelIndex - 1, 0);
                        _this.setState(newState);
                    }
                }
            }
        };
        this.state = {
            text: props.value ? props.itemDisplay(props.value) : "",
            value: props.value,
            items: []
        };
    }
    AjaxPicker.prototype.componentWillReceiveProps = function (nextProps) {
        this.state = {
            text: nextProps.value ? nextProps.itemDisplay(nextProps.value) : "",
            value: nextProps.value,
            items: []
        };
    };
    AjaxPicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        //ReactDOM.findDOMNode((this.refs[this.props.ref||"input"]))["focus"]();
    };
    AjaxPicker.prototype.render = function () {
        var _this = this;
        var displayInList = this.props.itemDisplayInList || this.props.itemDisplay;
        var items = [];
        var ix = 0;
        if (this.props.acceptNewElement) {
            ix = 1;
            items.push(React.createElement(BS.ListGroupItem, {key: "NewItem", onClick: function () { _this.onNewItem(_this.state.text); }}, this.state.selectingIndex == 0 ? React.createElement("b", null, this.state.text) : this.state.text));
        }
        items.push(this.state.items.map(function (v, i) {
            var text = (i + ix) == _this.state.selectingIndex ? React.createElement("b", null, displayInList(v)) : displayInList(v);
            return React.createElement(BS.ListGroupItem, {onClick: function () { _this.onSelectItem(v); }, key: i}, text);
        }));
        var popoverClass = this.state.items.length > 0 ? "" : "hidden";
        return (React.createElement("div", null, React.createElement(BS.OverlayTrigger, {trigger: "focus", placement: "bottom", overlay: React.createElement(BS.Popover, {id: 'pop', className: popoverClass}, React.createElement(BS.ListGroup, null, items))}, React.createElement(BS.FormControl, {autoComplete: 'off', autoFocus: true, label: this.props.label, labelClassName: this.props.labelClassName, wrapperClassName: this.props.wrapperClassName, type: "text", value: this.state.text, placeholder: this.props.placeholder || "Enter text", onChange: this.onChangeText, onKeyDown: this.onKey, style: this.props.style}))));
    };
    return AjaxPicker;
}(React.Component));
exports.AjaxPicker = AjaxPicker;
//# sourceMappingURL=ajaxPicker.js.map