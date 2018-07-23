import { Model } from "..";
import * as vscode from 'vscode';
// import {} from 'vscode/src/editor/contrib/folding/indentRangeProvider';
import * as babel from 'babel-eslint';
// import { computeRanges } from 'vs/editor/contrib/folding/indentRangeProvider';

const parse = babel.parse;

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
    
    regionsStart.forEach((region, i) => range.push(new vscode.Range(regionsStart[i], regionsEnd[i])));
    
    
    // console.log('pera', regionsStart, regionsEnd);
    activeTextEditor.setDecorations(decorationType, range);
};

export default colorRegions;