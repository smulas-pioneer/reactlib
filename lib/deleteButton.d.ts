import * as React from 'react';
export interface DeleteButtonProps {
    action: () => void;
    style?: React.CSSProperties;
    size?: 'large' | 'medium' | 'small';
    title?: string;
}
export interface DeleteButtonState {
    isConfirming: boolean;
}
export declare class DeleteButton extends React.Component<DeleteButtonProps, DeleteButtonState> {
    private _editor;
    constructor(props: DeleteButtonProps);
    onDelete: (event: React.UIEvent) => void;
    onConfirmDelete: (event: React.UIEvent) => void;
    onCancel: (event: React.UIEvent) => void;
    render(): JSX.Element;
}
