import * as vscode from 'vscode';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
import { isColor } from './util/helpers';
import { Model, Comment, Region, Settings } from '.';

// const settings = {
//     assignDefaultColors: false
// };

const parse = babel.parse;
const scheme = new ColorScheme;


export const init = (context:vscode.ExtensionContext, settings: Settings, model: Model) => {
    model.present({ extensionContext: context });
};

export const updateTextDocument = (textDocument: vscode.TextDocument, model: Model) => {
    model.present({ textDocument });
};

export const updateActiveTextEditor = (activeTextEditor: vscode.TextEditor, model: Model) => {
    model.present({ activeTextEditor });
};

// Anemic action
export const update = (evt: vscode.TextDocumentChangeEvent, model: Model) => {
    model.present({});
};

export const updateRegions = (activeTextEditor: vscode.TextEditor, settings: Settings, model: Model) => {

    // Find regions
    const AST = parse(activeTextEditor.document.getText());
    const comments: any[] = AST.comments;

    // Present empty array if no comments are found
    if (comments.length === 0 || !comments) {
        model.present({ regions: [] });
    }

    const colors = scheme
        .from_hue(0)
        .scheme('tetrade')
        .variation('light');

    const regionsStart = comments
        .filter(comment => comment.value.indexOf('#region') !== -1)
        .map((comment, i) => {
            const commentTitle = comment.value;
            let commentTitleWords: any[] = commentTitle.split(' ');
            let commentColor: string[] = commentTitleWords
                .slice(1, commentTitleWords.length)
                .filter(word => isColor(word));

            // Detect if there's a color in the title,
            // otherwise default
            let colorObject;
            if (commentColor.length) {
                colorObject = Color(commentColor[0].toLowerCase());
            } else if (settings.assignPredefinedColors) {
                colorObject = Color(`#${colors.colors()[i + 1]}`);
                // colorObject = Color(colors[i]);
            }

            const _comment: Comment = activeTextEditor.document.positionAt(comment.start);


            if (colorObject && colorObject.color.length > 0) {
                _comment.color = colorObject
                    .alpha(settings.transparencyAmount)
                    .rgb()
                    .toString();
            } else {
                _comment.color = settings.defaultColor;
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

export const updateDecorationTypes = (regions: Region[], model: Model) => {
    if (!regions) {
        return;
    }

    const decorationTypes = regions.map(region => {
        const overviewRulerColor = region.color;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        return decorationType;
    });

    model.present({ decorationTypes });
};

export const disposeDecorationTypes = (decorationTypes: vscode.TextEditorDecorationType[], model: Model) => {
    if (!decorationTypes) {
        model.present({ disposeDecorationTypes: true });
        return;
    }

    // Dispose all decoration types
    model.present({ disposeDecorationTypes: true });
    decorationTypes.map(d => d.dispose());
};