import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as BS from 'react-bootstrap';

const colorForSwitch = (value:boolean)=> ({color: value?'green':'lightgray'});

export const GlyphYesNo = (props:{value:boolean}) =>{
    return <BS.Glyphicon style={colorForSwitch(props.value)} glyph={props.value ? 'ok-sign' :'ban-circle'} />
}
