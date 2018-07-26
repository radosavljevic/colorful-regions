import { Region } from "..";
import * as vscode from 'vscode';
// import {} from 'vscode/src/editor/contrib/folding/indentRangeProvider';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
import { isHexColor } from '../util/helpers';
// import { computeRanges } from 'vs/editor/contrib/folding/indentRangeProvider';

const parse = babel.parse;
const scheme = new ColorScheme;

const colorRegions = (
    activeTextEditor: vscode.TextEditor,
    regions: Region[]
) => {
    regions.forEach(region => {        
        const range = [new vscode.Range(region.start, region.end)];
        const overviewRulerColor = region.color;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        activeTextEditor.setDecorations(decorationType, range);
    });
};

export default colorRegions;