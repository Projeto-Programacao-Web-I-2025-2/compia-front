import { useEffect, useState } from "react";
import CardProduto from "./cards/CardProduto";
import { LoadingOutlined } from '@ant-design/icons';

const ListaProdutos = ({arrayProdutos, filtros}) => {
    const [ produtos, setProdutos ] = useState(null);

    useEffect(() => {
        const carregaProdutos = async () => {
            const produtos = await arrayProdutos(filtros);

            if (produtos) {
                setProdutos(produtos);
            }

            console.log("Produtos carregados:", produtos);
        }
        carregaProdutos();
    }, [arrayProdutos, filtros])

    if (!produtos) {
        return (
            <div className="flex mx-auto items-center justify-center  text-[#5494D2]"> 
                <LoadingOutlined style={{ fontSize: 60 }}/>
            </div>
        );
    }

    if (produtos.length === 0) {
        return (
            <div className="flex w-[1100px] items-center justify-center text-3xl font-bold text-[#5494D2]"> 
                Nenhum livro encontrado!
            </div>
        );
    }

    return (
        <div className="flex w-[300px] md:w-[1100px] flex-wrap space-x-10 space-y-10 justify-start mx-auto">
            {Array.isArray(produtos) && produtos.map(prd => <CardProduto key={prd.id} produto={prd}/>)}
        </div>
    )
}

export default ListaProdutos;