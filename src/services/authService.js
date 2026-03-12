import api from "./api";

export const register = async ({nome, email, senha, role}) => {
    if(role !== "CLIENTE") {
        const response = await api.post('vendedores/', {nome, email, password: senha});

        return(response.data)
    }
    const response = await api.post('clientes/', {nome, email, password: senha});

    return(response.data)        
}

export const login = async ({ email, senha }) => {
    const response = await api.post('auth/token/login/', { 
        email, 
        password: senha 
    });
    
    const token = response.data.auth_token;
    localStorage.setItem('auth_token', token);

    try {
        const me = await api.get('vendedores/me')

        localStorage.setItem('role', "VENDEDOR");
    }
    catch (error) {
        localStorage.setItem('role', "CLIENTE");
    }
    
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('auth/users/me')

    return response.data;
}

export const logout = async () => {
    try {
        await api.post('auth/token/logout/'); 
    } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('role');       
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