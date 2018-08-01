import * as vscode from 'vscode';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
import { isHexColor } from './util/helpers';
import { Model, Comment, Region } from '.';

const parse = babel.parse;
const scheme = new ColorScheme;

export const init = (context:vscode.ExtensionContext, model: Model) => {
    model.present({extensionContext: context});
};

// Anemic action
export const update = (evt: vscode.TextDocumentChangeEvent, model: Model) => {
    console.log('ACTION UPDATE');
    debugger;
    model.present({});
};

export const updateRegions = (activeTextEditor: vscode.TextEditor ,model: Model) => {
    console.log('ACTION UPDATEREGION');

    // Find regions
    const AST = parse(activeTextEditor.document.getText());
    const comments: any[] = AST.comments;

    // Present empty array if no comments are found
    if (comments.length === 0 || !comments) {
        model.present({ regions: [] });
    }

    const colors = scheme
        .from_hue(21)
        .scheme('tetrade')
        .variation('pastel');

    const regionsStart = comments
        .filter(comment => comment.value.indexOf('#region') !== -1)
        .map((comment, i) => {
            const commentTitle = comment.value;
            let commentTitleWords: any[] = commentTitle.split(' ');
            let commentColor = commentTitleWords
                .slice(1, commentTitleWords.length)
                .filter(word => isHexColor(word));

            // Detect if there's a color in the title,
            // otherwise default
            let colorObject;
            if (commentColor.length) {
                colorObject = Color(commentColor[0]);
            } else {
                colorObject = Color(`#${colors.colors()[i]}`);
            }

            const _comment: Comment = activeTextEditor.document.positionAt(comment.start);


            if (colorObject.color.length > 0) {
                _comment.color = colorObject.hex();
            }

            // Add title
            _comment.title = commentTitle;

            return _comment;
        });

    const regionsEnd = comments
        .filter(comment => comment.value.indexOf('#endregion') !== -1)
        .map(comment => activeTextEditor.document.positionAt(comment.start - 1));

    const regions: Region[] = regionsStart
        .filter((startRegion, i) => regionsEnd[i])
        .map((startRegion, i) => {
            return {
                start: startRegion,
                end: regionsEnd[i],
                color: startRegion.color,
                title: startRegion.title
            };
        });

    model.present({ regions });
};

export const updateDecorationTypes = (
    regions: Region[],
    model: Model
) => {
    console.log('ACTION UPDATEDECORATIONTYPES');

    // debugger;

    const decorationTypes = regions.map(region => {
        const overviewRulerColor = region.color;
        // console.log('REGION COLOR', overviewRulerColor);
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        return decorationType;
    });

    // decorationTypes.map(decorationType => decorationType.dispose());

    // decorationTypes.map(decorationType => decorationType.dispose());
    model.present({ decorationTypes, regions });
};

export const clearDecorations = (decorationTypes: vscode.TextEditorDecorationType[] ,model: Model) => {
    console.log('CLEAR DECORATIONS');
    // debugger;
    if (decorationTypes === null) {
        return model.present({ clearDecorations: [] });
    }

    decorationTypes.map(d => d.dispose());
    model.present({ clearDecorations: [] });
};