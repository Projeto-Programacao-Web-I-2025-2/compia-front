import Logo from "/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { message } from "antd";
import { register, login } from "../../services/authService";

export default function FormCadastro() {
    const navigate = useNavigate();

    const [usuario, setUsuario ] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: 'CLIENTE',
    });

    const handleChange = (e) => {
        setUsuario({...usuario, role: e.target.checked ? "VENDEDOR" : "CLIENTE"})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { nome, email, senha, confirmarSenha, role} = usuario;

        if (!nome || !email || !senha || !confirmarSenha) {
            message.error("Por favor, preencha todos os campos.");
            return;
        }

        if (senha != confirmarSenha) {
            message.error("As senhas não coincidem.");
            setUsuario({...usuario, senha: '', confirmarSenha: '' });            
            return;
        }

        try {
            await register({nome, email, senha, role});

            await login ({email, senha});

            message.success("Conta criada com sucesso!")

            navigate('/home')

        } catch (err) {
            const erros = err.response?.data;
            
            if (erros) {
               const listaDeErros = Object.keys(erros).map((campo) => {
                    return `${erros[campo].join("; ")}`;
                });

                const mensagemFinal = listaDeErros.join(" | ");
        
                message.error(mensagemFinal);
            } else {
                message.error("Erro desconhecido ao cadastrar.");
            }
        }

        setUsuario({ nome: '', email: '', senha: '', confirmarSenha: '', role: 'CLIENTE' });
    }    

    return( 
        <form className='formLogin flex flex-col items-center bg-[#FFFFFF] w-[300px] h-[450px] md:h-[470px] rounded-4xl border-2 border-[#979797] shadow-2xl' onSubmit={handleSubmit}>
            <img src={Logo} className='logo w-32 h-8 sm:w-36 sm:h-9 md:w-40 md:h-10 mt-7'></img>
            <div className='text-[#314C91] flex flex-col items-center mt-5 space-y-4'>
                <h1 className='font-bold text-xl sm:text-2xl w-[200px] w-[200px] md:w-[235px] text-left'>Cadastrar</h1>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[200px] md:w-[235px]' placeholder='Nome' type='text' value={usuario.nome} onChange={e => setUsuario({...usuario, nome: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[200px] md:w-[235px]' placeholder='E-mail' type='email' value={usuario.email} onChange={e => setUsuario({...usuario, email: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[200px] md:w-[235px]' placeholder='Senha' type='password' value={usuario.senha} onChange={e => setUsuario({...usuario, senha: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-[200px] md:w-[235px]' placeholder='Confirmar Senha' type='password' value={usuario.confirmarSenha} onChange={e => setUsuario({...usuario, confirmarSenha: e.target.value})}></input>
                <div className="flex">
                    <input type='checkbox' onChange={handleChange} checked={usuario.role === "VENDEDOR"}></input>
                    <p className="ml-2 text-sm sm:text-base">Conta vendedor</p>
                </div>
                <button className='flex justify-center items-center bg-[#F174A7] w-[200px] md:w-[235px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                    <p className='text-white'>Cadastrar</p>
                </button>
                <h2 className='font-bold text-sm md-text-md'>Já tem uma conta? <Link to={'/login'} className='underline hover:text-[#F174A7] cursor-pointer'>Entre</Link></h2>
            </div>
        </form>
    )
}