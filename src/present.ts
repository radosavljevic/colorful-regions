import { Model, PresentData } from ".";
import state from './State';

/**
 * Proposes changes to the the model
 * which renders the new state
 * 
 * @param this Model to which the data is presented to
 * @param data Payload of information which is presented to the model
 */
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
    
    console.log('PRESENT DATA', Object.keys(data).toString());
    debugger;

    state.render(this);
}