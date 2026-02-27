import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import PaginaInical from '../pages/PaginaInicial'

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
                path="cadastro"
                element={
                    <Cadastro/>
                }
            />
        </Routes>
    )
}