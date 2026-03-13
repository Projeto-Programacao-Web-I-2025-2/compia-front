import Header from "../components/hearders/Header";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { message } from "antd";
import { atualizaStatusPedido } from "../services/pedidoService";

export default function Pagamento() {
    const idpedido = useParams();
    const navigate = useNavigate();
    const [pagamento, setPagamento] = useState({
        numeroCartao: '',
        nomeCartao: '',
        validade: '',
        cvv: '',
        cpf: '',
    });

    const formatarCartao = (valor) => {
        const soNumeros = valor.replace(/\D/g, '').slice(0, 16);
        return soNumeros.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const formatarValidade = (valor) => {
        const soNumeros = valor.replace(/\D/g, '').slice(0, 4);
        if (soNumeros.length <= 2) return soNumeros;
        return soNumeros.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    };

    const formatarCPF = (valor) => {
        const soNumeros = valor.replace(/\D/g, '').slice(0, 11);

        return soNumeros
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { numeroCartao, nomeCartao, validade, cvv, cpf } = pagamento;

        if (!numeroCartao || !nomeCartao || !validade || !cvv || !cpf) {
            message.error("Preencha todos os campos.");
            return;
        }

        const apenasNumerosCartao = numeroCartao.replace(/\D/g, '');
        if (apenasNumerosCartao.length !== 16) {
            message.error("O cartão deve ter exatamente 16 dígitos.");
            return;
        }

        const apenasNumerosCVV = cvv.replace(/\D/g, '');
        if (apenasNumerosCVV.length !== 3) {
            message.error("O CVV deve ter 3 dígitos.");
            return;
        }

        const [mes, ano] = validade.split('/').map(v => v.trim());
        const anoFormatado = ano?.length === 2 ? `20${ano}` : ano;

        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth() + 1;
        const anoAtual = dataAtual.getFullYear();

        const expMes = parseInt(mes, 10);
        const expAno = parseInt(anoFormatado, 10);

        if (!mes || !ano || expMes < 1 || expMes > 12) {
            message.error("Data de validade inválida.");
            return;
        }

        if (expAno < anoAtual || (expAno === anoAtual && expMes < mesAtual)) {
            message.error("O cartão está expirado.");
            return;
        }

        const apenasNumerosCPF = cpf.replace(/\D/g, '');
        if (apenasNumerosCPF.length !== 11) {
            message.error("O CPF deve ter 11 dígitos.");
            return;
        }

        message.success("Pagamento realizado com sucesso!");
        await atualizaStatusPedido(idpedido.id, "CONFIRMADO");
        navigate("/meus-pedidos");
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center mt-9">
                <div className="flex bg-[#5494D2] w-[410px] min-h-[650px] md:w-[1165px] md:h-[730px] rounded-xl shadow-2xl justify-center items-center">
                    <div className="flex flex-col justify-center items-center space-y-3 mt-3 mb-3">
                        <p className="text-white font-bold text-xl">Dados do cartão</p>

                        <form onSubmit={handleSubmit} className="flex flex-col bg-white p-8 rounded-xl justify-center space-y-2">
                            <label>Nome escrito no cartão:</label>
                            <input
                                className='border-1 border-[#979797] p-1 rounded-sm w-[235px]'
                                placeholder='Nome'
                                onChange={(e) => setPagamento({ ...pagamento, nomeCartao: e.target.value })}
                            />

                            <label>Número Cartão:</label>
                            <input
                                maxLength={19}
                                className='border-1 border-[#979797] p-1 rounded-sm w-[235px]'
                                placeholder='XXXX XXXX XXXX XXXX'
                                value={pagamento.numeroCartao}
                                onChange={(e) =>
                                    setPagamento({
                                        ...pagamento,
                                        numeroCartao: formatarCartao(e.target.value),
                                    })
                                }
                            />

                            <label>CVV:</label>
                            <input
                                maxLength={3}
                                className='border-1 border-[#979797] p-1 rounded-sm w-[235px]'
                                placeholder='XXX'
                                onChange={(e) => setPagamento({ ...pagamento, cvv: e.target.value })}
                            />

                            <label>Data de validade:</label>
                            <input
                                maxLength={5}
                                className='border-1 border-[#979797] p-1 rounded-sm w-[235px]'
                                placeholder='MM/AA'
                                value={pagamento.validade}
                                onChange={(e) =>
                                    setPagamento({
                                        ...pagamento,
                                        validade: formatarValidade(e.target.value),
                                    })
                                }
                            />

                            <label>Função do cartão</label>
                            <select
                                className='border-1 border-[#979797] p-2 rounded-sm w-[235px]'>
                                <option value="">Selecione uma função</option>
                                <option value="credito">Crédito</option>
                                <option value="debito">Débito</option>
                            </select>

                            <label>CPF do titular:</label>
                            <input
                                maxLength={14}
                                className='border-1 border-[#979797] p-1 rounded-sm w-[235px]'
                                placeholder='XXX.XXX.XXX-XX'
                                value={pagamento.cpf}
                                onChange={(e) =>
                                    setPagamento({
                                        ...pagamento,
                                        cpf: formatarCPF(e.target.value),
                                    })
                                }
                            />

                            <button
                                type="submit"
                                className='flex justify-center items-center bg-[#F174A7] w-[235px] h-[30px] rounded-lg font-bold hover:bg-[#d26e97] cursor-pointer'
                            >
                                <p className='text-white'>Pagar</p>
                            </button>
                        </form>

                        <p className="text-white w-[370px] md:w-[600px] text-justify">
                            *Aviso de Teste: Para simular o checkout, utilize quaisquer dados fictícios que sigam o formato padrão (16 dígitos para o cartão, 11 para CPF). Nenhuma cobrança real será efetuada e os dados não são salvos por questões de segurança e privacidade.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}