'use strict';
import * as vscode from 'vscode';
import { Model } from '.';
import present from './present';
import { init, updateActiveTextEditor, updateTextDocument, updateRegions } from './actions';

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

// vscode.workspace.onDidChangeTextDocument(evt => {
//     const activeTextEditor = vscode.window.activeTextEditor;
//     updateRegions(activeTextEditor, model);
// });

vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvt => {
    const activeTextEditor = model.activeTextEditor;
    updateRegions(activeTextEditor, textDocumentChangeEvt, model);
});

vscode.window.onDidChangeActiveTextEditor(textEditor => {
    updateActiveTextEditor(textEditor, model)
});

// onDidChangeTextEditorSelection => updateRegions
// vscode.workspace.onDid(evt => {
//     const activeTextEditor = vscode.window.activeTextEditor;
//     updateRegions(activeTextEditor,evt ,model);
// });

vscode
    .workspace
    .onDidOpenTextDocument(textDocument => updateTextDocument(textDocument, model));

