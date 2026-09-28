import { createContext, useState } from "react"

export const CounterContext = createContext({});

console.log(CounterContext);

export default function CounterContextProvider({children} : {children: React.ReactNode}) {

    const [Counter, setCounter] = useState(0)
    return (
    <>
    <CounterContext.Provider value={{ Counter, setCounter }}>
        {children}
    </CounterContext.Provider>
    </>
    )
}
