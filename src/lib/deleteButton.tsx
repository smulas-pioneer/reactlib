import * as React from 'react';
import * as ReactDom from 'react-dom';
import BS = require('react-bootstrap');

export interface DeleteButtonProps {
    action:()=>void,
    style?:React.CSSProperties,
    size?:'large'|'medium'|'small',
    title?:string
}

export interface DeleteButtonState {
    isConfirming:boolean;
}

export class DeleteButton extends React.Component<DeleteButtonProps,DeleteButtonState>{
    private _editor;
    
    constructor(props:DeleteButtonProps) {
        super(props);
        this.state = {
            isConfirming:false
        }
    }
    
    onDelete = (event:React.UIEvent)=>{
        event.stopPropagation();
        this.setState({isConfirming:true});    
    }
    
    onConfirmDelete = (event:React.UIEvent)=>{
        event.stopPropagation();
        this.setState({isConfirming:false}, 
                 ()=>{this.props.action();}
            );    
    }
    
    onCancel = (event:React.UIEvent)=>{
        event.stopPropagation();
        this.setState({isConfirming:false});    
    }
    
    
    render (){
        return (<div style={this.props.style}>
                    <BS.Button onClick={this.onDelete} bsStyle='danger'>{this.props.title||"Delete"}</BS.Button>
                    {!this.state.isConfirming ? <span/> :
                            <div className="static-modal">
                                <BS.Modal.Dialog>
                                <BS.Modal.Header>
                                    <BS.Modal.Title>Delete Confirmation!</BS.Modal.Title>
                                </BS.Modal.Header>

                                <BS.Modal.Body >
                                    <p style={{fontSize:'medium'}}>Do you confirm?</p>
                                </BS.Modal.Body>

                                <BS.Modal.Footer>
                                    <BS.Button onClick={this.onCancel} bsStyle='default'>Cancel</BS.Button>
                                    <BS.Button onClick={this.onConfirmDelete} b bsStyle='danger'>Confirm Delete</BS.Button>
                                </BS.Modal.Footer>

                                </BS.Modal.Dialog>
                            </div>
                    }
                </div>);
    }
}