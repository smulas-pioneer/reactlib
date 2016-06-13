import * as React from 'react';
export interface EditableH1Props {
    title: string;
    action: (value: string) => void;
    size?: 'large' | 'medium' | 'small';
    placeholder?: string;
    isNew: boolean;
}
export interface EditableH1State {
    title: string;
    isEditing: boolean;
    warning: boolean;
}
export declare class EditableH1 extends React.Component<EditableH1Props, EditableH1State> {
    private _editor;
    constructor(props: EditableH1Props);
    componentWillReceiveProps(nextProps: EditableH1Props): void;
    private edit;
    private commit;
    private keydown;
    render(): JSX.Element;
}
