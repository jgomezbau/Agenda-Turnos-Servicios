import axiosInstance from "./axiosInstance";


//------ Pedir Temas -------

export function getTemas() {
    return async function (dispatch) {
        try {
            const response = await axiosInstance.get(`pedirtemas`)
            return dispatch({
                type: "TEMAS",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}