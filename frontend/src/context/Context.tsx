import React, { createContext, useReducer, useContext } from 'react';
import { ActionType, reducer, StateType } from '../reducer/Reducer';

export interface ContextValue {
    state: StateType;
    dispatch: (action: ActionType) => void;
}

export const CustomContext = createContext({} as ContextValue);


const initialState: StateType = {
    user: {
        isLoggedIn: false,
        name: '',
        avatar: ''
    },
    isLoading: false,
    userRepositories: [],
    selectedRepository: {}
};

export const Provider: React.FC = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CustomContext.Provider value={{ state, dispatch }}>
            {children}
        </CustomContext.Provider>
    );
};

export const useAppContext = () => useContext(CustomContext);