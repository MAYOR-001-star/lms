import { createContext, useContext } from "react";

type AppContextProps = {
    children: React.ReactNode
}

export const AppContext = createContext(null)

const value ={

}

export const AppProvider=({children}:AppContextProps)=>{
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}



export const useGlobalContext=()=>{
    return useContext(AppContext);
}
