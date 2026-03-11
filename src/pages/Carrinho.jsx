import { useEffect, useState } from "react";
import Header from "../components/hearders/Header";
import Imagem from '/carrinhoVazio.png'
import { getProdutoById } from "../services/produtoService";
import CardProdutoCarrinho from "../components/cards/CardProdutoCarrinho";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { criaPedido } from "../services/pedidoService";

export default function Carrinho() {
    const { carrinhoIds, removeProduto, getQtd } = useCarrinho();
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const carregaProdutos = async () => {
            if (carrinhoIds.length > 0) {
                const produtosCompletos = await Promise.all(
                    carrinhoIds.map(([id]) => getProdutoById({id}))
                );
                setProdutos(produtosCompletos);
            } else {
                setProdutos([]);
            }
        };
        carregaProdutos();
    }, [carrinhoIds]);

    if (produtos.length === 0 && carrinhoIds.length === 0) {
        return (
            <div>
                <Header/>
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                        <div className="flex w-1/2 justify-center items-center text-white text-4xl font-bold">Carrinho Vazio!</div>
                        <div className="flex flex-1 justify-end">
                            <img src={Imagem} className="object-cover rounded-r-xl" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const total = produtos.reduce((sum, prd) => {
        const qtd = getQtd(prd.id);
        return sum + (Number(prd.preco) || 0) * qtd;
    }, 0);

    return (
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex w-1/2 rounded-l-xl bg-[#5494D2] justify-center items-center">
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center ">
                            {produtos.map(prd => (
                                <CardProdutoCarrinho key={prd.id} produto={prd} onRemove={() => removeProduto(prd.id)}/>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 justify-center items-center text-[#5494D2] text-4xl font-bold space-y-10">
                        <div className="space-y-10">
                            <p>Total: {total.toFixed(2)}</p>
                        </div>
                        <button className='flex justify-center  items-center bg-[#F174A7] w-[435px] h-[60px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer' onClick={() => {criaPedido(carrinhoIds)}}>
                                <p className='text-white'>Continuar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}