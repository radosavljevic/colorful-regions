'use strict';
import * as vscode from 'vscode';
import { Model } from '.';
import present from './present';
import { init, updateRegions } from './actions';

const model: Model = {
    extensionContext: null,
    activeTextEditor: null,    
    decorationTypes: null,
    regions: null,
    enquedActions: [],
    present
};

export function activate(context: vscode.ExtensionContext) {    
    init(context, model);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

vscode.workspace.onDidChangeTextDocument(evt => {
    const activeTextEditor = vscode.window.activeTextEditor;
    updateRegions(activeTextEditor, model);
});
