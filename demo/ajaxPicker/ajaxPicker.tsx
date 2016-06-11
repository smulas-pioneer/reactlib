import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AjaxPicker} from 'reactlib';

const list = [
    {id:1, description:'Elvis Presley'},
    {id:2, description:'John Lennon'},
    {id:3, description:'Marvin Gaye'},
    {id:4, description:'Eric Clapton'},
    {id:5, description:'Jim Morrison'},
    {id:6, description:'Bo Diddley'}
]

//Create Custom Picker
class SingerPicker extends AjaxPicker<{id:number,description:string}> {}

const picker1 = <SingerPicker 
                    itemDisplay = {(r)=>r.description}
                    onSearch = {
                        (term,cb) => cb(list.filter(p=>p.description.toLowerCase().indexOf(term.toLowerCase())> -1))
                    }
                    onSelected ={elm=>{alert('selected ' + elm.description)}}
                    minChar = {1}
                />


export const page = <div>
                <h2>AjaxPicker demo</h2>
                {picker1}
             </div>

