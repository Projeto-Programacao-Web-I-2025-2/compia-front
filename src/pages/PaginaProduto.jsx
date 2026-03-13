import Header from "../components/hearders/Header"
import { LuShoppingCart } from "react-icons/lu";
import { getProdutoById } from "../services/produtoService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import '../index.css'
import { CiImageOff, CiEdit} from "react-icons/ci";
import HeaderVendedor from "../components/hearders/HeaderVendedor";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { getVendedorById } from "../services/userService";
import { getCategorias } from "../services/produtoService";
import FreteCard from "../components/utils/FreteCard";
import { LoadingOutlined } from '@ant-design/icons';

export default function PaginaProduto() {
    const { addProduto } = useCarrinho();
    const navigate = useNavigate();
    const {id} = useParams();
    const [produto, setProduto ] = useState(null);
    const [vendedor, setVendedor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoriaSistema, setCategoriaSistema] = useState([]);
    const roleUser = localStorage.getItem('role');

    useEffect(() => {
        const carregaProduto = async () => {
            const produto = await getProdutoById({id});
            const vendedor = await getVendedorById(produto.vendedor);
            const dados = await getCategorias(); 

            if(produto) {
                setProduto(produto);
            }
            if(vendedor) {
                setVendedor(vendedor);
            }
            if(dados) {
                setCategoriaSistema(dados);
            }
            setLoading(false);
        };
        carregaProduto();
    }, [id]);

    if (loading) {
         return(
            <div>
                {roleUser === "CLIENTE" || !roleUser ? <Header/> : <HeaderVendedor/>}
                <div className="flex mx-auto items-center justify-center  text-[#5494D2]"> 
                    <LoadingOutlined style={{ fontSize: 60 }}/>
                </div> 
            </div>
        )
    }

    const { nome, autor, descricao, preco, imagem, estoque, ano_lancamento, tipo, categorias } = produto || {};
    
    return(
        <div>
            {roleUser === "CLIENTE" || !roleUser ? <Header/> : <HeaderVendedor/>}
            <div className="flex justify-center mt-9">
                <div className="flex flex-col md:flex-row bg-[#5494D2] w-[410px] min-h-[650px] md:w-[1165px] md:h-[730px] rounded-xl shadow-2xl">
                    <div className="flex justify-center items-center mx-auto my-auto mt-5 md:ml-10 md:mt-20 rounded-xl border-1 border-[#979797] bg-[#FFFFFF]  w-[370px] h-[370px] md:w-[570px] md:h-[570px] shadow-xl">
                        {imagem ? <img src={imagem} className="object-contain w-[370px] h-[370px] md:w-[570px] md:h-[570px]"></img> : <CiImageOff size={130}/>}
                    </div>
                    <div className="flex justify-between flex-col flex-1 text-bold ml-3 mt-5 md:ml-10 md:mt-10 md:mb-10 md:mr-10 w-[370px] md:w-[600px] items-center space-y-4">
                        <div className="text-white">
                            <h1 className="text-2xl line-clamp-3">{nome}</h1>
                            <div className="flex justify-between line-clamp-1">
                                <h2 className="line-clamp-1">Autor: {autor}</h2>
                                <p className="capitalize">Tipo produto: {tipo}</p>
                                <p>Ano: {ano_lancamento}</p>
                            </div>
                                <p className="capitalize">Categoria: {categoriaSistema.find(c => c.id === categorias[0])?.nome || 'Desconhecida'}</p>

                            <div className="flex justify-between">
                                <h3>Vendido por: {vendedor?.nome || 'Desconhecido'}</h3>
                                {estoque > 0 && <p>Estoque: {estoque}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col max-h-[170px] overflow-y-auto text-white text-justify">
                            <p>Descrição:</p>
                            {descricao}
                        </div>
                        <FreteCard />
                        <div className="flex items-center mx-auto text-white justify-between w-full mb-4">
                            <h3 className="text-4xl">R$ {preco}</h3>
                            {roleUser == "CLIENTE" || !roleUser ? (estoque > 0 ?
                                <button onClick={(e) => {e.stopPropagation(); e.preventDefault(); addProduto(Number(id));}} className="flex items-center border-1 border-[#FFFFFF] bg-[#F174A7] hover:bg-[#d26e97] rounded-xl p-2 text-xl">
                                    Adicionar ao carrinho
                                    <LuShoppingCart/>
                                </button>
                                :
                                <div className="flex items-center border-1 border-[#FFFFFF] bg-[#F174A7] rounded-xl p-2 text-xl">
                                    Indisponível
                                </div>
                            )
                                :
                                <button onClick={(e) => {e.stopPropagation(); e.preventDefault(); navigate(`/editar/${id}`);}} className="flex items-center border-1 border-[#FFFFFF] bg-[#F174A7] hover:bg-[#d26e97] rounded-xl p-2 text-xl">
                                    Editar produto
                                    <CiEdit size={30}/>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}