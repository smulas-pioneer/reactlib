"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var reactlib_1 = require('reactlib');
var list = [
    { id: 1, description: 'Elvis Presley' },
    { id: 2, description: 'John Lennon' },
    { id: 3, description: 'Marvin Gaye' },
    { id: 4, description: 'Eric Clapton' },
    { id: 5, description: 'Jim Morrison' },
    { id: 6, description: 'Bo Diddley' }
];
//Create Custom Picker
var SingerPicker = (function (_super) {
    __extends(SingerPicker, _super);
    function SingerPicker() {
        _super.apply(this, arguments);
    }
    return SingerPicker;
}(reactlib_1.AjaxPicker));
var picker1 = React.createElement(SingerPicker, {itemDisplay: function (r) { return r.description; }, onSearch: function (term, cb) { return cb(list.filter(function (p) { return p.description.toLowerCase().indexOf(term.toLowerCase()) > -1; })); }, onSelected: function (elm) { alert('selected ' + elm.description); }, minChar: 1});
exports.page = React.createElement("div", null, React.createElement("h2", null, "AjaxPicker demo"), picker1);
//# sourceMappingURL=ajaxPicker.js.map