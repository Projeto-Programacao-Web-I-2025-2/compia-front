import Header from "../components/hearders/Header"
import { LuShoppingCart } from "react-icons/lu";
import { getProdutoById } from "../services/ProdutoService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import '../index.css'

export default function PaginaProduto() {
    const id = useParams();
    const [produto, setProduto ] = useState(null);

    useEffect(() => {
        const carregaProduto = async () => {
            const produto = await getProdutoById(id);

            if(produto) {
                setProduto(produto);
            }
        };
        carregaProduto();
    }, [id]);

    if (!produto) {
         return(
            <div>
                <Header/>
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                        <div className="ml-10 mt-10 rounded-xl border-1 border-[#979797] bg-[#FFFFFF] w-[650px] h-[650px] shadow-xl animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                        <div className="flex justify-between flex-col flex-1 mt-10 ml-10 mr-10 mb-10 w-[600px]">
                            <div>
                                <div className="bg-[#FFFFFF] w-[600px] h-[40px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                                <div className="mt-2 bg-[#FFFFFF] w-[200px] h-[40px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                            </div>
                            <div className="bg-[#FFFFFF] w-[600px] h-[400px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]">
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="bg-[#FFFFFF] w-[200px] h-[40px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                                <div className="bg-[#FFFFFF] w-[200px] h-[40px] rounded-lg animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const { nome, autor, descricao, preco } = produto || {};

    return(
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="ml-10 mt-10 rounded-xl border-1 border-[#979797] bg-[#FFFFFF] w-[650px] h-[650px] shadow-xl"></div>
                    <div className="flex justify-between flex-col flex-1 text-bold text-white mt-10 ml-10 mr-10 mb-10 w-[600px]">
                        <div>
                            <h1 className="text-2xl line-clamp-3">{nome}</h1>
                            <h2>Autor: {autor}</h2>
                        </div>
                        <div className="h-[400px] overflow-y-auto">
                            {descricao}
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-4xl">R$ {preco}</h3>
                            <button className="flex items-center border-1 border-[#FFFFFF] bg-[#314C91] hover:bg-[#1d2d57] rounded-xl p-2 text-xl">
                                Adicionar ao carrinho
                                <LuShoppingCart/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}