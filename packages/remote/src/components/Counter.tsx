import React from "react";
import { selectCount, selectSetCount, useCount, useSetCount } from "@/store/countState";
import { useStateStore } from "@/store";


function Counter() {

    const count = useStateStore(selectCount);//useCount();
    const setCount = useStateStore(selectSetCount); //useSetCount();

    return (
        <div>
            <span>{ count }</span>
            <button onClick={ () => setCount(count + 1) }>카운트증가</button>
        </div>
    )
}


export default Counter;