
const ModalFiltro = () => {
    return(
        <div className="flex flex-col bg-[#FFFFFF] border-1 border-[#979797] rounded-lg min-w-[310px] h-[510px] items-center shadow-xl font-bold">
            <h1 className="text-[#314C91] text-xl mt-4">Filtro</h1>
            <div className="flex flex-col text-md mt-6 space-y-2 w-[240px]">
                <label>Ordenar por:</label>
                <input className="border-1 rounded border-[#979797] p-1"></input>
                <label>Categoria:</label>
                <input className="border-1 rounded border-[#979797] p-1"></input>
                <label>Idioma:</label>
                <input className="border-1 rounded border-[#979797] p-1"></input>
                <label>Tipo:</label>
                <input className="border-1 rounded border-[#979797] p-1"></input>
            </div>
            <div className="flex space-x-16 mt-24">
                <button className='flex justify-center items-center bg-[#F174A7] text-white rounded-lg font-bold border-1 border-[#979797] p-1 hover:bg-[#d26e97] cursor-pointer w-[90px]' onClick={''}>
                    Remover
                </button>
                <button className="flex items-center justify-center rounded-lg p-1 bg-[#5494D2] border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer w-[90px]" onClick={() => {}}>
                    Filtrar
                </button>
            </div>
        </div>
    )
}

export default ModalFiltro