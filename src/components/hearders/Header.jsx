
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import Imagem from '/logo.png'
import { isLogged } from "../../services/authService";

export default function Header() {
    const navigate = useNavigate();

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
        <div className='flex items-center bg-[#5494D2] w-screen h-[15vh] shadow-2xl'>
            <div className='flex items-center bg-[#FFFFFF] w-full min-h-[7vh]'>
                <Link to="/home"><img src={Imagem} className='w-[20vh] h-[5vh] ml-4 cursor-pointer'></img></Link>
                <div className="flex justify-between mx-auto items-center border-2 p-2 rounded-2xl w-[70vh]">
                    <input className="outline-none text-xl w-full" placeholder="Pesquisar em CompIA..."></input>
                    <LuSearch size={30}/>
                </div>
                <div className="flex mr-4 cursor-pointer space-x-4">
                    <button onClick={handlePerfil}><LuUser size={40}/></button>
                    <Link to="/carrinho"><LuShoppingCart size={40}/></Link>
                </div>
            </div>
        </div>
    )

}