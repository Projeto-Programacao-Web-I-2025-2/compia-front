import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom"
import { CiImageOff } from "react-icons/ci";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { message } from "antd";

const CardProduto = ({produto}) => {
    const { id, nome, preco , imagem} = produto || {};
    const { addProduto } = useCarrinho();

    return(
        <Link to={`/produto/${id}`}>
            <div className="flex flex-col bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[317px] h-[400px] shadow-xl hover:bg-[#f5f5f5]">
                <div className="fundoImagemProduto flex bg-[#E5E5E5] w-[270px] h-[270px] mx-auto mt-6 items-center justify-center">
                    {imagem ? <img src={imagem} className="object-contain w-[270px] h-[270px]"></img> : <CiImageOff size={70}/>}
                </div>
                <div className="flex flex-col mr-5 ml-5 mt-6">
                    <h1 className="nomeProduto truncate">{nome}</h1>
                    <div className="flex justify-between items-center mt-2">
                        <h2>R$ {preco}</h2>
                        <button className="flex items-center justify-center rounded-xl p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer" onClick={(e) => {e.preventDefault(); e.stopPropagation(); addProduto(id)}}>
                            Comprar
                            <LuShoppingCart color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduto