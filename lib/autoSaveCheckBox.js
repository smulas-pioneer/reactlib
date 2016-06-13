"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var BS = require('react-bootstrap');
var AutoSaveCheckBox = (function (_super) {
    __extends(AutoSaveCheckBox, _super);
    function AutoSaveCheckBox(props) {
        var _this = this;
        _super.call(this, props);
        this.changed = function (elm) {
            if (elm != _this.state.value) {
                _this.setState({ value: elm }, function () {
                    _this.props.onChange(elm);
                });
            }
        };
        this.state = { value: props.defaultValue || false };
    }
    AutoSaveCheckBox.prototype.render = function () {
        var _this = this;
        var labels = this.props.labels || ['Yes', 'No'];
        var val = this.state.value;
        return (React.createElement(BS.ButtonGroup, {style: this.props.style || {}}, React.createElement(BS.Button, {bsStyle: val ? 'primary' : 'default', onClick: function (e) { e.stopPropagation(); _this.changed(true); }}, labels[0]), React.createElement(BS.Button, {bsStyle: !val ? 'primary' : 'default', onClick: function (e) { e.stopPropagation(); _this.changed(false); }}, labels[1])));
    };
    return AutoSaveCheckBox;
}(React.Component));
exports.AutoSaveCheckBox = AutoSaveCheckBox;
//# sourceMappingURL=autoSaveCheckBox.js.map