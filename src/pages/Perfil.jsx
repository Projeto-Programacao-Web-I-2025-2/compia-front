import { useNavigate } from "react-router";
import Header from "../components/hearders/Header"
import { FaRegCircleUser } from "react-icons/fa6";
import { logout } from "../services/authService"
import { message } from "antd";
import { Link } from "react-router-dom";

export default function Perfil() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        message.success("Logout realizado.")
        navigate('/home');
    }

    return(
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex flex-col w-1/2 space-y-5 items-center justify-center">
                        <FaRegCircleUser size={200} color="white"/>
                        <h2 className="text-white font-bold text-3xl">Kaio </h2>
                        <button onClick={handleLogout} className="flex items-center justify-center border-1 border-[#FFFFFF] w-[200px] bg-[#F174A7] hover:bg-[#d26e97] rounded-xl p-1 text-xl text-white font-bold">
                            Logout
                        </button>
                    </div>
                    <div className="flex flex-1 flex-col space-y-5 items-center justify-center text-white font-bold text-xl bg-[#FFFFFF] rounded-r-xl">
                        <div className="flex bg-[#5494D2] border-[#979797] rounded-lg border-1 w-[620px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                            Acompanhar Pedidos
                        </div>
                        <Link to={"/endereco"} className="flex bg-[#5494D2] border-[#979797] rounded-lg border-1 w-[620px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                            Endereço / Informações
                        </Link>
                        <Link to={"/anunciar"} className="flex bg-[#5494D2] border-[#979797] rounded-lg border-1 w-[620px] h-[50px] shadow-xl hover:bg-[#31567A] items-center justify-center">
                            Anunciar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}