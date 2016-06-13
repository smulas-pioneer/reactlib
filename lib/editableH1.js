"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDom = require('react-dom');
var BS = require('react-bootstrap');
var EditableH1 = (function (_super) {
    __extends(EditableH1, _super);
    function EditableH1(props) {
        var _this = this;
        _super.call(this, props);
        this.edit = function (elm) {
            _this.setState({
                isEditing: true,
                title: _this.state.title,
                warning: false
            }, function () {
                var node = ReactDom.findDOMNode(_this._editor);
                node['focus']();
            });
        };
        this.commit = function (elm) {
            var newValue = elm.target.value;
            if (newValue == "") {
                _this.setState({ isEditing: true, title: _this.state.title, warning: true });
            }
            else if (newValue == _this.props.title) {
                _this.setState({ isEditing: false, title: _this.props.title, warning: false });
            }
            else {
                _this.setState({
                    isEditing: false,
                    warning: false,
                    title: elm.target.value
                }, function () {
                    _this.props.action(_this.state.title);
                });
            }
        };
        this.keydown = function (elm) {
            if (elm.keyCode == 13) {
                _this.commit(elm);
            }
        };
        if (props.isNew) {
            this.state = {
                title: '',
                isEditing: true,
                warning: false
            };
        }
        else {
            this.state = {
                title: props.title,
                isEditing: false,
                warning: false
            };
        }
    }
    EditableH1.prototype.componentWillReceiveProps = function (nextProps) {
        this.state = {
            title: nextProps.title,
            isEditing: this.state.isEditing,
            warning: false
        };
    };
    EditableH1.prototype.render = function () {
        var _this = this;
        if (!this.state.isEditing) {
            return (React.createElement("h1", {onClick: this.edit, style: style}, this.state.title, this.props.children));
        }
        else {
            return (React.createElement(BS.FormGroup, {bsSize: this.props.size || 'large'}, React.createElement(BS.FormControl, {ref: function (c) { return _this._editor = c; }, type: "text", autoFocus: true, onBlur: this.commit, onKeyDown: this.keydown, defaultValue: this.state.title, placeholder: this.props.placeholder || 'enter text'})));
        }
    };
    return EditableH1;
}(React.Component));
exports.EditableH1 = EditableH1;
var style = {
    color: '#337ab7',
    cursor: 'pointer'
};
//# sourceMappingURL=editableH1.js.map