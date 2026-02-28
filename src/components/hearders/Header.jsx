
import { LuSearch, LuUser, LuShoppingCart } from "react-icons/lu";
import { Link } from 'react-router-dom';

import Imagem from '/logo.png'

export default function Header() {
    return(
        <div className='flex items-center bg-[#5494D2] w-screen h-[15vh] shadow-2xl'>
            <div className='flex items-center bg-[#FFFFFF] w-full min-h-[7vh]'>
                <Link to="/home"><img src={Imagem} className='w-[20vh] h-[5vh] ml-4 cursor-pointer'></img></Link>
                <div className="flex justify-between mx-auto items-center border-2 p-2 rounded-2xl w-[70vh]">
                    <input className="outline-none text-xl w-full" placeholder="Pesquisar em CompIA..."></input>
                    <LuSearch size={30}/>
                </div>
                <div className="flex mr-4 cursor-pointer space-x-4">
                    <Link to="/login"><LuUser size={40}/></Link>
                    <LuShoppingCart size={40}/>
                </div>
            </div>
        </div>
    )

}