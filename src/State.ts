import * as vscode from 'vscode';
import { State } from '.';
import colorRegions from './reactors/colorRegions';
import { updateDecorationTypes, updateRegions } from './actions';


const state: State = {
    ready(model) {
        if (model.extensionContext) {
            return true;
        }
    },
    render(model) {
        const ready = state.ready(model);
        if (ready && model.regions !== null) {            
            const activeTextEditor = vscode.window.activeTextEditor;
            colorRegions(activeTextEditor, model.regions);
        }

        state.nextState(model);
    },
    nextState(model) {
        // debugger;
        // Run update regions for the first time
        // const activeTextEditor = vscode.window.activeTextEditor;

        if (
            state.ready(model) &&
            model.regions === null

        ) {
            const activeTextEditor = vscode.window.activeTextEditor;
            updateRegions(activeTextEditor, model);
        }

        // Update decorations if something changes
        if (
            (
                model.regions !== null &&
                model.decorationTypes === null &&
                model.regions.length > 0
            ) ||
            (
                model.regions !== null &&
                model.decorationTypes !== null &&
                model.regions.length !== model.decorationTypes.length
            )
        ) {            
            updateDecorationTypes(
                model.regions,
                model
            );
        }

        // Run and dequeue enqued actions
        if (model.enquedActions.length > 0) {
            const action = model.enquedActions.shift();
            setTimeout(() => action.run(...action.args), 0);
        }

        // if (
        //     model.decorationTypes !== null &&
        //     model.decorationTypes.length > 0
        // ) {
        //     // debugger;
        //     model.decorationTypes.map(decorationType => decorationType.dispose());
        // }

        // run updateRegions when regions are changed
        if (state.ready(model)) {
            const activeTextEditor = vscode.window.activeTextEditor;

        }
    }
};



export default state;