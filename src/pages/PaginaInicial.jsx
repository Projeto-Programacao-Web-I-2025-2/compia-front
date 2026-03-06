import Header from "../components/hearders/Header"
import CardProduto from "../components/cards/CardProduto"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProdutos } from "../services/produtoService"
import { useEffect, useState } from "react"

export default function PaginaInical() {
    const [filtros, setFiltros] = useState("");

    useEffect

    return(
        <div className="">
            <Header />
            <div className="flex justify-center mt-10">
                <ListaProdutos
                    arrayProdutos={getProdutos}
                    filtros={filtros}
                />
                <ModalFiltro onEnviar={setFiltros}/>
            </div>
        </div>
    )
}