import { useEffect, useState } from "react";
import CardProduto from "./cards/CardProduto";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

const ListaProdutos = ({arrayProdutos, filtros}) => {
    const [ produtos, setProdutos ] = useState(null);

    useEffect(() => {
        const carregaProdutos = async () => {
            const produtos = await arrayProdutos(filtros);

            if (produtos) {
                setProdutos(produtos);
            }
        }
        carregaProdutos();
    }, [arrayProdutos, filtros])

    if (!produtos) {
        return (
            <div className="flex w-[1100px] items-center justify-center"> 
                <LoadingOutlined/>
            </div>
        );
    }

    return (
        <div className="flex w-[1100px] flex-wrap space-x-10 space-y-10">
            {Array.isArray(produtos) && produtos.map(prd => <CardProduto key={prd.id} produto={prd}/>)}
        </div>
    )
}

export default ListaProdutos;