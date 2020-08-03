import axios from 'axios';


//checks if the user is authenticated 
async function checkAuth() {
    let response = await axios('/authUser');
    return response.data.isAuth;
}

export default checkAuth;