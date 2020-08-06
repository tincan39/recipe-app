import React, { useState, createContext } from 'react'


const context = createContext();

function UserContext(props) {
    const [currentRecipe, setCurrentRecipe] = useState({});
    const [searchedRecipes, setSearched] = useState({});
    const [auth, setAuth] = useState(false);



    /**
     * 1. use a useEffect hook to check if user is authenticated
     * 2.store result in a boolean variable
     * 3.retrieve user data if user is authenticated
     */

    /*
   useEffect(() => {
       const init = async () => {
           let res = await checkAuth();
           setAuth(res);
       };
       init();
   }, [])*/

    return (
        <context.Provider value={{ currentRecipe, setCurrentRecipe, searchedRecipes, setSearched, auth, setAuth }}>
            {props.children}
        </context.Provider>
    );

}

UserContext.context = context;

export default UserContext;