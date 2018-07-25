import * as vscode from 'vscode';
import { Model } from '.';

const init = (context:vscode.ExtensionContext, model: Model) => {    
    model.present({extensionContext: context});
};

const update = (evt: vscode.TextEditorSelectionChangeEvent, model: Model) => {    
    model.present({});
};

export {
    init,
    update
};