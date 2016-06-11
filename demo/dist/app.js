"use strict";
var ReactDOM = require('react-dom');
var React = require('react');
var ap = require('./ajaxPicker/ajaxPicker');
var main = React.createElement("div", null, React.createElement("h1", null, "Reactlib demo"), React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {onClick: function () { return render(ap.page); }}, "AjaxPicker demo"))), React.createElement("hr", null), React.createElement("div", {id: 'content'}));
var render = function (elm) {
    ReactDOM.render(elm, document.getElementById('content'));
};
ReactDOM.render(main, document.getElementById('main'));
//# sourceMappingURL=app.js.map