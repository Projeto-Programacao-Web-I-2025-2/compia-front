import { calcularFrete, enderecoUser } from "../../services/enderecoService";
import { useEffect, useState } from "react";

const FreteCard = ({ pacote, onEnviar }) => { 
    const [fretes, setFretes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [temEndereco, setTemEndereco] = useState(true);

    useEffect(() => {
        const carregarFretes = async () => {
            setLoading(true);
            try {
                const endereco = await enderecoUser();
                
                if (!endereco || !endereco.cep) {
                    setTemEndereco(false);
                    setLoading(false);
                    return;
                }

                setTemEndereco(true);

                const body = {
                    to: { postal_code: endereco.cep }, 
                    package: {
                        height: pacote?.height  || 10,
                        width: pacote?.width || 10,
                        length: pacote?.length || 10,
                        weight: pacote?.weight || 1,
                    }
                };

                const fretesCalculados = await calcularFrete(body);
                setFretes(fretesCalculados);
            } catch (error) {
                console.error("Erro ao carregar fretes:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarFretes();
    }, [pacote]);
    if (!temEndereco) {
        return (
            <div className="font-bold text-2xl text-white">
                Cadastre o endereço para calcular o frete.
            </div>
        );
    }

    if (loading) return <div className="font-bold text-2xl text-white" >Calculando frete...</div>;
    if (!fretes || fretes.length === 0) return <div className="font-bold text-2xl text-white" >Nenhuma opção de frete disponível.</div>;

    return (
        <div className="flex flex-col items-center">
            <div className="font-bold text-xl text-white mb-4">
                Opções de frete:
            </div>

            <div className="flex flex-col gap-4 overflow-x-auto p-5 bg-white rounded-lg shadow-md font-bold items-center max-h-[200px]">
            {fretes
                    .filter((frete) => frete.price && !frete.error)
                    .map((frete) => (
                        <button
                            key={frete.id || frete.name} 
                            className="border border-[#979797] bg-white rounded-lg p-1 min-w-[400px] flex items-center shadow-sm justify-between cursor-pointer hover:bg-gray-100"
                            onClick={() => onEnviar(Number(frete.price).toFixed(2))}
                        >
                            <div className="flex space-x-2 items-center mr-4">
                                <img 
                                    src={frete.company.picture}
                                    alt={frete.company.name}
                                    className="w-12 h-12 object-contain mb-2 h-[70px] w-[70px]"
                                />
                                <div className="font-semibold text-sm ">{frete.name}</div>
                            </div>
                            
                            <div>
                                <div className="text-[#2d8f2d] font-bold">
                                    R$ {Number(frete.price).toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500">{frete.delivery_range?.max} dias úteis</div>
                            </div>
                        </button>
                    ))
                }
                <button onClick={() => onEnviar(0)} className="border border-[#979797] bg-white rounded-lg p-7 min-w-[400px] flex items-center shadow-sm justify-between cursor-pointer hover:bg-gray-100">
                    <div className="font-semibold text-sm">Retirar na loja</div>
                    <div className="text-[#2d8f2d] font-bold">Grátis</div>        
                </button>
            </div>
        </div>
    );
};

export default FreteCard;
