import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom"
import { CiImageOff, CiEdit} from "react-icons/ci";
import { useCarrinho } from "../../contexts/CarrinhoContext";

const CardProduto = ({produto}) => {
    const { id, nome, preco , imagem, estoque, tipo} = produto || {};
    const { addProduto } = useCarrinho();
    const navigate = useNavigate();

    const roleUser = localStorage.getItem('role');

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/editar/${id}`);
    };
 
    return(
        <Link to={`/produto/${id}`}>
            <div className="flex flex-col bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[317px] h-[400px] shadow-xl hover:bg-[#f5f5f5]">
                <div className="fundoImagemProduto flex bg-[#E5E5E5] w-[270px] h-[270px] mx-auto mt-6 items-center justify-center">
                    {imagem ? <img src={imagem} className="object-contain w-[270px] h-[270px]"></img> : <CiImageOff size={70}/>}
                </div>
                <div className="flex flex-col mr-5 ml-5 mt-6">
                    <h1 className="nomeProduto truncate text-sm md:text-md">{nome}</h1>
                    <div className="flex justify-between items-center mt-2">
                        <h2 className="truncate text-sm md:text-md">R$ {preco}</h2>
                        {roleUser === "VENDEDOR" ? 
                            <button className="flex text-sm md:text-md items-center justify-center rounded-xl p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer" onClick={handleEdit}>
                                Editar
                                <CiEdit color="white" size={23}/>
                            </button>
                            :   (estoque > 0 || tipo === "ebook" ?
                                <button className="flex text-sm md:text-md items-center justify-center rounded-xl p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer" onClick={(e) => {e.preventDefault(); e.stopPropagation(); addProduto(id)}}>
                                    Comprar
                                    <LuShoppingCart color="white"/>
                                </button>
                                :
                                <div className="bg-[#F174A7] text-sm md:text-md flex items-center justify-center rounded-xl p-1 border-1 border-[#979797] text-white">
                                    Indisponível
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduto