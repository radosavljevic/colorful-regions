import * as vscode from 'vscode';
import * as babel from 'babel-eslint';
import { isHexColor } from './util/helpers';
import { Model, PositionWithColor, Region } from '.';
// import { start } from 'repl';

const parse = babel.parse;

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

    const regionsEnd = comments
        .filter(comment => comment.value.indexOf('#endregion') !== -1)
        .map(comment => activeTextEditor.document.positionAt(comment.start - 1));

    const regions: Region[] = regionsStart
        .filter((startRegion, i) => regionsEnd[i])
        .map((startRegion, i) => {
            return {
                start: startRegion,
                end: regionsEnd[i],
                color: '#FFFFFF'
            };
        });

    model.present({ regions });
};

const updateDecorationTypes = (
    regions, decorationTypes: vscode.TextEditorDecorationType[],
    model: Model
) => {
    decorationTypes.map(decorationType => decorationType.dispose());
    model.present({ decorationTypes });
};

export {
    init,
    update,
    updateDecorationTypes,
    updateRegions
};