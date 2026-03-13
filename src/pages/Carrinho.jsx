import { useEffect, useState } from "react";
import Header from "../components/hearders/Header";
import Imagem from '/carrinhoVazio.png'
import { getProdutoById } from "../services/produtoService";
import CardProdutoCarrinho from "../components/cards/CardProdutoCarrinho";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { criaPedido } from "../services/pedidoService";
import { message } from "antd";
import { useNavigate } from "react-router";

export default function Carrinho() {
    const navigate = useNavigate();
    const { carrinhoIds, removeProduto, getQtd } = useCarrinho();
    const [produtos, setProdutos] = useState([]);
    const { clearCarrinho } = useCarrinho();

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
                    <div className="flex bg-[#5494D2] w-[410px] min-h-[700px] md:w-[1165px] rounded-xl shadow-2xl">
                        <div className="flex w-full md:w-1/2 justify-center items-center text-white text-4xl font-bold">Carrinho Vazio!</div>
                        <div className="flex flex-1 justify-end">
                            <img src={Imagem} className="object-cover rounded-r-xl hidden md:flex" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleCriarPedido = async () => {
        const response = await criaPedido(carrinhoIds);

        if (response) {
            navigate("/checkout/" + response.id);
            clearCarrinho();
        }
    }

    const total = produtos.reduce((sum, prd) => {
        const qtd = getQtd(prd.id);
        return sum + (Number(prd.preco) || 0) * qtd;
    }, 0);

    return (
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex flex-col md:flex-row bg-[#FFFFFF] w-[410px] min-h-[700px] md:w-[1165px]  rounded-xl shadow-2xl">
                    <div className="flex md:w-1/2 flex-col rounded-xl md:rounded-l-xl md:rounded-r-none bg-[#5494D2] justify-center items-center space-y-2">
                        <div className="flex flex-col max-h-[600px] space-y-5 overflow-y-auto items-center mt-7 ">
                            {produtos.map(prd => (
                                <CardProdutoCarrinho key={prd.id} produto={prd} onRemove={() => removeProduto(prd.id)}/>
                            ))}
                        </div>
                        <button className='flex justify-center items-center bg-[#F174A7] border-1 border-white p-2 rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer mb-3' onClick={(e) => {e.stopPropagation();  e.preventDefault(); clearCarrinho();}}>
                                <p className='text-white'>Limpar Carrinho</p>
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-center text-[#5494D2] text-4xl font-bold space-y-10">
                        <div className="space-y-10">
                            <p>Total: {total.toFixed(2)}</p>
                        </div>
                        <button className='flex justify-center  items-center bg-[#F174A7] w-[200px] mb-3 md:w-[435px] h-[60px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer' onClick={handleCriarPedido}>
                                <p className='text-white'>Continuar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}