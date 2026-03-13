import { useEffect, useState } from "react";
import { message } from "antd";
import { createProduto, editProduto } from "../services/produtoService";
import { useNavigate, useParams } from "react-router";
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import FormLivro from "../components/utils/FormLivro";
import { getProdutoById } from "../services/produtoService";


export default function EditaLivro() {
    const id = useParams();
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

    useEffect(() => {
        const carregaProduto = async () => {
            const livro = await getProdutoById(id);

            if(livro) {
                setProduto(livro);
            }
        };

        carregaProduto();    
    }, [id]);

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
        if(produtoData.imagem instanceof File) {
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

        if(produtoData.pdf instanceof File){
            formData.append('arquivo', pdf );
        }

        editProduto(formData, tipo, id).then(() => {
            message.success("Produto editado com sucesso!");
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
                message.error("Erro desconhecido ao editar.");
        });
    }

    return(
        <div>
            <HeaderVendedor/>
            <div className="flex justify-center mt-9">
                <div className="flex flex-col bg-[#5494D2] w-[410px] h-[750px] md:w-[1165px] md:h-[730px] rounded-xl shadow-2xl justify-center items-center">
                    <p className="text-white font-bold text-3xl mb-5">Editar livro</p>
                    <FormLivro produto={produto} setProduto={setProduto} onEnviar={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}