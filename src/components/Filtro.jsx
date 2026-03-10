import { useState } from "react"
import SelectCategorias from "./utils/SelectCategorias"

const ModalFiltro = ({onEnviar}) => {
    const [filtros, setFiltros] = useState({
        ordem: '',
        categorias: [],
        idioma: '',
        tipo: ''
    })

    const handleRemover = () => {
        setFiltros({
            ordem: '',
            categorias: '',
            idioma: '',
            tipo: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {ordem, categorias, idioma, tipo} = filtros;

        const paramsObj = {};

        if (ordem) paramsObj.ordering = ordem;
        if (idioma) paramsObj.idioma = idioma;
        if (tipo) paramsObj.tipo = tipo;
        
        if (categorias && categorias.length > 0 && categorias[0] !== 0) {
            paramsObj.categorias = categorias.join(','); 
        }

        const searchParams = new URLSearchParams(paramsObj).toString();
        
        const param = searchParams ? `?${searchParams}` : "";
        
        if(onEnviar) {
            onEnviar(param);
        }
    }

    return(
        <form className="flex flex-col bg-[#FFFFFF] border-1 border-[#979797] rounded-lg min-w-[310px] h-[510px] items-center shadow-xl" onSubmit={handleSubmit}>
            <h1 className="text-[#314C91] text-xl mt-4 font-bold">Filtro</h1>
            <div className="flex flex-col text-md mt-6 space-y-2 w-[240px]">
                <label>Ordenar por:</label>
                <select className="border-1 rounded border-[#979797] p-1" value={filtros.ordem} onChange={(e) => setFiltros({...filtros, ordem: e.target.value})}>
                    <option value={''}>Ordem Padrão</option>
                    <option value={'preco'}>Preço crescente</option>
                    <option value={'-preco'}>Preço decrescente</option>
                </select>
                <label>Categoria:</label>
                <SelectCategorias value={filtros.categorias} onChange={(id) => setFiltros({...filtros, categorias: [Number(id)]})}/>
                <label>Idioma:</label>
                <select className="border-1 rounded border-[#979797] p-1" value={filtros.idioma} onChange={(e) => setFiltros({...filtros, idioma: e.target.value})}>
                    <option value={''}>Todos</option>
                    <option value={'PT'}>Português</option>
                    <option value={'EN'}>Inglês</option>
                    <option value={'ES'}>Espanhol</option>
                    <option value={'OT'}>Outro</option>
                </select>
                <label>Tipo:</label>
                <select className="border-1 rounded border-[#979797] p-1" value={filtros.tipo} onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}>
                    <option value={''}>Todos</option>
                    <option value={'livro'}>Livro</option>
                    <option value={'ebook'}>E-book</option>
                </select>
            </div>
            <div className="flex space-x-16 mt-20">
                <button type="button" className='flex justify-center items-center bg-[#F174A7] text-white rounded-lg font-bold border-1 border-[#979797] p-1 hover:bg-[#d26e97] cursor-pointer w-[90px]' onClick={handleRemover}>
                    Remover
                </button>
                <button type="submit" className="flex items-center justify-center rounded-lg p-1 bg-[#5494D2] font-bold border-1 border-[#979797] hover:bg-[#31567A] text-white cursor-pointer w-[90px]" onClick={() => {}}>
                    Aplicar
                </button>
            </div>
        </form>
    )
}

export default ModalFiltro