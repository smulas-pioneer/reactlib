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
        return(
         <div>
                <h2>RichTextEditor demo</h2>
                <RichTextEditor editorState={this.state.state} onChange={this.onChange}/>
                <hr/>
                <pre>{RichTextEditor.htmlFromEditorState(this.state.state)}</pre> 
             </div>
        )
    }
}


export const page = <Demo value='<h1>hello</h1>'/>