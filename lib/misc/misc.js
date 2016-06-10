"use strict";
var React = require('react');
var BS = require('react-bootstrap');
var colorForSwitch = function (value) { return ({ color: value ? 'green' : 'lightgray' }); };
exports.GlyphYesNo = function (props) {
    return React.createElement(BS.Glyphicon, {style: colorForSwitch(props.value), glyph: props.value ? 'ok-sign' : 'ban-circle'});
};
//# sourceMappingURL=misc.js.map