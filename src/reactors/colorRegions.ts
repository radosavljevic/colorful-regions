import { Region } from "..";
import * as vscode from 'vscode';


const colorRegions = (
    activeTextEditor: vscode.TextEditor,
    regions: Region[]
) => {
    regions.forEach(region => {
        // debugger;
        const range = [new vscode.Range(region.start, region.end)];
        const overviewRulerColor = region.color;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        activeTextEditor.setDecorations(decorationType, range);
    });
};

export default colorRegions;