
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import Imagem from '/logo.png'
import { isLogged } from "../../services/authService";
import { useCarrinho } from "../../contexts/CarrinhoContext";

export default function Header() {
    const navigate = useNavigate();
    const { carrinhoIds } = useCarrinho();

    const handlePerfil = async () => {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            navigate('/login');
            return;
        }

        const user = await isLogged();

        if (user) {
            navigate('/perfil');
        } else {
            navigate('/login');
        }
    };

    return(
        <div className='flex items-center bg-[#5494D2] w-screen h-[100px] shadow-2xl'>
            <div className='flex items-center bg-[#FFFFFF] w-full h-[50px] justify-between'>
                <Link to="/home"><img src={Imagem} className='w-[160px] h-[40px] ml-4 cursor-pointer'></img></Link>
                <div className="flex justify-between  items-center border-2 border-[#979797] p-2 rounded-2xl w-[600px] h-[40px]">
                    <input className="outline-none text-lg w-full" placeholder="Pesquisar em CompIA..."></input>
                    <LuSearch size={30} className="hover:bg-[#979797] rounded-xl "/>
                </div>
                <div className="flex mr-4 cursor-pointer space-x-4">
                    <button onClick={handlePerfil}><LuUser size={35}/></button>
                    <Link to="/carrinho" className="flex">
                        <LuShoppingCart size={35}/>
                        <div className="flex bg-[#F174A7] rounded-full text-white font-bold text-sm w-[20px] h-[20px] items-center justify-center">
                            {carrinhoIds.length}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )

}