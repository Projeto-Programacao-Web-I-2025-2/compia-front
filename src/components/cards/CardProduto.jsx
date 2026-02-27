import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom"

const CardProduto = ({produto}) => {
    const { id, nome, preco} = produto || {};

    //substituir depois nome e preco
    return(
        <Link to={`/produto/${id}`}>
            <div className="flex flex-col bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[317px] h-[400px] shadow-xl">
                <div className="fundoImagemProduto bg-[#E5E5E5] w-[270px] h-[270px] mx-auto mt-6"></div>
                <div className="flex flex-col mr-5 ml-5 mt-6">
                    <h1 className="nomeProduto">Nome</h1>
                    <div className="flex justify-between items-center">
                        <h2>R$ Preço</h2>
                        <button className="flex items-center justify-center rounded-xl p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer" onClick={() => {}}>
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