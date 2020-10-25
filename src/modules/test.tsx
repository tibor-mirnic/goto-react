import React, { createContext, useReducer } from "react";

const initialState = {
  state : {
    
  },
  dispatch: null
};


interface ContextType {
    state: {
      
    };
    dispatch: React.Dispatch<{ type: string; value: unknown }>;
  };



const store = createContext<ContextType | null>(null);


const StateProvider = ( { children} : any ) => {
  const reducer = (state : any, action:{type:string, value:any}) => {
    console.log("I'm inside reducer hey hey hey");
    console.log("state : ", state);
    switch(action.type) {
        case "dateChecked": 
            //console.log("dateChecked: ", action.value);
            if(state.searchFilter && state.searchFilter.includes(action.value)){
                const searchFilter = state.searchFilter.filter((v: string) => v !== action.value);
                const newState = { ...state, searchFilter };
                //state.searchFilter = newSearchFilter;
                return newState;
            }else{
                state.searchFilter.push(action.value);
            }  
        break;
        case "dataIssueChecked":
          console.log("dataIssueChecked: ", action.value);
            if(state.searchFilter.includes(action.value)){
                let searchFilter = state.searchFilter.filter((v: string) => v !== action.value);
                const newState = { ...state, searchFilter };
                return newState;
            }else{
                state.searchFilter.push(action.value);
            }
        break;
        case "UPDATE_TABLE":
            console.log("UPDATE_TABLE in store scope : ", action.value);
            console.log("state : ", state);
            console.log("state.dataRows : ", state.dataRows);
            state.dataRows =  action.value;
        break;
      default:
        throw new Error();
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <store.Provider value={{ state, dispatch }}>{children}</store.Provider>;
};