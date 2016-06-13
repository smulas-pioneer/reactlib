"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var BS = require('react-bootstrap');
var DeleteButton = (function (_super) {
    __extends(DeleteButton, _super);
    function DeleteButton(props) {
        var _this = this;
        _super.call(this, props);
        this.onDelete = function (event) {
            event.stopPropagation();
            _this.setState({ isConfirming: true });
        };
        this.onConfirmDelete = function (event) {
            event.stopPropagation();
            _this.setState({ isConfirming: false }, function () { _this.props.action(); });
        };
        this.onCancel = function (event) {
            event.stopPropagation();
            _this.setState({ isConfirming: false });
        };
        this.state = {
            isConfirming: false
        };
    }
    DeleteButton.prototype.render = function () {
        return (React.createElement("div", {style: this.props.style}, React.createElement(BS.Button, {onClick: this.onDelete, bsStyle: 'danger'}, this.props.title || "Delete"), !this.state.isConfirming ? React.createElement("span", null) :
            React.createElement("div", {className: "static-modal"}, React.createElement(BS.Modal.Dialog, null, React.createElement(BS.Modal.Header, null, React.createElement(BS.Modal.Title, null, "Delete Confirmation")), React.createElement(BS.Modal.Body, null, React.createElement("p", {style: { fontSize: 'medium' }}, "Do you confirm?")), React.createElement(BS.Modal.Footer, null, React.createElement(BS.Button, {onClick: this.onCancel, bsStyle: 'default'}, "Cancel"), React.createElement(BS.Button, {onClick: this.onConfirmDelete, b: true, bsStyle: 'danger'}, "Confirm Delete"))))));
    };
    return DeleteButton;
}(React.Component));
exports.DeleteButton = DeleteButton;
//# sourceMappingURL=deleteButton.js.map