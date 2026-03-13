import { useNavigate } from "react-router";
import Header from "../components/hearders/Header"
import { FaRegCircleUser } from "react-icons/fa6";
import { logout } from "../services/authService"
import { message } from "antd";
import { Link } from "react-router-dom";
import { getMe } from "../services/authService";
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import { useCarrinho } from "../contexts/CarrinhoContext";

export default function Perfil() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const roleUser = localStorage.getItem('role');
    const { clearCarrinho } = useCarrinho();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        message.success("Logout realizado.")
        clearCarrinho();
        navigate('/home');
    }
    
    useEffect(() => {
        const carregaPerfil = async () => {
            try {
                const info = await getMe();
                setDados(info);
            } catch (err) {
                message.error("Não foi possível carregar o perfil.");
                navigate('/home');
            } finally {
                setCarregando(false);
            }
        }

        carregaPerfil();
    }, []);

    if (carregando) {
        return(
            <div>
                {roleUser === "CLIENTE" ? <Header/> : <HeaderVendedor/>}
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl justify-center items-center text-[#5494D2]">
                        <LoadingOutlined style={{ fontSize: 60 }}/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            {roleUser === "CLIENTE" ? <Header/> : <HeaderVendedor/>}
            <div className="flex justify-center mt-9">
                <div className="flex flex-col bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl items-center justify-center font-bold text-xl text-white">
                    <div className="flex flex-col w-1/2 space-y-5 items-center justify-center">
                        <h1 className="text-[#5494D2] font-bold text-3xl capitalize">Tipo conta: {roleUser.toLowerCase()}</h1>
                        <FaRegCircleUser size={200} color="#5494D2"/>
                        <h2 className="text-[#5494D2] font-bold text-3xl">{dados.nome}</h2>
                        {roleUser === "CLIENTE" ? 
                            <div className="space-y-5">
                                <Link to={"/meus-pedidos"} className="flex bg-[#5494D2] border-[#979797] rounded-xl border-1 w-[400px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                                    Acompanhar Pedidos
                                </Link>
                                <Link to={"/endereco"} className="flex bg-[#5494D2] border-[#979797] rounded-xl border-1 w-[400px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                                    Endereço
                                </Link>
                            </div>
                            :
                            <Link to={"/minhas-vendas"} className="flex bg-[#5494D2] border-[#979797] rounded-xl border-1 w-[400px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                                Minhas Vendas
                            </Link>
                        }
                        <Link to={"/editar-conta"} className="flex bg-[#5494D2] border-[#979797] rounded-xl border-1 w-[400px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                            Editar Conta
                        </Link>
                        <button onClick={handleLogout} className="flex items-center justify-center border-1 border-[#979797] w-[400px] h-[50px] bg-[#F174A7] hover:bg-[#d26e97] rounded-xl  font-bold">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}