import { useState } from "react";
import Header from "../components/hearders/Header"
import { message } from "antd";
import { createProduto } from "../services/produtoService";
import SelectCategorias from "../components/utils/SelectCategorias";
import { useNavigate } from "react-router";

export default function Anunciar() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState([]);

    const [produto, setProduto] = useState({
        nome: '',
        autor: '',
        ano: '',
        categorias: '',
        idioma: '',
        tipo: '',
        preco: '',
        descricao: '',
        estoque: '',
        pdf: null,
        imagem: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const {nome, autor, ano, categorias, idioma, tipo, preco, descricao, imagem, estoque, pdf} = produto;

        if (!nome || !autor || !ano || !idioma || !tipo || !preco || !descricao) {
            message.error("Preencha todos os campos.")
            return;
        }

        if (tipo === "LIVRO" && !estoque) {
            message.error("Estoque obrigatório!")
            return;
        }

        if (tipo === "EBOOK" && !pdf) {
            message.error("Arquivo PDF obrigatório!")
            return;
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('autor', autor);
        formData.append('ano_lancamento', ano);
        formData.append('idioma', idioma);
        formData.append('tipo_produto', tipo);
        formData.append('preco', parseFloat(preco.replace(',', '.')));
        formData.append('descricao', descricao);
        if(produto.imagem) {
            formData.append('imagem', imagem);
        }
        if (categorias && Array.isArray(categorias)) {
            categorias.forEach(catId => {
                formData.append('categorias', catId);
            });
        }

        if(produto.estoque){
            formData.append('estoque', estoque );
        }

        if(produto.pdf){
            formData.append('arquivo', pdf );
        }

        createProduto(formData, tipo).then(() => {
            message.success("Produto anunciado com sucesso!");
            setProduto({ nome: '',
                    autor: '',
                    ano: '',
                    categorias: '',
                    idioma: '',
                    tipo: '',
                    preco: '',
                    descricao: '',
                    imagem: '',
                    pdf: '',
                    estoque: '', });
            navigate("/home");
            return;
        })
        .catch((err) => {
                message.error("Erro desconhecido ao anunciar.");
        });
    }

    return(
        <div>
            <Header/>
            <div className="flex justify-center mt-9">
                <div className="flex flex-col bg-[#5494D2] w-[1365px] h-[730px] rounded-xl shadow-2xl justify-center items-center">
                    <p className="text-white font-bold text-3xl mb-5">Anunciar livro</p>
                    <div className="flex">
                        <form className="flex flex-col bg-white p-10 rounded-xl  space-y-2 w-[600px] h-[600px]" onSubmit={ handleSubmit }>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Nome' onChange={(e) => setProduto({...produto, nome: e.target.value})}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Autor' onChange={(e) => setProduto({...produto, autor: e.target.value})}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Ano' onChange={(e) => setProduto({...produto, ano: e.target.value})}></input>
                            <SelectCategorias value={produto.categorias} onChange={(id) => setProduto({...produto, categorias: [Number(id)]})}/>
                            <select className='border-1 border-[#979797] p-1 rounded-sm w-full' value={produto.idioma} onChange={(e) => setProduto({...produto, idioma: e.target.value})}>
                                <option value={''}>Selecionar Idioma</option>
                                <option value={'PT'}>Português</option>
                                <option value={'EN'}>Inglês</option>
                                <option value={'ES'}>Espanhol</option>
                                <option value={'OT'}>Outro</option>
                            </select>
                            <select className='border-1 border-[#979797] p-1 rounded-sm w-full' onChange={(e) => {setProduto({...produto, tipo: e.target.value}); setTipo(e.target.value);}}>
                                <option value={''}>Selecionar Tipo</option>
                                <option value={'LIVRO'}>Livro</option>
                                <option value={'EBOOK'}>E-book</option>
                            </select>
                            {tipo === "LIVRO" && ( 
                                <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Estoque' onChange={(e) => setProduto({...produto, estoque: e.target.value})}></input>
                            )}
                            {tipo === "EBOOK" && (
                                <div> 
                                    <p>Arquivo PDF:</p>
                                    <input id="imagem" className='border-1 border-[#979797] p-1 rounded-sm w-full' type="file" onChange={(e) => setProduto({...produto, pdf: e.target.files[0]})}></input>
                                </div>
                            )}
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Preço' onChange={(e) => setProduto({...produto, preco: e.target.value})}></input>
                            <textarea className='border-1 border-[#979797] p-1 rounded-sm w-full h-[300px] self-start' placeholder='Descrição' onChange={(e) => setProduto({...produto, descricao: e.target.value})}></textarea>
                            <p>Imagem:</p>
                            <input id="imagem" className='border-1 border-[#979797] p-1 rounded-sm w-full' type="file" onChange={(e) => setProduto({...produto, imagem: e.target.files[0]})}></input>
                            <button className='flex justify-center w-full items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                                <p className='text-white'>Anunciar</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}