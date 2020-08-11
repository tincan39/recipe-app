import React, { useState, createContext } from 'react'


const context = createContext();

function UserContext(props) {
    //determines user atuhentication status
    const [auth, setAuth] = useState(false);

    return (
        <context.Provider value={{ auth, setAuth }}>
            {props.children}
        </context.Provider>
    );

}

UserContext.context = context;

export default UserContext;