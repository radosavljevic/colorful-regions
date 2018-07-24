'use strict';
import * as vscode from 'vscode';
import { Model } from '.';
import present from './present';
import { init, update } from './actions';

const model: Model = {
    extensionContext: null,
    activeTextEditor: null,
    present
};

export function activate(context: vscode.ExtensionContext) {
    console.log('ACTIVATE');
    init(context, model);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

vscode.window.onDidChangeTextEditorSelection(evt => {    
    update(evt, model);
});





