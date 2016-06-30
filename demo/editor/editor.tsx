import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RichTextEditor,EditorState} from '../../src/index';



export interface DemoProps {
    value:string;
}

export interface DemoState {
    state: EditorState;
}

export class Demo extends React.Component<DemoProps, DemoState>{

    constructor(props: DemoProps) {
        super(props);
        this.state = {state: RichTextEditor.editorStateFromHTML(props.value)}
    }

    onChange = (value) =>{
       
        this.setState({
            state: value
        });
    }

    render(){
        let editor = this.refs['editor'] as RichTextEditor;
        let html = editor ? editor.getHtml() : '';

        return(
         <div>
                <h2>RichTextEditor demo</h2>
                <RichTextEditor ref='editor' editorState={this.state.state} onChange={this.onChange}/>
                <hr/>
                <pre style={{whiteSpace:"normal"}}>{html}</pre> 
             </div>
        )
    }
}


export const page = <Demo value='<h1>hello</h1>'/>