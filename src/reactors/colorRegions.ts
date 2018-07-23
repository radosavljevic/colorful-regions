import { Model } from "..";
import * as vscode from 'vscode';
// import {} from 'vscode/src/editor/contrib/folding/indentRangeProvider';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
// import { computeRanges } from 'vs/editor/contrib/folding/indentRangeProvider';

const parse = babel.parse;
const scheme = new ColorScheme;

const colorRegions = (model: Model) => {
    
    const activeTextEditor = vscode.window.activeTextEditor;

    const decorationType = vscode.window.createTextEditorDecorationType({overviewRulerColor: 'rgba(154, 205, 50, .39)'});
    // const startPos = activeTextEditor.document.positionAt(0);
    // const endPos = activeTextEditor.document.positionAt(100);
    let range = [];
    // range.push(new vscode.Range(startPos, endPos));

    // Find regions
    const AST = parse(activeTextEditor.document.getText());
    const comments: any[] = AST.comments;

    const regionsStart = comments
        .filter(comment => comment.value.indexOf('#region') !== -1)
        .map(comment => activeTextEditor.document.positionAt(comment.start));
    
    const regionsEnd = comments
        .filter(comment => comment.value.indexOf('#endregion') !== -1)
        .map(comment => activeTextEditor.document.positionAt(comment.start - 1));

    // console.log('schecem', scheme);
    const colors = scheme
        .from_hue(21)
        .distance(0.05)
        .scheme('tetrade')        
        .variation('pastel');
    
    regionsStart.forEach((region, i) => {        
        const range = [new vscode.Range(regionsStart[i], regionsEnd[i])];
        const cl = Color(`#${colors.colors()[i]}`).color;
        const overviewRulerColor = `rgba(${cl[0]}, ${cl[1]}, ${cl[2]}, 0.39)`;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });
        activeTextEditor.setDecorations(decorationType, range);
    });
    
    
    // console.log('pera', colors);
    // activeTextEditor.setDecorations(decorationType, range);
};

export default colorRegions;