'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "colorful-regions" is now active!');
    const activeTextEditor = vscode.window.activeTextEditor;
    console.log('ACTIVETEXTEDITOR', activeTextEditor);


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');




    });

    // const configuration = vscode.workspace.getConfiguration('todohighlight');



    if (activeTextEditor) {
        const decorationType = vscode.window.createTextEditorDecorationType({overviewRulerColor: '#9ACD32'});
        const startPos = activeTextEditor.document.positionAt(0);
        const endPos = activeTextEditor.document.positionAt(100);
        let range = [];
        range.push(new vscode.Range(startPos, endPos));
        activeTextEditor.setDecorations(decorationType, range);
        debugger;
    }


    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}