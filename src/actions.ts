import * as vscode from 'vscode';
import * as babel from 'babel-eslint';
import * as ColorScheme from 'color-scheme';
import * as Color from 'color';
import { isHexColor } from './util/helpers';
import { Model, PositionWithColor, Region } from '.';

const parse = babel.parse;
const scheme = new ColorScheme;

const init = (context:vscode.ExtensionContext, model: Model) => {
    model.present({extensionContext: context});
};

const update = (evt: vscode.TextDocumentChangeEvent, model: Model) => {
    model.present({});
};

const updateRegions = (activeTextEditor: vscode.TextEditor ,model: Model) => {

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
            let commentTitleWords: any[] = comment.value.split(' ');
            let commentColor = commentTitleWords
                .slice(1, commentTitleWords.length)
                .filter(word => isHexColor(word));

            // Detect if there's a color in the title,
            // otherwise default
            let color;
            if (commentColor.length) {
                color = Color(commentColor[0]);
            } else {
                color = Color(`#${colors.colors()[i]}`);
            }

            const _comment: PositionWithColor = activeTextEditor.document.positionAt(comment.start);

            // debugger;
            if (color.color.length > 0) {
                _comment.color = commentColor[0];
            }

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
                color: startRegion.color
            };
        });

    model.present({ regions });
};

const updateDecorationTypes = (
    regions: Region[],
    model: Model
) => {
    const decorationTypes = regions.map(region => {
        const overviewRulerColor = region.color;
        const decorationType = vscode.window.createTextEditorDecorationType({
            overviewRulerColor
        });

        return decorationType;
    });

    // decorationTypes.map(decorationType => decorationType.dispose());
    model.present({ decorationTypes });
};

export {
    init,
    update,
    updateDecorationTypes,
    updateRegions
};