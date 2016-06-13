import * as React from 'react';
import * as ReactDom from 'react-dom';
import BS = require('react-bootstrap');

export interface AutoSaveControlProps  {
    type?: 'text' |'number' | 'date' |'check' |'email'
    placeholder?:string,
    defaultValue?:string | number | boolean
    onChange:(value: string) =>void,
    style?:React.CSSProperties
}

export function AutoSaveControl (props: AutoSaveControlProps) {

    const changed = (elm) =>{
        if (elm.target.value != props.defaultValue){
            props.onChange(elm.target.value);
        }
    }

    const keydown = (elm:React.KeyboardEvent) =>{
        if ( elm.keyCode == 13) {
            elm.stopPropagation();
            elm.preventDefault();
            changed(elm);
        }
    }

    return (
        <BS.FormControl 
            type = {props.type || 'text'} 
            placeholder= {props.placeholder || 'Enter value'} 
            onKeyDown = {keydown}
            onBlur = {changed}
            defaultValue={props.defaultValue}
            style= {props.style}
             />   
    );
}        
                         
                         
                         
