import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RichTextEditor} from '../../src/index';



export interface DemoProps {
    value:string;
}

export interface DemoState {
    value: string;
}

export class Demo extends React.Component<DemoProps, DemoState>{

    constructor(props: DemoProps) {
        super(props);
        this.state = {value:props.value}
    }

    onChange = (value: string) =>{
        this.setState({value:value});
    }

    render(){
        return(
         <div>
                <h2>RichTextEditor demo</h2>
                <RichTextEditor value={this.props.value} onChange={this.onChange}/>
                <hr/>
                <pre>{this.state.value}</pre> 
             </div>
        )
    }
}


export const page = <Demo value='<h1>hello</h1>'/>