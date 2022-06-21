import React from "react";
import { v4 as uuid } from "uuid";
  
  const actions = {
    ADD: 'add',
    REMOVE: 'remove',
    UPDATE:'update',
    FILTER:'filter'
  };

  
  const defaultState = !localStorage.getItem("items")
      ? []
      : JSON.parse(localStorage.getItem("items"));
 

  const TodoListContext = React.createContext();




  function reducer(state, action) {
    switch (action.type) {
       case 'add': {
           let key =   Object.keys(state).length? Object.keys(state).length  : 1;
           let id = uuid();
            const item = action.data;
            item.id = id;
                const updatedState = {...state,
                         [key]:item,}
              localStorage.setItem("items", JSON.stringify({...updatedState}));
            return updatedState;
        }
        case 'remove': {
            for(let key   in state){
                if(state[key].id === action.data.id){
                    delete state[key];
                }
            }
            localStorage.setItem("items", JSON.stringify({...state}));
            return { ...state};
        }
        case 'update': {
            for (let key in state){
                if(state[key].id === action.data.id){
                    state[key].title = action.data.title;
                    state[key].upVotes = Number(action.data.upVotes);
                    state[key].date = action.data.date;
                    localStorage.setItem('items', JSON.stringify(state));
                }
            }
            return {
                ...state,
            };
        }
        case 'filter':{
            let items = [...Object.values(state)];
            if(action.data.sortBy === 'upVotes'){
                state= {...items.sort((a, b) => Number(b.upVotes) - Number(a.upVotes))};
                return {...state};
            }
            else if(action.data.sortBy === 'recent'){
                state= {...items.sort((a, b) => new Date(b.date) - new Date(a.date))};
                return {...state};
            }
            else if(action.data?.type === 'searchByString'){
               state = items.filter((obj) =>
               JSON.stringify(obj).toLowerCase().includes(action.data.search.toLowerCase()))
                return {...state};
            }
            else {
                return (JSON.parse(localStorage.getItem("items")));
            }
        }
        default: {
            return JSON.parse(localStorage.getItem("items"))
        }
    }
}

function ListProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, {
        ...defaultState,
    });

    const value = { state, dispatch, actions };
    return (
        <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>
    );
}

function useList() {
    const context = React.useContext(TodoListContext);
    if (context === undefined) {
        throw new Error('useList must be used within a ListProvider');
    }
    return context;
}

export { ListProvider, useList };