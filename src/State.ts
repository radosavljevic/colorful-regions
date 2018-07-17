import { State } from '.';
import * as vscode from 'vscode';

const state: State = {
    render(model) {
        // debugger;
        if (
            !model.activeTextEditor &&
            model.extensionContext &&
            model.extensionContext.subscriptions.length === 0
        ) {
            let disposable = vscode.commands.registerCommand('extension.sayHello', () => {                
        
                // Display a message box to the user
                vscode.window.showInformationMessage('Hello World123!');                
            });

            model.extensionContext.subscriptions.push(disposable);
        }
        
        state.nextState(model);
    },
    nextState(model) {
        // debugger;
    }
};

export default state;