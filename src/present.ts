import { Model, PresentData } from ".";
import state from './State';

// export default function present(model: Model, data: any[]) {
//     if ()    
// }

export default function present(this: Model, data: PresentData) : void {
    
    if (data.extensionContext) {
        this.extensionContext = data.extensionContext;        
    }

    state.render(this);
}