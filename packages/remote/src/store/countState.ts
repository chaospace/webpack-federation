import { StateCreator, create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

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



const counterStore = create<CountState>()(devtools((set) => ({
    count: 0,
    setCount: (n: number) => set({ count: n }, undefined, COUNTER_ACTION.SET_COUNT)
}), {
    name: "counterStore"
}));


//selector
const selectCount = (s: CountState) => s.count;
const selectSetCount = (s: CountState) => s.setCount;

const useCount = () => useStore(counterStore, selectCount);
const useSetCount = () => useStore(counterStore, selectSetCount);



export type { CountState }
export {
    selectCount,
    selectSetCount
}
export { createCountSlice, counterStore, useCount, useSetCount };