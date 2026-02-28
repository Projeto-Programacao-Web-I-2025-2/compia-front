import Header from "../components/hearders/Header"
import CardProduto from "../components/cards/CardProduto"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getProduto } from "../services/ProdutoService"

export default function PaginaInical() {
    return(
        <div className="">
            <Header />
            <div className="flex justify-center mt-10">
                <ListaProdutos
                    arrayProdutos={getProduto}
                    filtros={''}
                />
                <ModalFiltro />
            </div>
        </div>
    )
}