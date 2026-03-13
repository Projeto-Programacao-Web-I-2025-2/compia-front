import { useState } from "react";
import { message } from "antd";
import SelectCategorias from "./SelectCategorias";

export default function FormLivro({ produto, setProduto, onEnviar }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const {nome, autor, ano_lancamento, categorias, idioma, tipo, preco, descricao, imagem, estoque, pdf} = produto;

        if (!nome || !autor || !ano_lancamento || !idioma || !tipo || !preco || !descricao) {
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

        if(onEnviar) {
            onEnviar(produto);
        }
    }


    return(
        <div className="flex">
            <form className="flex flex-col bg-white p-10 rounded-xl  space-y-2 w-[370px] h-[600px] md:w-[600px]" onSubmit={ handleSubmit }>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Nome' value={produto.nome} onChange={(e) => setProduto({...produto, nome: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Autor' value={produto.autor} onChange={(e) => setProduto({...produto, autor: e.target.value})}></input>
                <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Ano' value={produto.ano_lancamento} onChange={(e) => setProduto({...produto, ano_lancamento: e.target.value})}></input>
                <SelectCategorias value={produto.categorias} onChange={(id) => setProduto({...produto, categorias: [Number(id)]})}/>
                <select className='border-1 border-[#979797] p-1 rounded-sm w-full' value={produto.idioma} onChange={(e) => setProduto({...produto, idioma: e.target.value})}>
                    <option value={''}>Selecionar Idioma</option>
                    <option value={'PT'}>Português</option>
                    <option value={'EN'}>Inglês</option>
                    <option value={'ES'}>Espanhol</option>
                    <option value={'OT'}>Outro</option>
                </select>
                <select className='border-1 border-[#979797] p-1 rounded-sm w-full' value={produto.tipo} onChange={(e) => setProduto({...produto, tipo: e.target.value})}>
                    <option value={''}>Selecionar Tipo</option>
                    <option value={'livro'}>Livro</option>
                    <option value={'ebook'}>E-book</option>
                </select>
                {produto.tipo === "livro" && ( 
                    <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Estoque' value={produto.estoque} onChange={(e) => setProduto({...produto, estoque: e.target.value})}></input>
                )}
                {produto.tipo === "ebook" && (
                    <div> 
                        <p>Arquivo PDF:</p>
                        <input id="pdf" className='border-1 border-[#979797] p-1 rounded-sm w-full' type="file" onChange={(e) => setProduto({...produto, pdf: e.target.files[0]})}></input>
                    </div>
                )}
                <input className='border-1 border-[#979797] p-1 rounded-sm w-full' placeholder='Preço' value={produto.preco} onChange={(e) => setProduto({...produto, preco: e.target.value})}></input>
                <textarea className='border-1 border-[#979797] p-1 rounded-sm w-full h-[300px] self-start' placeholder='Descrição' value={produto.descricao} onChange={(e) => setProduto({...produto, descricao: e.target.value})}></textarea>
                <p>Imagem:</p>
                <input id="imagem" className='border-1 border-[#979797] p-1 rounded-sm w-full' type="file" onChange={(e) => setProduto({...produto, imagem: e.target.files[0]})}></input>
                <button type="submit" className='flex justify-center w-full items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'>
                    <p className='text-white'>Enviar</p>
                </button>
            </form>
        </div>
    )
}