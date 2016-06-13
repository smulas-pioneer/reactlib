"use strict";
var React = require('react');
var BS = require('react-bootstrap');
function AutoSaveControl(props) {
    var changed = function (elm) {
        if (elm.target.value != props.defaultValue) {
            props.onChange(elm.target.value);
        }
    };
    var keydown = function (elm) {
        if (elm.keyCode == 13) {
            elm.stopPropagation();
            elm.preventDefault();
            changed(elm);
        }
    };
    return (React.createElement(BS.FormControl, {type: props.type || 'text', placeholder: props.placeholder || 'Enter value', onKeyDown: keydown, onBlur: changed, defaultValue: props.defaultValue, style: props.style}));
}
exports.AutoSaveControl = AutoSaveControl;
//# sourceMappingURL=autoSaveControl.js.map