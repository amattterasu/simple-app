const URL = "http://localhost:4000/api/";

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

export const userPostFetch = user => {
    return dispatch => {
        return fetch(URL + 'users', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                token: user.username + user.password,
                username: user.username,
                password: user.password,
                role: user.role
            })
        })
            .then((resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
                return resp;
            }))
            .then(resp => resp.json())
            .then(data => {   // в случае успеха, data - ответ в JSON
                if (data.message) {
                    // logic
                } else {
                    localStorage.setItem("token", data.token) // data.token = jwt (simple)
                    dispatch(loginUser(data))
                }
            })
            .catch(err => err)
    }
}

export const userLoginFetch = user => {
    return dispatch => {
        return fetch(URL + 'login', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    //Тут прописываем логику
                } else {
                    localStorage.setItem("token", data.token)
                    dispatch(loginUser(data))
                }
            })
    }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(URL + 'auth', {
                credentials: 'include',
                method: "GET",
                headers: {
                    'Access-Control-Allow-Headers' : 'Version, Authorization, Content-Type',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // Будет ошибка если token не дествительный
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data))
                    }
                })
        }
    }
}