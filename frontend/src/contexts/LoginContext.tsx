import React, {createContext, useContext, useState} from "react";

type LoginContextType = {
    user: string;
    isLoggedIn: boolean;
    loginToApp: (email: string, password: string) => void;
    logoutFromApp: () => void;
}

const LoginContext = createContext<LoginContextType>({
    user: '',
    isLoggedIn: false,
    loginToApp: () => null,
    logoutFromApp: () => null
});

const TEST_USERS = [
    {
        email: "text@mail.com",
        password: "qwerty"
    }, {
        email: "text1@mail.com",
        password: "qwerty1"
    },
];

type Props = {
    children?: React.ReactNode
};


export const LoginProvider = ({children}: Props) => {
    const [user] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const loginToApp = (email: string, password: string) => {
        if (TEST_USERS.some(user => user.email === email && user.password === password)) {
            setIsLoggedIn(true);
        }
    }

    const logoutFromApp = () => {
        setIsLoggedIn(false)
    }

    return <LoginContext.Provider
        value={{user, isLoggedIn, loginToApp, logoutFromApp}}>{children}</LoginContext.Provider>
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) throw Error('LoginContext was used outside the provider');
    return context;
};
