import * as React from 'react';
export interface AutoSaveCheckBoxProps {
    defaultValue?: boolean;
    onChange: (value: boolean) => void;
    labels?: [string, string];
    style?: React.CSSProperties;
}
export declare class AutoSaveCheckBox extends React.Component<AutoSaveCheckBoxProps, {
    value: boolean;
}> {
    constructor(props: AutoSaveCheckBoxProps);
    private changed;
    render(): JSX.Element;
}
