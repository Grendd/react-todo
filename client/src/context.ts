import {createContext} from "react";

export const ToDoContext = createContext({
    filter: 'all'
});

function noop () {}

interface AppContextType {
    token: string | null;
    userId: string | null;
    login: (() => void) | ((jwtToken: any, id: any) => void),
    logout: () => void,
    isAuthenticated: boolean
}

export const AppContext = createContext<AppContextType>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})