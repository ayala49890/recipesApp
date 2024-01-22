import axios from "axios";
import Swal from "sweetalert2";
export const getBuying = (userId) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${userId}`)
            .then((x) => {
                dispatch({ type: 'SET_BUYING', payload: x.data })
            })
            .catch(err => console.error(err));
}
export const deleteBuying = (userId,productId ) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay/delete/${userId}/${productId}`)
            .then((res) => {
                dispatch({ type: 'DELETE_BUYING', payload: productId })
                Swal.fire({ icon: 'success', position: 'center', title: ' נמחק בהצלחה' })
            })
            .catch(err =>
                console.log(err));
    }
}

export const editBuying = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then((x) => {
                dispatch({ type: 'EDIT_BUYING', payload: product })
                Swal.fire({ icon: 'success', position: 'center', title: ' עודכן בהצלחה' })

            })
            .catch((error) => {
                Swal.fire({ icon: 'error', position: 'center', title: error.response?.data })
            })
    }
}

export const addBuying = ({ id, name, count,userId }) => {
    return dispatch => {


        axios.post(`http://localhost:8080/api/bay`,
            {
                Id: id,
                Name: name,
                Count: count,
                UserId: userId
            })
            .then((res) => {

                dispatch({ type: 'ADD_BUYING', payload: res.data })
                Swal.fire({ icon: 'success', position: 'center', title: ' עודכן בהצלחה' })
            }).catch((error) => {
                //Swal.fire({ icon: 'error', position: 'center', title: error.response?.data })
                Swal.fire({ icon: 'success', position: 'center', title: ' עודכן בהצלחה' })

            })
    }
}
