import Header from "../components/hearders/Header"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProdutos, getProdutosVendedor } from "../services/produtoService"
import { useState } from "react"

export default function PaginaInical() {
    const [filtros, setFiltros] = useState("");
    const roleCliente = localStorage.getItem('role');

    return(
        <div className="">
            <Header />
            {roleCliente === "CLIENTE" || !roleCliente ? 
                <div className="flex justify-center mt-10">
                    <ListaProdutos
                        arrayProdutos={getProdutos}
                        filtros={filtros}
                    />
                    <ModalFiltro onEnviar={setFiltros}/>
                </div> 
                :
                <div className="flex justify-center mt-10">
                    <ListaProdutos
                            arrayProdutos={getProdutosVendedor}
                    />
                </div>
            }
        </div>
    )
}