import axiosInstance from "./axiosInstance";

//-----Cerrar cesion-----

export function logout(id) {
    return async function (dispatch) {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("currentUser")
            localStorage.removeItem("get")
            localStorage.removeItem("create")
            localStorage.removeItem("edit")
            localStorage.removeItem("delete")
            let response = await axiosInstance.get(`logout?id=${id}`);

            return response
        } catch (error) {
            console.log(error)
        }

    }
}

//-----Menu-----

export function getMenu(payload) {
    return async function (dispatch) {

        try {

            const response = await axiosInstance.post(`menu`, payload)

            return dispatch({
                type: "MENU",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


//-----Empresas-----

export function getEmpresas(payload) {
    return async function (dispatch) {

        try {
            const response = await axiosInstance.post(`empresas`, payload)
            return dispatch({
                type: "EMPRESAS",
                payload: response.data
            })
        } catch (error) {
            if (error.response.status === 401) {
                return error.response.status;
            }
            console.log(error)
        }
    }
}


//-----Agregar empresa al token-----

export function updateToken(payload) {

    return async function (dispatch) {
        try {
            const response = await axiosInstance.post(`updatetoken`, payload);
            localStorage.setItem('token', response.data.acess_token);
            return response.status;
        } catch (error) {
            if (error.response.status === 401) {
                return error.response.status;
            }
            console.log(error)
        }

    }
}

export function checkToken() {
    return async function (dispatch) {

        try {
            const response = await axiosInstance.get(`checkToken`)
            return response;
        } catch (error) {
            // console.log("error del token")
            console.log("error",error.response.status)
            return error.response.status
        }
    }
}



