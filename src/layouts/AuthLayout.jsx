import ImagemLogin from '/imagemLogin.png'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router';

export default function LayoutAuth ({ children }) {

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <div className="w-[90%] min-h-[500px] md:w-[1165px] md:h-[730px] fundoLogin flex bg-[#5494D2] rounded-4xl shadow-2xl overflow-hidden">
                <div className="hidden md:flex fundoImagem bg-[#FFFFFF] w-1/2">
                    <img src={ImagemLogin} className="imagemLogin object-cover w-full h-full" alt="Login"></img>
                </div>
                    <div className='relative flex flex-col w-full md:flex-1 items-center justify-center py-10'>
                        
                        <div className='w-full flex justify-start px-8 mb-4 md:absolute md:top-7 md:left-7 md:mb-0'>
                            <Link to={"/home"}>
                                <div className='flex items-center justify-center bg-[#F174A7] w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-xl border-2 border-white'>
                                    <IoIosArrowBack size={25} color='white'/>
                                </div>
                            </Link>
                        </div>

                        <div className='w-full flex items-center justify-center'>
                            {children}
                        </div>
                    </div>
            </div>
        </div>
    )
}