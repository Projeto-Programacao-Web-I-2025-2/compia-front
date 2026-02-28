import Header from "../components/hearders/Header"
import CardProduto from "../components/cards/CardProduto"
import ModalFiltro from "../components/Filtro"
import ListaProdutos from "../components/ListaProdutos"
import { getEstabelecimentos } from "../services/ProdutoService"

export default function PaginaInical() {
    return(
        <div className="">
            <Header />
            <div className="flex justify-center mt-10">
                <ListaProdutos
                    arrayProdutos={getEstabelecimentos}
                    filtros={''}
                />
                <ModalFiltro />
            </div>
        </div>
    )
}