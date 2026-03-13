import Header from "../components/hearders/Header"
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import imagem from "/mapa.png"
import { buscaCep, cadastrarEndereco, enderecoUser } from "../services/enderecoService";
import { useEffect, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";

export default function Endereco() {
    const navigate = useNavigate();
    const roleUser = localStorage.getItem('role');

    const [endereco, setEndereco] = useState({
        rua : '',
        numero : '',
        complemento : '',
        bairro : '',
        cidade : '',
        estado : '',
        cep : '',
    })

    useEffect(() => {
        const carregaEndereco = async ()  => {
            const end = await enderecoUser();

            if(end) {
                setEndereco(end);
            }
        }

        carregaEndereco();
    }, [])

    const handleCep = async (entrada) => {
        const formatadoCep = entrada.replace(/\D/g, '');
        
        if (formatadoCep.length >= 8) {
            const end = await buscaCep(formatadoCep)
            
            setEndereco({...endereco, 
                rua: end.logradouro,
                bairro: end.bairro,
                cidade: end.localidade,
                estado: end.uf,
                cep: formatadoCep,
            });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const {rua, numero, bairro, cidade, estado, complemento, cep} = endereco;

        if (!rua || !numero || !bairro || !cidade || !estado || !cep) {
            message.error("Preencha todos os campos.")
            return;
        }

        try {
            await cadastrarEndereco({rua, numero, bairro, cidade, estado, complemento, cep});
            message.success("Endereço salvo com sucesso!");

            navigate("/perfil");
        } catch (err) {
            message.error("Erro ao salvar endereço.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEndereco(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div>
            {roleUser === "CLIENTE" ? <Header/> : <HeaderVendedor/>}
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex flex-col w-1/2 justify-center items-center space-y-3">
                        <p className="text-white font-bold text-xl">Endereço</p>
                        <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10 rounded-xl items-center justify-center space-y-2">
                            <input name="cep" value={endereco.cep} className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='CEP' onChange={(e) => { handleChange(e); handleCep(e.target.value); }}></input>
                            <input name="estado" value={endereco.estado} id="es" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Estado' onChange={handleChange}></input>
                            <input name="cidade" value={endereco.cidade} id="cd" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Cidade' onChange={handleChange}></input>
                            <input name="bairro" value={endereco.bairro} id="br" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Bairro' onChange={handleChange}></input>
                            <input name="rua" value={endereco.rua} id="rua" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Rua' onChange={handleChange}></input>
                            <input name="numero" value={endereco.numero} id="numero" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Número'  onChange={handleChange}></input>
                            <input name="complemento" value={endereco.complemento} id="complemento" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Complemento'  onChange={handleChange}></input>
                            <button type="submit" className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                                <p className='text-white'>Salvar</p>
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-1 bg-white  rounded-r-xl items-center">
                        <img src={imagem}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}