'use strict';
import * as vscode from 'vscode';
import { Model } from '.';
import present from './present';
import { init, update } from './actions';

const model: Model = {
    extensionContext: null,
    activeTextEditor: null,
    colors: [],
    decorationTypes: [],
    regions: [],
    present
};

export function activate(context: vscode.ExtensionContext) {    
    init(context, model);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

vscode.workspace.onDidChangeTextDocument(evt => {
    update(null, model);
});
