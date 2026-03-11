
import { LuUser } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Imagem from '/logo.png'

export default function HeaderVendedor() {

    return(
        <div className='flex items-center bg-[#5494D2] w-screen h-[100px] shadow-2xl'>
            <div className='flex items-center bg-[#FFFFFF] w-full h-[50px] justify-between'>
                <Link to="/home"><img src={Imagem} className='w-[160px] h-[40px] ml-4 cursor-pointer'></img></Link>
                <div className="flex mr-4 space-x-4 items-center">
                    <Link to="/anunciar" className="flex border-3 rounded-xl p-1 space-x-1 font-bold hover:bg-[#c5c5c5] cursor-pointer">
                        <p>Anunciar</p>
                        <FaPlus size={20}/>
                    </Link>
                    <Link to="/perfil" className="cursor-pointer"><LuUser size={37}/></Link>
                </div>
            </div>  
        </div>
    )
}