import Header from "../components/hearders/Header"
import imagem from "/mapa.png"
import { buscaCep } from "../services/enderecoService";

export default function Endereco() {
    const handleCep = async (entrada) => {
        const formatadoCep = entrada.replace(/\D/g, '');
        
        if (formatadoCep.length >= 8) {
            const end = await buscaCep(formatadoCep)
            
            document.getElementById("es").value=(end.estado);
            document.getElementById("cd").value=(end.localidade);
            document.getElementById("br").value=(end.bairro);
            document.getElementById("rua").value=(end.logradouro);
        }
    }

    return(
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex w-1/2 justify-center items-center">
                        <form className="flex flex-col bg-white p-10 rounded-xl items-center justify-center space-y-2">
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Nome Completo' onChange={() => {}}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='CPF' onChange={() => {}}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Celular' onChange={() => {}}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='CEP' onChange={(e) => handleCep(e.target.value)}></input>
                            <input id="es" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Estado' ></input>
                            <input id="cd" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Cidade'></input>
                            <input id="br" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Bairro'></input>
                            <input id="rua" className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Rua'></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Número'  onChange={() => {}}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-[235px]' placeholder='Complemento'  onChange={() => {}}></input>
                            <button className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                                <p className='text-white'>Salvar</p>
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-1 bg-white rounded-r-xl items-center">
                        <img src={imagem}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}