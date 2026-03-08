import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom"
import { CiImageOff } from "react-icons/ci";

const CardProdutoCarrinho = ({produto, onRemove}) => {
    const { id, nome, preco, imagem} = produto || {};

    const handleRemover = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        if (onRemove) {
            onRemove();
        }
    };

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
                        <button className="flex items-center w-[33px] justify-center rounded-full p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer" onClick={handleRemover}>
                            X
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProdutoCarrinho