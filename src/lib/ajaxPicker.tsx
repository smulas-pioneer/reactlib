import * as React from 'react';
import * as ReactDOM from 'react-dom';
import assign = require('object-assign');
import BS = require('react-bootstrap');

export interface AjaxPickerProps<T> {
    onSearch: (term: string, cb: (data: T[]) => void) => void,
    itemDisplay: (item: T) => string;
    onSelected: (item: T) => void;
  
    itemDisplayInList?: (item: T) => JSX.Element | string;
    minChar?: number;
    onNewItem?: (item: string) => void;
    label?: string;
    labelClassName?: string;
    wrapperClassName?: string;
    value?: T;
    clearAfterSelect?: boolean;
    acceptNewElement?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
}

export interface AjaxPickerState<T> {
    text: string,
    value: T,
    items: T[],
    selectingIndex?: number
}

export class AjaxPicker<T> extends React.Component<AjaxPickerProps<T>, AjaxPickerState<T>> {

    constructor(props: AjaxPickerProps<T>) {
        super(props);
        this.state = {
            text: props.value ? props.itemDisplay(props.value) : "",
            value: props.value,
            items: []
        }

    }

    componentWillReceiveProps(nextProps: AjaxPickerProps<T>) {
        this.state = {
            text: nextProps.value ? nextProps.itemDisplay(nextProps.value) : "",
            value: nextProps.value,
            items: []
        }
    }

    private onChangeText = (evt) => {
        var text: string = evt.target.value;

        //Set State for loading
        this.setState({
            text: text,
            value: null,
            items: this.state.items
        }, () => {

            if (text.length >= (this.props.minChar || 3)) {
                this.props.onSearch(text, (data: T[]) => {
                    //Set State for data
                    this.setState({
                        text: this.state.text,
                        value: null,
                        items: data,
                        selectingIndex: data.length > 0 ? 0 : null
                    })
                });
            } else {
                this.setState({
                    text: text,
                    value: null,
                    items: []
                })
            }
        });
    };

    componentDidUpdate(prevProps, prevState) {
        //ReactDOM.findDOMNode((this.refs[this.props.ref||"input"]))["focus"]();
    }

    private onSelectItem = (item: T) => {
        this.setState({
            text: this.props.clearAfterSelect ? "" : this.props.itemDisplay(item),
            value: this.props.clearAfterSelect ? item : null,
            items: [],
            selectingIndex: null
        }, () => {
            this.props.onSelected(item);
        });
    }

    private onNewItem = (item: string) => {
        if (this.props.onNewItem) {
            this.setState({
                text: this.props.clearAfterSelect ? "" : item,
                value: null,
                items: [],
                selectingIndex: null
            }, () => {
                this.props.onNewItem(item);
            });
        }
    }

    private onKey = (evt: React.KeyboardEvent) => {
        if (evt.type == 'keydown') {
            var ix = this.props.acceptNewElement ? 1 : 0;
            if (evt.keyCode == 27) {
                //ESC
                let newState =  assign({},this.state);
                newState.text = "";
                newState.value = null;
                newState.items = [];
                newState.selectingIndex = null;
                this.props.onSelected(null);

                this.setState(newState);
            };

            if (evt.keyCode == 13) {
                evt.preventDefault();
                if (this.props.acceptNewElement) {
                    if ((this.state.selectingIndex || 0) == 0) {
                        this.onNewItem(this.state.text);
                    } else {
                        this.onSelectItem(this.state.items[this.state.selectingIndex - ix]);
                    }
                }
                else {
                    if (this.state.items.length > 0) {
                        this.onSelectItem(this.state.items[this.state.selectingIndex || 0]);
                    }
                }
            } else if (evt.keyCode == 40) {
                //KEY DOWN
                if (this.state.items.length > 0) {
                    let defaultSelIndex = this.state.selectingIndex || 0;
                    let newState = assign({}, this.state);
                    newState.selectingIndex = Math.min(defaultSelIndex + 1, (this.state.items.length - 1 + ix));
                    this.setState(newState);
                }

            } else if (evt.keyCode == 38) {
                //KEY UP
                if (this.state.items.length > 0) {
                    let defaultSelIndex = this.state.selectingIndex || 0;
                    let newState = assign({}, this.state);
                    newState.selectingIndex = Math.max(defaultSelIndex - 1, 0);
                    this.setState(newState);
                }
            }
        }
    }

    render() {
        let displayInList = this.props.itemDisplayInList || this.props.itemDisplay;

        let items = [];
        let ix = 0;
        if (this.props.acceptNewElement) {
            ix = 1;
            items.push(
                <BS.ListGroupItem key="NewItem" onClick={ () => { this.onNewItem(this.state.text) } }>
                    {this.state.selectingIndex == 0 ? <b>{this.state.text}</b> : this.state.text}
                </BS.ListGroupItem>
            );
        }

        items.push(
            this.state.items.map((v, i) => {
                let text = (i + ix) == this.state.selectingIndex ? <b>{displayInList(v) }</b> : displayInList(v)
                return <BS.ListGroupItem onClick={ () => { this.onSelectItem(v); } }
                    key={i}>
                    {text}
                </BS.ListGroupItem>
            }));

        var popoverClass = this.state.items.length > 0 ? "" : "hidden";

        return (
            <div>
                <BS.OverlayTrigger trigger="focus" placement="bottom" overlay={
                    <BS.Popover id='pop' className={popoverClass}>
                        <BS.ListGroup>
                            {items}
                        </BS.ListGroup>
                    </BS.Popover>
                }>
                    <BS.FormControl
                        autoComplete='off'
                        autoFocus
                        label={this.props.label}
                        labelClassName={this.props.labelClassName}
                        wrapperClassName={this.props.wrapperClassName}
                        type="text"
                        value={this.state.text}
                        placeholder= {this.props.placeholder || "Enter text"}
                        onChange={this.onChangeText}
                        onKeyDown={this.onKey}
                        style={this.props.style}/>
                </BS.OverlayTrigger>
            </div>
        )
    }
}
