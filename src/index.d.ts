import * as vscode from 'vscode'

export type PresentData = {
    [key: string]: any
};
export type Present = (this: Model, data: PresentData) => void

interface EnquedAction {
    run: (...args: any[]) => void;
    args?: any[];
}

export interface Model {
    extensionContext: vscode.ExtensionContext;
    activeTextEditor: vscode.TextEditor;
    regions: Region[];
    decorationTypes: vscode.TextEditorDecorationType[];
    enquedActions: EnquedAction[];
    settings: Settings;
    present: Present;
}

export interface State {
    render: (model: Model) => void;
    nextState: (model: Model) => void;
    ready: (model: Model) => boolean;

}

export interface Comment extends vscode.Position {
    color?: string;
    title?: string;
}

export interface Region {
    start: vscode.Position;
    end: vscode.Position;
    color: string;
    title: string;
}

export interface Settings {
    
    /** 
     * When this is set to true, all regions will get colors
     * otherwise you need it to set it youself by appending color to the region
     * i.e //#region #FFF, or //#region name of your region #fff
     */
    assignPredefinedColors: boolean;

    /** 
     * If this is set, all regions which don't have a color attached to them will be assigned this color
     * 
     * Default is `rgba(0, 0, 0, 0)` which means no color
     */
    defaultColor: string;

    /** 
     * Transparency of the colored regions
     * 
     * range: 0 - 1
     * 
     * default: 0.3
     */
    transparencyAmount: number;

    /**
     * hue from which to generate default colors
     * 
     * range: 0 - 255
     * 
     * default: 0
     */
    hue: number;
}

// TODO: add possible data types for the present function