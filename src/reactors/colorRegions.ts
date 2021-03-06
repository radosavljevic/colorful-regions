import { Region } from "..";
import * as vscode from 'vscode';


const colorRegions = (
    activeTextEditor: vscode.TextEditor,
    decorationTypes: vscode.TextEditorDecorationType[],
    regions: Region[]
) => {
    if (!decorationTypes || (regions.length !== decorationTypes.length)) {
        return;
    }
    regions.forEach((region,i) => {
        const range = [new vscode.Range(region.start, region.end)];
        activeTextEditor.setDecorations(decorationTypes[i], range);
    });
};

export default colorRegions;