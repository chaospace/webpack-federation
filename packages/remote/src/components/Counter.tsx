import React from "react";
import { useCount, useSetCount } from "@/store";


function Counter() {

    const count = useCount();
    const setCount = useSetCount();

    return (
        <div>
            <span>{ count }</span>
            <button onClick={ () => setCount(count + 1) }>카운트증가</button>
        </div>
    )
}


export default Counter;