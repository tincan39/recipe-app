import axios from 'axios';


//checks if the user is authenticated 
async function queryRecipe(id) {
    let res = await axios('/db/getOne', {
        params: {
            id: id
        }
    });

    return res;
}

export default queryRecipe;