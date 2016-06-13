import * as React from 'react';
export interface AjaxPickerProps<T> {
    onSearch: (term: string, cb: (data: T[]) => void) => void;
    itemDisplay: (item: T) => string;
    onSelected: (item: T) => void;
    itemDisplayInList?: (item: T) => JSX.Element | string;
    minChar?: number;
    onNewItem?: (item: string) => void;
    label?: string;
    labelClassName?: string;
    wrapperClassName?: string;
    value?: T;
    clearAfterSelect?: boolean;
    acceptNewElement?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
}
export interface AjaxPickerState<T> {
    text: string;
    value: T;
    items: T[];
    selectingIndex?: number;
}
export declare class AjaxPicker<T> extends React.Component<AjaxPickerProps<T>, AjaxPickerState<T>> {
    constructor(props: AjaxPickerProps<T>);
    componentWillReceiveProps(nextProps: AjaxPickerProps<T>): void;
    private onChangeText;
    componentDidUpdate(prevProps: any, prevState: any): void;
    private onSelectItem;
    private onNewItem;
    private onKey;
    render(): JSX.Element;
}
