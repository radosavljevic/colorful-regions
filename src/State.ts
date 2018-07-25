import { State } from '.';
import colorRegions from './reactors/colorRegions';

const state: State = {
    render(model) {        
        // debugger;
        if (
            !model.activeTextEditor &&
            model.extensionContext &&
            model.extensionContext.subscriptions.length === 0
        ) { 
            colorRegions(model);
        }
        
        state.nextState(model);
    },
    nextState(model) {
        // debugger;
    }
};

export default state;