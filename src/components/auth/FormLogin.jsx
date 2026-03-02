import { useState } from "react"
import Logo from "/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { message } from "antd";
import { login } from "../../services/authService";

export default function FormLogin() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({ email: '', senha: '' });
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, senha } = usuario;

        if (!email) {
            message.error("Informe o email.");
            return;
        }

        if (!senha) {
            message.error("Informe a senha.");
            return;
        }

        login({ email, senha }).then(() => {
            message.success("Login Realizado!");
            setTimeout(() => {
                navigate("/home");
            }, 800);
        })
        .catch((err) => {
            const erro = err.response?.data;

            if (erro) {
                if (erro.non_field_errors) {
                    message.error("E-mail ou senha incorretos.");
                }
            } else {
                message.error("Erro desconhecido!")
            }
        });
        setUsuario({email: '', senha: ''})
    }

    return(
        <form className='formLogin flex flex-col items-center bg-[#FFFFFF] min-w-[370px] min-h-[400px] rounded-4xl border-2 border-[#979797] shadow-2xl' onSubmit={handleSubmit}>
            <img src={Logo} className='logo w-40 h-10 mt-7'></img>
            <div className='text-[#314C91] flex flex-col items-center mt-5 space-y-4'>
                <h1 className='font-bold text-2xl w-[235px] text-left'>Entrar</h1>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='E-mail' type='email' value={usuario.email} onChange={e => setUsuario({...usuario, email: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Senha' type='password' value={usuario.senha} onChange={e => setUsuario({...usuario, senha: e.target.value})} ></input>
                <button className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                    <p className='text-white'>Entrar</p>
                </button>
                <h2 className='font-bold'>Não tem uma conta? <Link to={'/cadastro'} className='underline hover:text-[#F174A7] cursor-pointer'>Cadastre-se</Link></h2>
            </div>
        </form>
    )
}