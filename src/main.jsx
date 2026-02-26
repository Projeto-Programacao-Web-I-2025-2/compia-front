import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaLogin from './pages/Login.jsx'
import TelaCadastro from './pages/Cadastro.jsx'
import Layout from './layouts/LayoutDefault.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
