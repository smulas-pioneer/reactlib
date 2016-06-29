
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as bootstrap from 'bootstrap'; // just to link the js
import * as BS from 'react-bootstrap';

import * as ap from './ajaxPicker/ajaxPicker';
import * as ed from './editor/editor';


const main = <div>
                <h1>Reactlib demo</h1>
                <ul>
                    <li><a onClick={()=>render(ap.page)}>AjaxPicker demo</a></li>
                    <li><a onClick={()=>render(ed.page)}>Editor demo</a></li>
                </ul>
                <hr/>
                <div id='content'/>
             </div>

const render = (elm) =>{
    ReactDOM.render(elm,document.getElementById('content'));
}

ReactDOM.render(main,document.getElementById('main'));
