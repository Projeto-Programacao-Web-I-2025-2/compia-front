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

    const AnimacaoCardCarregando = () => (
        <div className="flex items-center justify-center bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[317px] h-[400px] shadow-xl">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />} />
        </div>
        
    );

    if (!produtos) {
        return (
            <div className="flex w-[1100px] flex-wrap gap-10">
                
                {Array.from({ length: 6 }).map((_, index) => (
                <AnimacaoCardCarregando key={index} />
                ))}
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