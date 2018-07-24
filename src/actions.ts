import * as vscode from 'vscode';
import { Model } from '.';

const init = (context:vscode.ExtensionContext, model: Model) => {
    console.log('INIT');
    model.present({extensionContext: context});
};

const update = (evt: vscode.TextEditorSelectionChangeEvent, model: Model) => {
    console.log('UPDATE');
    model.present({});
};

export {
    init,
    update
};