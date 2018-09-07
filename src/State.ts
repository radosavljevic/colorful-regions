import * as vscode from 'vscode';
import { State } from '.';
import colorRegions from './reactors/colorRegions';
import { updateActiveTextEditor } from './actions';


const state: State = {
    ready(model) {
        if (model.extensionContext && model.activeTextEditor) {
            return true;
        }
    },
    render(model) {
        const ready = state.ready(model);
        if (ready && model.regions !== null) {
            const activeTextEditor = model.activeTextEditor;
            colorRegions(activeTextEditor, model.decorationTypes, model.regions);
        }

        state.nextState(model);
    },
    nextState(model) {

        if (model.extensionContext && !model.activeTextEditor) {
            model.activeTextEditor = vscode.window.activeTextEditor;
            updateActiveTextEditor(vscode.window.activeTextEditor, model);
        }

        // Run enqued actions and get rid of them
        if (model.enquedActions.length > 0) {
            const action = model.enquedActions.pop();
            const args = action.args;
            try {
                action.run(...args);

            } catch (error) {
                debugger;
            }
            // action.run(args);
        }

        
    }
};



export default state;