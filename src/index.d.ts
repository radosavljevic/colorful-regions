import * as vscode from 'vscode'

type PresentData = {
    [key: string]: any
};
type Present = (this: Model, data: PresentData) => void

interface Model {
    extensionContext: vscode.ExtensionContext;
    activeTextEditor: vscode.TextEditor;
    regions: Region[];
    decorationTypes: vscode.TextEditorDecorationType[];
    present: Present
}

interface State {
    render: (model: Model) => void;
    nextState: (model: Model) => void;
    ready: (model: Model) => boolean;

}

interface PositionWithColor extends vscode.Position {
    color?: string;
}

interface Region {
    start: vscode.Position;
    end: vscode.Position;
    color: string;
}