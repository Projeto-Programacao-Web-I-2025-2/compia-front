import Header from "../components/hearders/Header"
import HeaderVendedor from "../components/hearders/HeaderVendedor"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProdutos, getProdutosVendedor } from "../services/produtoService"
import { useState } from "react"

export default function PaginaInical() {
    const [filtros, setFiltros] = useState("");
    const roleUser = localStorage.getItem('role');
    const [termoPesquisa, setTermoPesquisa] = useState("");

    const renderizarProdutos = () => {
        let params = filtros || "?";
        
        const separador = params === "?" ? "" : "&";
        
        if (termoPesquisa) {
            params += `${separador}search=${encodeURIComponent(termoPesquisa)}`;
        }
        
        return params === "?" ? "" : params;
    };

    return(
        <div>
            {roleUser === "CLIENTE" || !roleUser ?
                <div>
                    <Header onPesquisar={setTermoPesquisa} />
                    <div className="flex justify-center mt-10">
                        <ListaProdutos
                            arrayProdutos={getProdutos}
                            filtros={renderizarProdutos()}
                        />
                        <ModalFiltro onEnviar={setFiltros}/>
                    </div> 
                </div>
                :
                <div    >
                    <HeaderVendedor/>
                    <div className="flex flex-col items-center mt-10 space-y-10">
                        <p className="font-bold text-2xl text-[#5494D2]">Meus produtos:</p>
                        <ListaProdutos
                                arrayProdutos={getProdutosVendedor}
                        />
                    </div>
                </div>
            }
        </div>
    )
}