import { Model, PositionWithColor } from "..";
import * as vscode from 'vscode';
// import {} from 'vscode/src/editor/contrib/folding/indentRangeProvider';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
import { isHexColor } from '../util/helpers';
// import { computeRanges } from 'vs/editor/contrib/folding/indentRangeProvider';

const parse = babel.parse;
const scheme = new ColorScheme;

const colorRegions = (model: Model) => {    
    const activeTextEditor = vscode.window.activeTextEditor;

    console.log('COLORREGIONS')

    // Find regions
    const AST = parse(activeTextEditor.document.getText());
    const comments: any[] = AST.comments;

    

    const regionsStart = comments
        .filter(comment => comment.value.indexOf('#region') !== -1)
        .map(comment => {
            let commentTitleWords: any[] = comment.value.split(' ');
            let commentColor = commentTitleWords
                .slice(1, commentTitleWords.length)
                .filter(word => isHexColor(word));

            const _comment: PositionWithColor = activeTextEditor.document.positionAt(comment.start);

            if (commentColor.length > 0) {
                _comment.color = commentColor[0];
            }            
            
            return _comment;
        });

    console.log('REGION START', regionsStart);
    
    const regionsEnd = comments
        .filter(comment => comment.value.indexOf('#endregion') !== -1)
        .map(comment => activeTextEditor.document.positionAt(comment.start - 1));
    
    const colors = scheme
        .from_hue(21)        
        .scheme('tetrade')        
        .variation('pastel');
    
    
    
    regionsStart.forEach((region, i) => {
        let color;
        
        // Assign color to region
        if (region.color) {
            color = Color(region.color);
        } else {
            color = Color(`#${colors.colors()[i]}`);            
        }

        const range = [new vscode.Range(regionsStart[i], regionsEnd[i])];        
        const overviewRulerColor = `rgba(${color.red()}, ${color.green()}, ${color.blue()}, 0.61)`;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        activeTextEditor.setDecorations(decorationType, range);
    });    
};

export default colorRegions;