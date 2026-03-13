import Header from "../components/hearders/Header"
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import imagem from "/mapa.png"
import { buscaCep, cadastrarEndereco, enderecoUser } from "../services/enderecoService";
import { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { getMe } from "../services/authService";
import { atualizarUsuario, atualizarSenha  } from "../services/userService";

export default function EditarConta() {
    const navigate = useNavigate();
    const roleUser = localStorage.getItem('role');

    const [usuario, setUsuario] = useState({
        nome : '',
        email : '',
    })
    const [senha, setSenha] = useState({
        senhaAtual : '',
        novaSenha : '',
        confirmaSenha : '',
    })

    useEffect(() => {
        const carregarUsuario = async ()  => {
            const user = await getMe();

            if(user) {
                setUsuario(user);
            }
        }

        carregarUsuario();
    }, [])

    const handleSubmitSenha = async(e) => {
        e.preventDefault();

        const {senhaAtual, novaSenha, confirmaSenha} = senha;

        if (!senhaAtual || !novaSenha || !confirmaSenha) {
            message.error("Preencha todos os campos.")
            return;
        }

        if(novaSenha !== confirmaSenha) {
            message.error("A nova senha e a confirmação devem ser iguais.")
            return;
        }

        try {
            await atualizarSenha({senhaAtual, novaSenha});
            message.success("Senha atualizada com sucesso!");

            navigate("/perfil");
        } catch (err) {
        }
    }

    const handleSubmitNome = async(e) => {
        e.preventDefault();

        const {nome, email} = usuario;

        if (!nome || !email) {
            message.error("Preencha todos os campos.")
            return;
        }

        try {
            await atualizarUsuario({nome});
            message.success("Dados atualizados com sucesso!");

            navigate("/perfil");
        } catch (err) {
            message.error("Erro ao atualizar dados.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div>
            {roleUser === "CLIENTE" ? <Header/> : <HeaderVendedor/>}
            <div className="flex justify-center mt-9">
                <div className="flex flex-col space-y-3 bg-[#5494D2] w-[410px] h-[650px] md:w-[1165px] md:h-[730px] rounded-xl shadow-2xl justify-center items-center">
                    <div className="flex flex-col justify-center items-center space-y-3">
                        <p className="text-white font-bold text-xl">Nome do usuário</p>
                        <form onSubmit={handleSubmitNome} className="flex flex-col bg-white p-10 rounded-xl items-center justify-center space-y-2">
                            <input name="nome" value={usuario.nome} className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Nome' onChange={(e) => { handleChange(e);}}></input>
                            
                            <button type="submit" className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                                <p className='text-white'>Salvar</p>
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-3">
                        <p className="text-white font-bold text-xl">Alterar senha</p>
                        <form onSubmit={handleSubmitSenha} className="flex flex-col bg-white p-10 rounded-xl items-center justify-center space-y-2">
                            <input type="password" name="senhaAtual" value={senha.senhaAtual} className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Senha atual' onChange={(e) => setSenha({...senha, senhaAtual: e.target.value})}></input>
                            <input type="password" name="novaSenha" value={senha.novaSenha} className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Nova senha' onChange={(e) => setSenha({...senha, novaSenha: e.target.value})}></input>
                            <input type="password" name="confirmaSenha" value={senha.confirmaSenha} className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Confirmar nova senha' onChange={(e) => setSenha({...senha, confirmaSenha: e.target.value})}></input>
                            <button type="submit" className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                                <p className='text-white'>Salvar</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}