import Header from "../components/hearders/Header"
import CardProduto from "../components/cards/CardProduto"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProdutos } from "../services/produtoService"

export default function PaginaInical() {
    return(
        <div className="">
            <Header />
            <div className="flex justify-center mt-10">
                <ListaProdutos
                    arrayProdutos={getProdutos}
                    filtros={''}
                />
                <ModalFiltro />
            </div>
        </div>
    )
}