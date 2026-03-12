const CardVenda = ({ venda, onDetalhar }) => {
    const { id, valor_total, data_venda, itens } = venda || {};

    const handleDetalhar = () => {
        if (onDetalhar) {
            onDetalhar(venda)
        }
    }

    return (
        <div className="flex bg-[#FFFFFF] border-[#979797] rounded-lg border-1 w-[610px] h-[120px] shadow-xl ">
            <div className="flex flex-1 flex-col mr-5 ml-5 justify-center">
                <div className="flex justify-between">
                    <p className="nomeProduto line-clamp-1">Venda: {id}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p>Total: R$ {valor_total}</p>
                    <button className="flex items-center w-[70px] justify-center rounded-xl p-1 bg-[#F174A7] hover:bg-[#d26e97] border-1 border-[#979797] text-white cursor-pointer" onClick={handleDetalhar}>
                        Detalhar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardVenda;