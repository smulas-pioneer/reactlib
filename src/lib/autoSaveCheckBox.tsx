import * as React from 'react';
import * as ReactDom from 'react-dom';
import BS = require('react-bootstrap');

export interface AutoSaveCheckBoxProps {
    defaultValue?: boolean
    onChange: (value: boolean) => void,
    labels?:[string,string],
    style?:React.CSSProperties
}

export class AutoSaveCheckBox extends React.Component<AutoSaveCheckBoxProps, { value: boolean }> {

    constructor(props: AutoSaveCheckBoxProps) {
        super(props);
        this.state = { value: props.defaultValue || false };
    }

    private changed = (elm:boolean) => {
        if (elm!= this.state.value) {
            this.setState({value:elm},()=>{
                this.props.onChange(elm);
            });
        }
    }

    render() {
        const labels = this.props.labels || ['Yes','No']
        const val = this.state.value;
        return (
            <BS.ButtonGroup style={this.props.style||{}}>
                <BS.Button bsStyle={val?'primary':'default'} onClick={(e)=>{e.stopPropagation();this.changed(true)}}>{labels[0]}</BS.Button>
                <BS.Button bsStyle={!val?'primary':'default'} onClick={(e)=>{e.stopPropagation();this.changed(false)}}>{labels[1]}</BS.Button>
            </BS.ButtonGroup>
        )
    }
}



