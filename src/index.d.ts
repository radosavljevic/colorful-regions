import * as vscode from 'vscode'

export type PresentData = {
    [key: string]: any
};
export type Present = (this: Model, data: PresentData) => void

interface EnquedAction {
    run: (...args: any[]) => void;
    args?: any[];
}

export interface Model {
    extensionContext: vscode.ExtensionContext;
    activeTextEditor: vscode.TextEditor;
    regions: Region[];
    decorationTypes: vscode.TextEditorDecorationType[];
    enquedActions: EnquedAction[];
    present: Present
}

export interface State {
    render: (model: Model) => void;
    nextState: (model: Model) => void;
    ready: (model: Model) => boolean;

}

export interface Comment extends vscode.Position {
    color?: string;
    title?: string;
}

export interface Region {
    start: vscode.Position;
    end: vscode.Position;
    color: string;
    title: string;
}

// TODO: add possible data types for the present function