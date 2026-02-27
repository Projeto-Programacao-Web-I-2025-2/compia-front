import Logo from "/logo.png"
import { Link } from "react-router-dom"

export default function FormLogin() {
    return(
        <div className='formLogin flex flex-col items-center bg-[#FFFFFF] w-[40vh] h-[45vh] rounded-4xl border-2 border-[#979797] shadow-2xl'>
            <img src={Logo} className='logo w-40 h-10 mt-7'></img>
            <div className='text-[#314C91] flex flex-col items-center mt-5 space-y-4'>
                <h1 className='font-bold text-2xl w-[25vh] text-left'>Entrar</h1>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[25vh]' placeholder='E-mail' type='email'></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[25vh]' placeholder='Senha' type='password'></input>
                <button className='flex justify-center items-center bg-[#F174A7] w-[25vh] h-[4vh] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer' onClick={''}>
                    <p className='text-white'>Entrar</p>
                </button>
                <h2 className='font-bold'>Não tem uma conta? <Link to={'/cadastro'} className='underline hover:text-[#F174A7] cursor-pointer'>Cadastre-se</Link></h2>
            </div>
        </div>
    )
}