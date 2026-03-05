import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import PaginaInical from '../pages/PaginaInicial'
import PaginaProduto from '../pages/PaginaProduto'
import Carrinho from '../pages/Carrinho'
import Perfil from '../pages/Perfil'
import Endereco from '../pages/Endereço'
import Anunciar from '../pages/Anunciar' 

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            <Route
                path='/home'
                element={
                    <PaginaInical/>
                }
            />

            <Route 
                path="/login"
                element={
                    <Login/>
                }
            />

            <Route 
                path="/cadastro"
                element={
                    <Cadastro/>
                }
            />

            <Route
                path="/produto/:id"
                element={
                    <PaginaProduto />
                }
            />

            <Route
                path='/carrinho'
                element={
                    <Carrinho />
                }
            />

            <Route
                path='/perfil'
                element={
                    <Perfil />
                }
            />

            <Route
                path='/endereco'
                element={
                    <Endereco />
                }
            />

            <Route
                path='/anunciar'
                element={
                    <Anunciar />
                }
            />
            
        </Routes>
    )
}