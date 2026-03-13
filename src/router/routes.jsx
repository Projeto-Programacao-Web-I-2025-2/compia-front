import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import PaginaInical from '../pages/PaginaInicial'
import PaginaProduto from '../pages/PaginaProduto'
import Carrinho from '../pages/Carrinho'
import Perfil from '../pages/Perfil'
import Endereco from '../pages/Endereço'
import Anunciar from '../pages/Anunciar' 
import MeusPedidos from '../pages/MeusPedidos'
import EditaLivro from '../pages/EditaLivro'
import MinhasVendas from '../pages/MinhaVendas'
import Pagamento from '../pages/Pagamento'
import Checkout from '../pages/Checkout'
import EditarConta from '../pages/EditarConta'

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

            <Route
                path='/meus-pedidos'
                element={
                    <MeusPedidos />
                }
            />

            <Route
                path="/editar/:id"
                element={
                    <EditaLivro />
                }
            />

            <Route
                path="/minhas-vendas"
                element={
                    <MinhasVendas />
                }
            />

            <Route
                path="/pagamento/:id"
                element={
                    <Pagamento />
                }
            />

            <Route
                path="/checkout/:id"
                element={
                    <Checkout />
                }
            />

            <Route
                path="/editar-conta"
                element={
                    <EditarConta/>
                }
            />
            
        </Routes>
    )
}