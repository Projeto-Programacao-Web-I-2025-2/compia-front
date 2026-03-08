import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'
import { CarrinhoProvider } from './contexts/CarrinhoContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  </StrictMode>,
)
