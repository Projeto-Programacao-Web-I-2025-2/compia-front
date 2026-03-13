
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import Imagem from '/logo.png'
import { isLogged } from "../../services/authService";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { useState } from "react";
export default function Header({onPesquisar}) {
    const navigate = useNavigate();
    const { carrinhoIds } = useCarrinho();
    const [pesquisa, setPesquisa] = useState("");

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

    const handleSubmit = (e) => {
    e.preventDefault();
    if (pesquisa.trim()) {
        navigate(`/home?search=${encodeURIComponent(pesquisa)}`);
    }
}

    return(
        <div className='flex items-center bg-[#5494D2] w-full h-[100px] shadow-2xl'>
            <div className='flex items-center bg-[#FFFFFF] w-full h-[50px] justify-between'>
                <Link to="/home"><img src={Imagem} className='w-[100px] h-[25px] md:w-[120px] md:h-[30px] lg:w-[160px] lg:h-[40px] ml-4 cursor-pointer'></img></Link>
                <form onSubmit={handleSubmit} className="flex w-[135px] h-[35px] md:w-[300px] lg:w-[600px] lg:h-[40px] xl:w-[600px] xl:h-[40px] justify-between items-center border-2 border-[#979797] p-2 rounded-2xl">
                        <input value={pesquisa} className="outline-none text-lg w-full" placeholder="Pesquisar em CompIA..." onChange={(e) => setPesquisa(e.target.value)} ></input>
                        <button type="submit" className="hover:bg-[#979797] rounded-xl">
                            <LuSearch size={30}/>
                        </button>
                </form>
                <div className="flex mr-4  space-x-4">
                    <button className="cursor-pointer" onClick={handlePerfil}><LuUser size={35}/></button>
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