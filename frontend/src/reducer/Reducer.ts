import { LOGIN_SUCCESS, LOGOUT, LOGGED_IN_USER_DETAILS, GET_ALL_LOGGED_IN_USER_REPOS, SELECTED_REPO } from '../constants/Constants';

export type StateType = {
    isUserLoggedIn: boolean;
    userDetails: {};
    isLoading: boolean;
    userRepositories: [];
    selectedRepository: RepoInfo;
};


export type RepoInfo = {
    name: string;
    created_at: string;
    html_url: string;
    description: string;
};

export type ActionType =
    | {
        type: typeof LOGIN_SUCCESS,
    } |
    {
        type: typeof LOGOUT,
    } | {
        type: typeof LOGGED_IN_USER_DETAILS,
        payload: { userDetails: {}; };
    } | {
        type: typeof GET_ALL_LOGGED_IN_USER_REPOS,
        payload: { repos: any; };
    } |
    {
        type: typeof SELECTED_REPO,
        payload: { repoInfo: RepoInfo; };
    };


export const reducer = (state: StateType, action: ActionType): StateType => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isUserLoggedIn: true };

        case LOGOUT:
            return {
                ...state, isUserLoggedIn: false, userRepositories: [], selectedRepository: {
                    name: '',
                    created_at: '',
                    html_url: '',
                    description: ''
                }, userDetails: {}
            };

        case LOGGED_IN_USER_DETAILS:
            return { ...state, userDetails: action.payload.userDetails };

        case GET_ALL_LOGGED_IN_USER_REPOS:
            return { ...state, userRepositories: action.payload.repos };

        case SELECTED_REPO:
            return { ...state, selectedRepository: action.payload.repoInfo };
        default:
            return state;
    }
};