import { useState } from "react";
import { message } from "antd";
import { createProduto } from "../services/produtoService";
import { useNavigate } from "react-router";
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import FormLivro from "../components/utils/FormLivro";

export default function Anunciar() {
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        nome: '',
        autor: '',
        ano_lancamento: '',
        categorias: '',
        idioma: '',
        tipo: '',
        preco: '',
        descricao: '',
        imagem: '',
        pdf: '',
        estoque: '',
    });

    const handleSubmit = (produtoData) => {
        const {nome, autor, ano_lancamento, categorias, idioma, tipo, preco, descricao, imagem, estoque, pdf} = produtoData;

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('autor', autor);
        formData.append('ano_lancamento', ano_lancamento);
        formData.append('idioma', idioma);
        formData.append('tipo_produto', tipo);
        formData.append('preco', parseFloat(preco.replace(',', '.')));
        formData.append('descricao', descricao);
        if(produtoData.imagem) {
            formData.append('imagem', imagem);
        }
        if (categorias && Array.isArray(categorias)) {
            categorias.forEach(catId => {
                formData.append('categorias', catId);
            });
        }

        if(produtoData.estoque){
            formData.append('estoque', estoque );
        }

        if(produtoData.pdf){
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
            <HeaderVendedor/>
            <div className="flex justify-center mt-9">
                <div className="flex flex-col bg-[#5494D2] w-[410px]  md:w-[1165px] h-[730px] rounded-xl shadow-2xl justify-center items-center">
                    <p className="text-white font-bold text-3xl mb-5">Anunciar livro</p>
                    <FormLivro produto={produto} setProduto={setProduto} onEnviar={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}