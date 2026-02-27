import ImagemLogin from '/imagemLogin.png'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router';

export default function LayoutAuth ({ children }) {

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <div className="fundoLogin flex bg-[#5494D2] rounded-4xl w-[150vh] min-h-[75vh] shadow-2xl">
                <div className="fundoImagem flex bg-[#FFFFFF] w-1/2 rounded-l-4xl">
                    <img src={ImagemLogin} className="imagemLogin object-cover rounded-l-4xl"></img>
                </div>
                <Link to={"/home"}>
                    <div className='flex items-center justify-center ml-7 mt-7 bg-[#F174A7] w-[50px] h-[50px] rounded-xl border-2 border-white'>
                        <IoIosArrowBack size={30} color='white'/>
                    </div>
                </Link>
                <div className='flex flex-1 items-center justify-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}
