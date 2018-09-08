'use strict';
import * as vscode from 'vscode';
import { Model, Settings } from '.';
import present from './present';
import { init, updateActiveTextEditor, updateTextDocument, updateRegions } from './actions';

const model: Model = {
    extensionContext: null,
    activeTextEditor: null,
    decorationTypes: null,
    regions: null,
    enquedActions: [],
    settings: {
        assignPredefinedColors: false,
        defaultColor: 'rgba(0, 0, 0, 0)',
        hue: 0,
        transparencyAmount: 0.3
    },
    present
};

export function activate(context: vscode.ExtensionContext) {
    const settings = <Settings>vscode.workspace.getConfiguration().get('colorfulRegions');
    init(context, settings ,model);
}

// this method is called when your extension is deactivated
export function deactivate() {
}



vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvt => {
    const activeTextEditor = model.activeTextEditor;
    updateRegions(activeTextEditor, textDocumentChangeEvt, model.settings, model);
});

vscode.window.onDidChangeActiveTextEditor(textEditor => {
    updateActiveTextEditor(textEditor, model);
});

vscode.workspace.onDidOpenTextDocument(textDocument => {
    updateTextDocument(textDocument, model);
});

// workspace.getConfiguration('todohighlight')
