import CardPedido from "../components/cards/CardPedido";
import CardProdutoPedido from "../components/cards/CardProdutoPedido";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from "../components/hearders/Header"
import { getMeusPedidos } from "../services/pedidoService";
import { getProdutoById } from "../services/produtoService";
import { useState, useEffect } from "react";

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [produtosDetalhes, setProdutosDetalhes] = useState([]);
    
    useEffect(() => {
        const carregaPedidos = async () => {
            try {
                const pedidosCliente = await getMeusPedidos();
                if (Array.isArray(pedidosCliente)) {
                    setPedidos(pedidosCliente);
                } else {
                    setPedidos([]);
                }
            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
                setPedidos([]);
            }
        }
        carregaPedidos();
    }, [])

    const handleDetalhar = async (pedido) => {
        setSelectedPedido(pedido);
        if (pedido.itens && Array.isArray(pedido.itens)) {
            const produtos = await Promise.all(
                pedido.itens.map(async (item) => {
                    const produto = await getProdutoById({ id: item.produto });
                    return { ...produto, quantidade: item.quantidade };
                })
            );
            setProdutosDetalhes(produtos);
        } else {
            setProdutosDetalhes([]);
        }
    }

    const detalhar = (status) => {
        const niveis = {
            "PAGAMENTO_CONFIRMADO": 1,
            "ENVIADO": 2,
            "ENTREGUE": 3
        };

        const etapas = [
            { id: 1, label: "Pagamento Confirmado", icon: <MdOutlinePayments size={60} color="white"/> },
            { id: 2, label: "Enviado", icon: <TbTruckDelivery size={60} color="white"/> },
            { id: 3, label: "Entregue", icon: <IoMdCheckmarkCircleOutline size={60} color="white"/> },
        ];

        const nivelAtual = niveis[status] || 0;

        return (
            <div className="flex flex-col items-center space-y-10 text-[#5494D2] font-bold">
                <h1 className="text-4xl">Detalhes do Pedido: {selectedPedido?.id}</h1>
                <div className="flex space-x-10">
                    {etapas.map((etapa) => (
                        <div key={etapa.id} className="flex flex-col items-center space-y-5">
                            <div className={`flex w-[150px] h-[150px] rounded-full items-center justify-center 
                                ${nivelAtual >= etapa.id ? "bg-[#6dcf87]" : "bg-[#c7c7c7]"}`}>
                                {etapa.icon}
                            </div>
                            <p>{etapa.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#FFFFFF] w-[1365px] h-[730px] rounded-xl shadow-2xl">
                    <div className="flex w-1/2 rounded-l-xl bg-[#5494D2] justify-center items-center">
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center">
                            {pedidos.map(pd => (
                                <div key={pd.id} className="flex-shrink-0">
                                    <CardPedido pedido={pd} onDetalhar={handleDetalhar}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="detalhes flex flex-col flex-1 justify-center items-center space-y-10">
                        {selectedPedido ? detalhar(selectedPedido.status) : <p className="text-[#5494D2] font-bold text-2xl">Selecione um pedido para ver os detalhes</p>}
                        {selectedPedido ?
                            <div className="space-y-5">
                                <div className="flex space-x-5 items-center justify-center">
                                    <p>Sub-total: {(selectedPedido.total - selectedPedido.frete).toFixed(2)}</p>
                                    <p>Frete: {selectedPedido.frete ? selectedPedido.frete : (0).toFixed(2)}</p>
                                    <p>Total: {selectedPedido.total}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center ">
                                    Produtos:
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