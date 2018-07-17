import * as vscode from 'vscode';
import { Model } from '.';

const init = (context:vscode.ExtensionContext, model: Model) => {
    model.present({extensionContext: context});
};

export {
    init
};