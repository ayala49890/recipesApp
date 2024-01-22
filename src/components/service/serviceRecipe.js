import axios from "axios";
import Swal from "sweetalert2";

export const getRecipes = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/recipe')
            .then(res => {

                dispatch({ type: "SET_RECIPES", payload: res.data })

            })

            .catch((error) =>
                console.error(error)
            )
    }
}
export const deleteRecipe = (recipe) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/delete/:${recipe.Id}`)
            .then(() => {
                dispatch({ type: "DELETE_RECIPE", payload: recipe })
                Swal.fire({ icon: 'success', position: 'center', title: '!המתכון נמחק בהצלחה' });
            })
            .catch((error) => { console.error(error) })
    }
}
export const addRecipe = (recipe) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/api/recipe', recipe)
            .then((res) => {
                dispatch({ type: "ADD_RECIPE", payload: res.data });
                Swal.fire({ icon: 'success', position: 'center', title: 'המתכון הוסף בהצלחה' });
            })
            .catch((err) => {
                Swal.fire({ icon: 'error', position: 'center', title: err.response?.data });
            });
    };
};

export const editRecipe = (recipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', recipe).then(
        (res) => {
            dispatch({ type: "EDIT_RECIPE", payload: res.data })
        }).catch((error) => {
            Swal.fire({ icon: 'error', position: 'center', title: error.response?.data })
        })
}



