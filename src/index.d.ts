import * as vscode from 'vscode'

type PresentData = {
    [key: string]: any
};
type Present = (this: Model, data: PresentData) => void

interface Model {
    extensionContext: vscode.ExtensionContext;
    activeTextEditor: vscode.TextEditor;
    present: Present
}

interface State {
    render: (model: Model) => void;
    nextState: (model: Model) => void;
}