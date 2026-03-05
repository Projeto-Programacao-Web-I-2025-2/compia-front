import { useState } from "react";
import Header from "../components/hearders/Header"
import { message } from "antd";
import { createProduto } from "../services/produtoService";

export default function Anunciar() {
    const [produto, setProduto] = useState({
        nome: '',
        autor: '',
        ano: '',
        categorias: '',
        idioma: '',
        tipo: '',
        preco: '',
        descricao: '',
        imagem: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const {nome, autor, ano, categorias, idioma, tipo, preco, descricao, imagem} = produto;

        if (!nome || !autor || !ano || !idioma || !tipo || !preco || !descricao) {
            message.error("Preencha todos os campos.")
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('autor', autor);
        formData.append('ano_lancamento', ano);
        formData.append('idioma', idioma);
        formData.append('tipo_produto', tipo);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
        if(produto.imagem) {
            formData.append('imagem', imagem);
        }
        if(categorias) {
            formData.append('categorias', categorias);
        }

        createProduto(formData).then(() => {
            message.success("Produto anunciado com sucesso!");
            setUsuario({ nome: '',
                    autor: '',
                    ano: '',
                    categorias: '',
                    idioma: '',
                    tipo: '',
                    preco: '',
                    descricao: '',
                    imagem: '', });
            navigate("/home");
        })
        .catch((err) => {
            const erros = err.response?.data;
            
            if (erros) {
            const listaDeErros = Object.keys(erros).map((campo) => {
                    return `${erros[campo].join("; ")}`;
                });

                const mensagemFinal = listaDeErros.join(" | ");
        
                message.error(mensagemFinal);
            } else {
                message.error("Erro desconhecido ao anunciar.");
            }
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
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Categoria' onChange={(e) => setProduto({...produto, categorias: e.target.value})}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Idioma' onChange={(e) => setProduto({...produto, idioma: e.target.value})}></input>
                            <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Tipo' onChange={(e) => setProduto({...produto, tipo: e.target.value})}></input>
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