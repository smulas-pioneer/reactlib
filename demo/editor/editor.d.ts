import * as React from 'react';
import { EditorState } from '../../src/index';
export interface DemoProps {
    value: string;
}
export interface DemoState {
    state: EditorState;
}
export declare class Demo extends React.Component<DemoProps, DemoState> {
    constructor(props: DemoProps);
    onChange: (value: any) => void;
    render(): JSX.Element;
}
export declare const page: JSX.Element;
