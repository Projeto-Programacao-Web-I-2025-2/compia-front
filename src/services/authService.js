import api from "./api";

export const register = async ({nome, email, senha}) => {
    const response = await api.post('auth/users/', {nome, email, password: senha, re_password: senha});

    return(response.data)        
}

export const login = async ({ email, senha }) => {
    const response = await api.post('auth/token/login/', { 
        email, 
        password: senha 
    });
    
    const token = response.data.auth_token;
    localStorage.setItem('auth_token', token);
    
    return response.data;
};

export const logout = async () => {
    try {
        await api.post('auth/token/logout/'); 
    } finally {
        localStorage.removeItem('auth_token');
    }
};

export const isLogged = async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token || token === 'undefined' || token === 'null') {
        return null;
    }

    try {
        const response = await api.get('auth/users/me/');
        return response.data;
    } catch (error) {
        localStorage.removeItem('auth_token');
        delete api.defaults.headers.common['Authorization'];
        return null;
    }
};