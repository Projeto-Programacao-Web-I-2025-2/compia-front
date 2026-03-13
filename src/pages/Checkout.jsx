
import CardProdutoPedido from "../components/cards/CardProdutoPedido"
import Header from "../components/hearders/Header"
import { useNavigate, useParams } from "react-router"
import { useState, useEffect } from "react"
import { getPedidoById, atualizaFretePedido } from "../services/pedidoService"
import { getProdutoById } from "../services/produtoService"
import FreteCard from "../components/utils/FreteCard"

export default function Checkout() {
    const id = useParams();
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [produtosDetalhes, setProdutosDetalhes] = useState([]);
    const navigate = useNavigate();
    const [valorFrete, setValorFrete] = useState(0);

    useEffect(() => {
        const carregaPedido = async () => {
            const pedido = await getPedidoById(id);
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
        };

        carregaPedido();
    }, [id.id]);

    const handleFreteCalculado = (valor) => {
        setValorFrete(Number(valor));
    };

    if (!selectedPedido) {
        return (
            <div>
                <Header/>
                <div className="flex justify-center items-center mt-9">
                    <div className="flex bg-[#5494D2] w-[1165px] h-[730px] rounded-xl shadow-2xl items-center justify-center font-bold text-xl text-white ">
                        Carregando pedido...
                    </div>
                </div>
            </div>
        )
    }

    const handleIrParaPagamento = async () => {
        await atualizaFretePedido(selectedPedido.id, valorFrete);
        navigate("/pagamento/" + selectedPedido.id);
    };

    const valorTotalRef = Number(selectedPedido.total || 0) + valorFrete;

    return (
        <div>
            <Header/>
            <div className="flex justify-center items-center mt-9">
                <div className="flex flex-col md:flex-row w-[410px] min-h-[650px] md:w-[1165px] md:h-[730px] bg-[#5494D2] rounded-xl shadow-2xl items-center justify-center ">
                    <div className="flex w-1/2 justify-center items-center ">
                        <div className="flex flex-col justify-center items-center ">
                                <p className="font-bold text-white">Produtos:</p>
                                <div className="flex flex-col max-h-[600px] space-y-5 overflow-y-auto items-center ">
                                    {produtosDetalhes.map(pd => (
                                        <div key={pd.id} className="flex-shrink-0">
                                            <CardProdutoPedido key={pd.id} produto={{...pd, estoque: pd.quantidade}}/>
                                        </div>
                                    ))}
                                </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-5 items-center">
                        <FreteCard onEnviar={handleFreteCalculado} pacote={selectedPedido.pacote}/>
                        <div className="flex flex-col font-bold text-white text-2xl">
                            <p>Sub-total: {Number(selectedPedido.total).toFixed(2)}</p>
                            <p id="frete">Frete: {valorFrete.toFixed(2)}</p>
                            <p>Total: {valorTotalRef.toFixed(2)}</p>
                        </div>
                        <button className='flex justify-center  items-center bg-[#F174A7] w-[200px] mb-3 md:w-[435px] h-[60px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer' onClick={handleIrParaPagamento}>
                                <p className='text-white'>Ir para pagamento</p>
                        </button>         
                    </div>
                </div>
            </div>
        </div>
    )
}