import * as React from 'react';
export interface AutoSaveControlProps {
    type?: 'text' | 'number' | 'date' | 'check' | 'email';
    placeholder?: string;
    defaultValue?: string | number | boolean;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
}
export declare function AutoSaveControl(props: AutoSaveControlProps): JSX.Element;
