import React, {createContext, useContext, useState} from "react";

type LoginContextType = {
    userName: string;
    isLoggedIn: boolean;
    loginToApp: (email: string, password: string) => void;
    logoutFromApp: () => void;
}

const LoginContext = createContext<LoginContextType>({
    userName: '',
    isLoggedIn: false,
    loginToApp: () => null,
    logoutFromApp: () => null
});

const TEST_USERS = [
    {
        username: "test",
        password: "test"
    }, {
        username: "test1",
        password: "test1"
    },
];

type Props = {
    children?: React.ReactNode
};


export const LoginProvider = ({children}: Props) => {
    const [userName, setUserName] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const loginToApp = (userNameValue: string, password: string) => {
        if (TEST_USERS.some(user => user.username === userNameValue && user.password === password)) {
            setUserName(userNameValue)
            setIsLoggedIn(true);
            console.log(isLoggedIn)
        }
    }

    const logoutFromApp = () => {
        setIsLoggedIn(false)
    }

    return <LoginContext.Provider
        value={{userName, isLoggedIn, loginToApp, logoutFromApp}}>{children}</LoginContext.Provider>
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) throw Error('LoginContext was used outside the provider');
    return context;
};
