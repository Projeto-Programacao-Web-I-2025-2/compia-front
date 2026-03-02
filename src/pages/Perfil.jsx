import { useNavigate } from "react-router";
import Header from "../components/hearders/Header"
import { logout } from "../services/authService"
import { message } from "antd";

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
                <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl items-center justify-center">
                <button onClick={handleLogout} className="flex items-center border-1 border-[#FFFFFF] bg-[#314C91] hover:bg-[#1d2d57] rounded-xl p-2 text-xl">
                    Logout
                </button>
                </div>
            </div>
        </div>
    )
}