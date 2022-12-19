import create from 'solid-zustand';
import { 
    AuthState, createAuthSlice,
    EventState, createEventSlice
} from './slices';

export type States =
    AuthState & EventState;

export interface DispatchSlice {
    // dispatch: (action: string, payload: any) => any;
}

export const useStore = create<States & DispatchSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createEventSlice(...a),
    // dispatch: async (action: string, payload: any) => {
    //     switch (action) {
    //         case 'fetchGuests': {
    //             console.log("test");
    //         }
    //         default: {
    //             console.log("Неизвестный action:", action);
    //             return undefined;
    //         }
    //     }
    // }
}));