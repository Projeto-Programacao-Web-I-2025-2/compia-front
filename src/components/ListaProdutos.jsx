import { useEffect, useState } from "react";
import CardProduto from "./cards/CardProduto";

const ListaProdutos = ({arrayProdutos, filtros}) => {
    const [ produtos, setProdutos ] = useState([]);

    useEffect(() => {
        const carregaProdutos = async () => {
            const produtos = await arrayProdutos(filtros);

            if (produtos) {
                setProdutos(produtos);
            }
        }
        carregaProdutos();
    }, [arrayProdutos, filtros])

    return (
        <div className="flex w-[1100px] flex-wrap space-x-10 space-y-10">
            {Array.isArray(produtos) && produtos.map(prd => <CardProduto key={prd.id} produto={prd}/>)}
        </div>
    )
}

export default ListaProdutos;