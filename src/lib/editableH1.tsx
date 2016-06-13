import * as React from 'react';
import * as ReactDom from 'react-dom';
import BS = require('react-bootstrap');

export interface EditableH1Props {
    title:string,
    action:(value:string)=>void,
    size?:'large'|'medium'|'small',
    placeholder?:string,
    isNew:boolean;
}

export interface EditableH1State {
    title:string,
    isEditing:boolean,
    warning:boolean
}

export class EditableH1 extends React.Component<EditableH1Props,EditableH1State>{
    private _editor;
    
    constructor(props:EditableH1Props) {
        super(props);

        if ( props.isNew) {
            this.state = {
                title:'',
                isEditing:true,
                warning:false
            }
        } else {
            this.state = {
                title:props.title,
                isEditing:false,
                warning:false
            }
        }
    }

    componentWillReceiveProps (nextProps:EditableH1Props) {
        this.state = {
            title:nextProps.title,
            isEditing:this.state.isEditing,
            warning:false
        }
    }

    private edit = (elm) =>{
        this.setState({
            isEditing:true,
            title:this.state.title,
            warning:false
        }, ()=>{
            let node = ReactDom.findDOMNode(this._editor);
            node['focus']();
       })
    }
    
    private commit = (elm) =>{
        const newValue = elm.target.value;
        if ( newValue =="") {
            this.setState({isEditing:true, title:this.state.title, warning:true})
        } else if ( newValue == this.props.title) {
            this.setState({isEditing:false, title:this.props.title, warning:false})
        }
        else {
            this.setState({
                isEditing:false,
                warning:false,
                title:elm.target.value
            }, ()=>{
                this.props.action(this.state.title);
            });
        }
    }

    private keydown = (elm) =>{
        if ( elm.keyCode == 13) {
            this.commit(elm);
        }
    }
    
    render (){
        if (!this.state.isEditing) {
            return (<h1 onClick={this.edit} style = {style}>{this.state.title}
                    {this.props.children}
                    </h1>);
        } else {
            return (
                <BS.FormGroup bsSize={this.props.size||'large'}>
                    <BS.FormControl ref={(c)=>{return this._editor = c}}
                                    type="text" 
                                    autoFocus
                                    onBlur = {this.commit}
                                    onKeyDown = {this.keydown}
                                    defaultValue = {this.state.title}
                                    placeholder={this.props.placeholder || 'enter text'}/>
                </BS.FormGroup>
            )
        }
    }
}


const style = {
    color:'#337ab7',
    cursor: 'pointer'
}