import Header from "../components/hearders/Header"
import HeaderVendedor from "../components/hearders/HeaderVendedor"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProdutos, getProdutosVendedor } from "../services/produtoService"
import { useState } from "react"
import { useSearchParams } from "react-router-dom";

export default function PaginaInical() {
    const [searchParams] = useSearchParams();
    const [filtros, setFiltros] = useState("");
    const roleUser = localStorage.getItem('role');

    const termoPesquisa = searchParams.get("search") || "";

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
            {roleUser === "VENDEDOR" ?
                <div>
                    <HeaderVendedor/>
                    <div className="flex flex-col items-center mt-10 space-y-10">
                        <p className="font-bold text-2xl text-[#5494D2]">Meus produtos:</p>
                        <ListaProdutos
                                arrayProdutos={getProdutosVendedor}
                        />
                    </div>
                </div>
                :
                <div>
                    <Header />
                    <div className="flex justify-center mt-9 w-full px-2">
                        <ListaProdutos
                            arrayProdutos={getProdutos}
                            filtros={renderizarProdutos()}
                        />
                        <div className="hidden md:block mr-10">
                            <ModalFiltro onEnviar={setFiltros}/>
                        </div>
                    </div> 
                </div>
            }
        </div>
    )
}