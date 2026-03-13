const CardPedido = ({ pedido, onDetalhar }) => {
    const { id, total, data_pedido, data_entrega, status, itens, frete } = pedido || {};

    const formataData = (data) => {
        if (!data) {
            return("Aguardando")
        }
        const dataAjustada = data.split('-').join('/'); 
        const dataPedido = new Date(dataAjustada);

        return dataPedido.toLocaleDateString('pt-BR');
    }

    const handleDetalhar = () => {
        console.log(pedido);
        if (onDetalhar) {
            onDetalhar({status, itens, id, frete, total})
        }
    }

    return (
        <div className="flex bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[300px] h-[120px] md:w-[550px] shadow-xl text-sm md:text-base">
            <div className="flex flex-1 flex-col mr-5 ml-5 justify-center">
                <div className="flex justify-between">
                    <p className="nomeProduto line-clamp-1">Pedido: {id}</p>
                    <p className=" line-clamp-1">Data da compra: {formataData(data_pedido)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p>Total: R$ {total}</p>
                    <p className="nomeProduto line-clamp-1">Data de entrega: {formataData(data_entrega)}</p>
                    <button className="flex items-center w-[70px] justify-center rounded-xl p-1 bg-[#F174A7] hover:bg-[#d26e97] border-1 border-[#979797] text-white cursor-pointer" onClick={handleDetalhar}>
                        Detalhar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardPedido;