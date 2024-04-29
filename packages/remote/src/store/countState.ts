import { StateCreator } from "zustand";

interface CountState {
    count: number;
    setCount: (n: number) => void;
}

const COUNTER_ACTION = {
    SET_COUNT: 'COUNTER/SET_COUNT'
}

const createCountSlice: StateCreator<CountState, [["zustand/devtools", never]], [], CountState> = (set) => ({
    count: 0,
    setCount: (nValue: number) => {
        return set({ count: nValue }, undefined, COUNTER_ACTION.SET_COUNT);
    }
});




//selector
const countSelector = (s: CountState) => s.count;
const setCountSelector = (s: CountState) => s.setCount;



export type { CountState }
export {
    countSelector,
    setCountSelector
}
export { createCountSlice };