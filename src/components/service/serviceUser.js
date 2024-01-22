
import axios from "axios";

export const addUser= (data) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", {
            Username: data.Username,
            Password: data.Password,
            Name: data.Name,
            Phone: data.Phone,
            Email: data.Email,
            Tz: data.Tz
        }).then(x => {

            console.log(x.data)
            dispatch({ type: 'SET_USER', payload: x.data })
          

            })

            .catch((error) =>
                console.error(error)
            )
    }
}