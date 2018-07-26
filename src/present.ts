import { Model, PresentData } from ".";
import state from './State';

// export default function present(model: Model, data: any[]) {
//     if ()    
// }

// Here you accept what will go into model

export default function present(this: Model, data: PresentData) : void {
    
    if(data.extensionContext) {
        this.extensionContext = data.extensionContext;        
    }

    if(data.regions || data.range === []) {
        this.regions = data.regions;
    }

    state.render(this);
}