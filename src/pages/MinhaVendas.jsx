import CardVenda from "../components/cards/CardVenda";
import CardProdutoPedido from "../components/cards/CardProdutoPedido";
import { getProdutoById } from "../services/produtoService";
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import { getVendas } from "../services/vendasService";
import { useState, useEffect } from "react";
import { getClienteById } from "../services/userService";
import { LoadingOutlined } from '@ant-design/icons';

export default function MinhasVendas() {
    const [vendas, setVendas] = useState(null);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [produtosDetalhes, setProdutosDetalhes] = useState([]);
    const [clientePedido, setClientePedido] = useState(null);
        
        useEffect(() => {
            const carregaVendas = async () => {
                try {
                    const vendasCliente = await getVendas();
                    if (Array.isArray(vendasCliente)) {
                        setVendas(vendasCliente);
                    } else {
                        setVendas([]);
                    }
                } catch (error) {
                    console.error('Erro ao carregar vendas:', error);
                    setVendas([]);
                }
            }
            carregaVendas();
        }, [])

    if(!vendas) {
        return(
            <div className="flex flex-col min-h-screen">
                <HeaderVendedor/>
                <div className="flex flex-grow mx-auto my-auto items-center justify-center  text-[#5494D2]"> 
                    <LoadingOutlined style={{ fontSize: 60 }}/>
                </div> 
            </div>
        )
    } 

    if (vendas.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <HeaderVendedor/>
                <div className="flex flex-grow my-auto items-center justify-center  text-[#5494D2]"> 
                    <p className="text-3xl font-bold">Nenhuma venda realizada ainda!</p>
                </div> 
            </div>
        )
    }

    const detalhesCliente =  (infoCliente) => {
        return(
            <div className="space-y-3 text-xl text-[#5494D2] ">
                <p className="font-bold">Informações do cliente:</p>
                <div className="flex space-x-5">
                    <p>Nome do cliente: {infoCliente.nome}</p>
                    <p>Email: {infoCliente.email}</p> 
                </div>
                <div className="flex flex-col justify-center ">
                    {infoCliente.endereco ?
                    <div>
                        <p className="font-bold">Endereço do cliente:</p>
                        <div className="flex flex-col space-y-1 overflow-y-auto ">
                            <div className="flex space-x-5">
                                <p>Rua: {infoCliente.endereco.rua}</p>
                                <p>Número: {infoCliente.endereco.numero}</p>
                                {infoCliente.endereco.complemento ? <p>Complemento: {infoCliente.endereco.complemento}</p> : <></>}
                            </div>
                            <div className="flex space-x-5">
                                <p>Bairro: {infoCliente.endereco.bairro}</p>
                                <p>Cidade: {infoCliente.endereco.cidade}</p>
                                <p>Estado: {infoCliente.endereco.estado}</p>
                            </div>
                            <p>CEP: {infoCliente.endereco.cep}</p>
                        </div>
                    </div>
                    : <p>Venda retirada no local</p>}
                </div>
            </div>
        )
    }



    const handleDetalhar = async (venda) => {
        setSelectedVenda(venda);

        const cliente = await getClienteById(venda.cliente);
        setClientePedido(cliente);

        if (venda.itens && Array.isArray(venda.itens)) {
            const produtos = await Promise.all(
                venda.itens.map(async (item) => {
                    const produto = await getProdutoById({ id: item.produto });
                    return { ...produto, quantidade: item.quantidade };
                })
            );
            setProdutosDetalhes(produtos);
        } else {
            setProdutosDetalhes([]);
        }
    }

    
    const formataData = (data) => {
        if (!data) {
            return("Data indisponível")
        }
        const dataVenda = new Date(data);

        return(dataVenda.toLocaleString('pt-BR'));
    }

    return (
        <div>
            <HeaderVendedor />
            <div className="flex justify-center mt-9">
                <div className="flex flex-col md:flex-row bg-[#FFFFFF] w-[410px] min-h-[650px] md:w-[1165px] h-[730px] rounded-xl shadow-2xl">
                    <div className={`${selectedVenda ? "hidden" : "flex"} flex-col md:flex md:w-1/2 rounded-xl md:rounded-l-xl md:rounded-r-none bg-[#5494D2] justify-center items-center p-4`}>
                        <p className="text-white mb-4 font-bold">Minhas Vendas:</p>
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center w-full">
                            {vendas.map(venda => (
                                <div key={venda.id} className="flex-shrink-0">
                                    <CardVenda venda={venda} onDetalhar={handleDetalhar} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detalhes flex flex-col flex-1 justify-center items-center relative">
                        {selectedVenda && (
                            <button 
                                onClick={() => setSelectedVenda(null)} 
                                className="md:hidden absolute top-4 right-4 text-[#5494D2] text-3xl font-bold p-2"
                            >
                                ✕
                            </button>
                        )}

                        {!selectedVenda ? (
                            <p className="hidden md:block text-[#5494D2] font-bold text-2xl text-center">
                                Selecione uma venda para ver os detalhes
                            </p>
                        ) : (
                            <div className={`${selectedVenda ? "flex" : "hidden md:flex"} flex-col space-y-5 justify-center items-center w-full p-5`}>
                                <p className="text-[#5494D2] font-bold text-2xl text-center">
                                    Detalhes da Venda: {selectedVenda.id}
                                </p>
                                
                                <div className="flex flex-wrap gap-4 items-center justify-center text-[#5494D2]">
                                    <p>Data: {formataData(selectedVenda.data_venda)}</p>
                                    <p className="font-bold">Total: {selectedVenda.valor_total}</p>
                                </div>

                                {clientePedido ? 
                                    detalhesCliente(clientePedido)
                                    : <p>Carregando informações do cliente...</p>
                                }

                                <div className="flex flex-col justify-center items-center w-full">
                                    <p className="font-bold text-[#5494D2] mb-2">Produtos vendidos:</p>
                                    <div className="flex flex-col h-[140px] md:h-[300px] w-full space-y-4 overflow-y-auto items-center bg-gray-50 rounded-lg p-2">
                                        {produtosDetalhes.map(pd => (
                                            <div key={pd.id} className="flex-shrink-0">
                                                <CardProdutoPedido produto={{...pd, estoque: pd.quantidade}} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}