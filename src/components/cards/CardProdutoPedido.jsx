import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom"
import { CiImageOff } from "react-icons/ci";

const CardProdutoPedido = ({produto}) => {
    const { id, nome, preco, imagem , estoque} = produto || {};

    return(
        <Link to={`/produto/${id}`}>
            <div className="flex bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[610px] h-[120px] shadow-xl hover:bg-[#f5f5f5]">
                <div className="flex fundoImagemProduto bg-[#E5E5E5] w-[100px] h-[100px] ml-3 mt-2 items-center justify-center">
                    {imagem ? <img src={imagem} className="object-contain w-[100px] h-[100px]"></img> : <CiImageOff size={70}/>}
                </div>
                <div className="flex flex-1 flex-col mr-5 ml-5 mt-6">
                    <h1 className="nomeProduto line-clamp-1">{nome}</h1>
                    <div className="flex justify-between items-center mt-2">
                        <h2>R$ {preco}</h2>
                        <div className="flex space-x-2">
                            <p>Quantidade: {estoque}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProdutoPedido