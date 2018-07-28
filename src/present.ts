import { Model, PresentData } from ".";
import state from './State';
import * as vscode from 'vscode';

// export default function present(model: Model, data: any[]) {
//     if ()    
// }

// Here you accept what will go into model

export default function present(this: Model, data: PresentData) : void {
    console.log('DATA', Object.keys(data).toString());
    
    if(data.extensionContext) {
        this.extensionContext = data.extensionContext;        
    }

    if(data.regions || data.region === []) {
        this.regions = data.regions;
    }

    if(data.decorationTypes || data.decorationTypes === []) {
        this.decorationTypes = data.decorationTypes;
    }

    debugger;

    console.log('DATA', Object.keys(data).toString());

    state.render(this);
}