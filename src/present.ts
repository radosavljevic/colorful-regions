import { Model, PresentData } from ".";
import state from './State';
import { updateDecorationTypes, disposeDecorationTypes } from "./actions";

/**
 * Proposes changes to the the model
 * which renders the new state
 * 
 * @param this Model to which the data is presented to
 * @param data Payload of information which is presented to the model
 */
export default function present(this: Model, data: PresentData) : void {
    
    if(data.extensionContext) {
        this.extensionContext = data.extensionContext;        
    }

    if(data.settings) {
        this.settings = data.settings;
    }

    if(data.regions || data.region === []) {
        this.regions = data.regions;
        this.enquedActions.push({
            run: disposeDecorationTypes,
            args: [this.decorationTypes, this]
        });
    }

    if(data.decorationTypes || data.decorationTypes === []) {
        this.decorationTypes = data.decorationTypes;
    }

    if(data.disposeDecorationTypes) {
        this.decorationTypes = [];
        this.enquedActions.push({
            run: updateDecorationTypes,
            args: [this.regions, this]
        });
    }

    if(data.decorationTypes) {
        this.decorationTypes = data.decorationTypes;
    }

    if(data.activeTextEditor) {
        this.activeTextEditor = data.activeTextEditor;
    }
    
    console.log('PRESENT DATA', Object.keys(data).toString());

    state.render(this);
}
