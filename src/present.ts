import { Model, PresentData } from ".";
import state from './State';
import * as vscode from 'vscode';

// export default function present(model: Model, data: any[]) {
//     if ()    
// }

// Here you accept what will go into model

export default function present(this: Model, data: PresentData) : void {
    let regionsHash;
    if (this.regions !== null && data.regions) {
        regionsHash = this.regions
            .map(region => region.title)
            .toString();
        console.log('REGION HASH', regionsHash);
        debugger;
    }
    
    if(data.extensionContext) {
        this.extensionContext = data.extensionContext;        
    }

    if(data.regions || data.region === []) {
        this.regions = data.regions;
    }

    if(data.decorationTypes || data.decorationTypes === []) {
        this.decorationTypes = data.decorationTypes;
    }
    
    console.log('DATA', Object.keys(data).toString());
    // debugger;

    state.render(this);
}