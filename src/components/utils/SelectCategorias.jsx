import { useEffect, useState } from "react";
import { getCategorias } from "../../services/produtoService";  

const SelectCategorias = ({onChange, value}) => {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const carregar = async () => {
            const dados = await getCategorias(); 
            setCategorias(dados); 
        };

        carregar();
    }, []);

    const handleChange = (e) => {
        const valorId = e.target.value;

        onChange(valorId ? valorId : "");
    }

    return(
        <select className='border-1 border-[#979797] p-1 rounded-sm w-full'
            onChange={handleChange}
            value={value && value.length > 0 ? value[0] : ""}
        >
            <option value={[]}>Selecionar Categoria</option>
            {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                {cat.nome}
                </option>
            ))}
        </select>
    )
}

export default SelectCategorias