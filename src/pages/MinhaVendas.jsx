import CardVenda from "../components/cards/CardVenda";
import CardProdutoPedido from "../components/cards/CardProdutoPedido";
import { getProdutoById } from "../services/produtoService";
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import { getVendas } from "../services/vendasService";
import { useState, useEffect } from "react";
import { getClienteById } from "../services/userService";

export default function MinhasVendas() {
    const [vendas, setVendas] = useState([]);
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

    if(vendas.length === 0 || !vendas) {
        return(
            <div>
                <HeaderVendedor/>
                <div className="flex justify-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl justify-end">
                        <div className="flex w-1/2 bg-white roundel-xl items-center justify-center font-bold text-2xl text-[#5494D2]">
                            <p>Não há pedidos!</p>
                        </div>
                    </div>
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
            <HeaderVendedor/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex w-1/2 rounded-l-xl bg-[#5494D2] justify-center items-center">
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center">
                            {vendas.map(venda => (
                                <div key={venda.id} className="flex-shrink-0">
                                    <CardVenda venda={venda} onDetalhar={handleDetalhar}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="detalhes flex flex-col flex-1 justify-center items-center space-y-10">
                        {!selectedVenda ? <p className="text-[#5494D2] font-bold text-2xl">Selecione uma venda para ver os detalhes</p> : <></>}
                        {selectedVenda ?
                            <div className="flex flex-col space-y-5 justify-center items-center">
                                <p className="text-[#5494D2] font-bold text-2xl">Detalhes da Venda: {selectedVenda.id}</p>
                                <div className="flex space-x-5 items-center justify-center">
                                    <p>Data da Venda: {formataData(selectedVenda.data_venda)}</p>
                                    <p>Total: {selectedVenda.valor_total}</p>
                                </div>
                                {clientePedido ? 
                                    detalhesCliente(clientePedido)
                                    : <p>Carregando informações do cliente...</p>
                                }
                                <div className="flex flex-col justify-center items-center ">
                                    Produtos vendidos:
                                    <div className="flex flex-col h-[300px] space-y-5 overflow-y-auto items-center ">
                                        {produtosDetalhes.map(pd => (
                                            <div key={pd.id} className="flex-shrink-0">
                                                <CardProdutoPedido key={pd.id} produto={{...pd, estoque: pd.quantidade}}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> : <></>
                        }   
                    </div>
                </div>
            </div>
        </div>
    )
}