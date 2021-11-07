import React from 'react';

export type StateType = {
    user: {
        isLoggedIn: boolean;
        name: string;
        avatar: string;
    },
    isLoading: boolean;
    userRepositories: [];
    selectedRepository: {};
};

export type ActionType = {
    type: 'HELLO';
};

export const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'HELLO':
            return state;
        default:
            return state;
    }
};