import CardPedido from "../components/cards/CardPedido";
import CardProdutoPedido from "../components/cards/CardProdutoPedido";
import { MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Header from "../components/hearders/Header"
import { getMeusPedidos } from "../services/pedidoService";
import { getProdutoById } from "../services/produtoService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LoadingOutlined } from '@ant-design/icons';

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState(null);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [produtosDetalhes, setProdutosDetalhes] = useState([]);
    const navig = useNavigate();
    
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

    if(!pedidos) {
        return(
            <div className="flex flex-col min-h-screen">
                <Header/>
                <div className="flex flex-grow mx-auto my-auto items-center justify-center  text-[#5494D2]"> 
                    <LoadingOutlined style={{ fontSize: 60 }}/>
                </div> 
            </div>
        )
    }

    if (pedidos.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <div className="flex flex-grow my-auto items-center justify-center  text-[#5494D2]"> 
                    <p className="text-3xl font-bold">Nenhum pedido realizado ainda!</p>
                </div> 
            </div>
        )
    }


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
            "CONFIRMADO": 1,
            "ENVIADO": 2,
            "ENTREGUE": 3
        };

        const etapas = [
            { id: 1, label: "Confirmado", icon: <MdOutlinePayments size={60} color="white"/> },
            { id: 2, label: "Enviado", icon: <TbTruckDelivery size={60} color="white"/> },
            { id: 3, label: "Entregue", icon: <IoMdCheckmarkCircleOutline size={60} color="white"/> },
        ];

        const nivelAtual = niveis[status] || 0;

        return (
            <div className="flex flex-col items-center space-y-10 text-[#5494D2] font-bold">
                <h1 className="text-xl md:text-4xl">Detalhes do Pedido: {selectedPedido?.id}</h1>
                <div className="flex space-x-10">
                    {etapas.map((etapa) => (
                        <div key={etapa.id} className="flex flex-col items-center space-y-5">
                            <div className={`flex w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full items-center justify-center 
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
                <div className="flex flex-col md:flex-row bg-[#FFFFFF] w-[410px] min-h-[650px] md:w-[1165px] rounded-xl shadow-2xl">
                    <div className={`${selectedPedido ? "hidden" : "flex"} flex-col md:flex rounded-xl md:rounded-l-xl md:rounded-r-none md:w-1/2 bg-[#5494D2] justify-center items-center p-4`}>
                    
                        <p className="text-white mt-5">Meus Pedidos:</p> 
                        <div className="flex flex-col h-[670px] space-y-5 overflow-y-auto items-center">
                            
                            {pedidos.map(pd => (
                                <div key={pd.id} className="flex-shrink-0">
                                    <CardPedido pedido={pd} onDetalhar={handleDetalhar}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="detalhes flex flex-col flex-1 justify-center items-center space-y-10">
                        <div className={`${selectedPedido ? "flex" : "hidden md:flex"} flex-1 flex-col justify-start md:justify-center items-center p-5 relative`}>
                            {selectedPedido && (
                                <button 
                                    onClick={() => setSelectedPedido(null)} 
                                    className="md:hidden absolute top-4 right-4 text-[#5494D2] text-3xl font-bold p-2"
                                >
                                    ✕
                                </button>
                            )}

                            {selectedPedido ? (
                                <div className="w-full flex flex-col items-center space-y-6">
                                    {detalhar(selectedPedido.status)}
                                    <div className="flex flex-wrap gap-4 items-center justify-center font-bold text-[#5494D2]">
                                        <p>Sub-total: {(selectedPedido.total - (selectedPedido.frete || 0)).toFixed(2)}</p>
                                        <p>Frete: {Number(selectedPedido.frete || 0).toFixed(2)}</p>
                                        <p className="text-xl">Total: {selectedPedido.total}</p>
                                    </div>
                                    <div className="w-full flex flex-col items-center">
                                        <p className="font-bold text-[#5494D2] mb-2">Produtos:</p>
                                        <div className="flex flex-col h-[250px] w-full space-y-4 overflow-y-auto items-center bg-gray-50 rounded-lg p-2">
                                            {produtosDetalhes.map(pd => (
                                                <CardProdutoPedido key={pd.id} produto={{...pd, estoque: pd.quantidade}}/>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedPedido.status === "ABERTO" && (
                                        <button 
                                            className='bg-[#F174A7] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#d26e97]'
                                            onClick={() => navig("/checkout/" + selectedPedido.id)}
                                        >
                                            Pagar Pedido
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <p className="hidden md:block text-[#5494D2] font-bold text-2xl text-center">
                                    Selecione um pedido para ver os detalhes
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}