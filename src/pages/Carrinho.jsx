import { useEffect, useState } from "react";
import Header from "../components/hearders/Header";
import Imagem from '/carrinhoVazio.png'
import { getCarrinho } from "../services/carrinhoService";
import CardProdutoCarrinho from "../components/cards/CardProdutoCarrinho";

export default function Carrinho() {
    const [carrinho, setCarrinho] = useState(null);

    useEffect(() => {
        const carregaCarrinho = async () => {
            const carrinho = await getCarrinho();

            if (carrinho) {
                setCarrinho(carrinho);
            }
        };
        carregaCarrinho();
    }, [carrinho]);

    const AnimacaoCardCarregando = () => (
        <div className="flex bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[620px] h-[120px] shadow-xl animate-[pulse_0.9s_ease-in-out_infinite]"></div>
    );

    if (!carrinho) {
        return (
            <div>
                <Header/>
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                        <div className="flex flex-col items-center space-y-5 w-1/2 justify-center ">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <AnimacaoCardCarregando key={index} />
                            ))}
                        </div>
                        <div className="flex flex-col space-y-5 flex-1 rounded-r-xl bg-[#FFFFFF] items-center justify-center">
                            <div className="bg-[#5494D2] w-[300px] h-[30px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                            <div className="bg-[#5494D2] w-[300px] h-[30px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                            <div className="bg-[#5494D2] w-[300px] h-[30px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    if (Object.keys(carrinho).length === 0) {
        return (
            <div>
                <Header/>
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                        <div className="flex w-1/2 justify-center items-center text-white text-4xl font-bold">Carrinho Vazio!</div>
                        <div className="flex flex-1 justify-end">
                            <img src={Imagem} className="object-cover rounded-r-xl" ></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex w-1/2 rounded-l-xl bg-[#5494D2] justify-center items-center">
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center ">
                            {Array.isArray(carrinho) && carrinho.map(prd => <CardProdutoCarrinho key={prd.id} produto={prd}/>)} 
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-center  items-center text-[#5494D2] text-4xl font-bold">
                        <div className="space-y-10">
                            <p>Sub-total: $$$$</p>
                            <p>Frete: $$$$</p>
                            <p>Total: $$$$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}