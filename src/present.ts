import { Model, PresentData } from ".";
import state from './State';
import { updateDecorationTypes } from "./actions";
import * as vscode from 'vscode';

/**
 * Proposes changes to the the model
 * which renders the new state
 * 
 * @param this Model to which the data is presented to
 * @param data Payload of information which is presented to the model
 */
export default function present(this: Model, data: PresentData) : void {
    
    if (this.regions !== null && data.regions) {
        let prevRegionsHash;
        let nextRegionHash;

        prevRegionsHash = this.regions
            .map(region => region.title)
            .toString();

        nextRegionHash = data.regions
            .map(region => region.title)
            .toString();

        // console.log('REGION HASH', prevRegionsHash, nextRegionHash);

        if (prevRegionsHash !== nextRegionHash) {
            console.log('NOW WE SHOULD UPDATE');
            const activeTextEditor = vscode.window.activeTextEditor;
            this.regions = data.regions;
            this.enquedActions.push({
                run: updateDecorationTypes,
                args: [data.regions, this]
            });
            this.regions = data.regions;
        }

        // debugger;#
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
    
    console.log('PRESENT DATA', Object.keys(data).toString());
    // debugger;

    state.render(this);
}