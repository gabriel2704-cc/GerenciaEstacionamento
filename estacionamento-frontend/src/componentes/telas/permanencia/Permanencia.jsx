import { useEffect, useState } from 'react';
import Carregando from '../../comuns/Carregando';
import PermanenciaContext from './PermanenciaContext';
import Formulario from './Formulario';
import Tabela from './Tabela';

const API = process.env.REACT_APP_ENDERECO_API;

const objetoInicial = { id: '', vaga_id: '', veiculo_id: '', entrada: '', saida: '' };

function Permanencia() {
  const [listaObjetos, setListaObjetos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState(objetoInicial);
  const [alerta, setAlerta] = useState({ status: '', message: '' });

  const recuperaPermanencias = async () => {
    setCarregando(true);
    try {
      const respostaPermanencias = await fetch(`${API}/permanencias`);
      const dadosPermanencias = await respostaPermanencias.json();
      const respostaVagas = await fetch(`${API}/vagas`);
      const dadosVagas = await respostaVagas.json();
      const respostaVeiculos = await fetch(`${API}/veiculos`);
      const dadosVeiculos = await respostaVeiculos.json();
      if (respostaPermanencias.ok && respostaVagas.ok && respostaVeiculos.ok) {
        setListaObjetos(dadosPermanencias);
        setVagas(dadosVagas);
        setVeiculos(dadosVeiculos);
      } else {
        setAlerta(dadosPermanencias);
      }
    } catch (err) {
      setAlerta({ status: 'error', message: 'Servidor indisponível. Tente novamente.' });
    }
    setCarregando(false);
  };

  useEffect(() => {
    recuperaPermanencias();
  }, []);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: '', message: '' });
    setObjeto(objetoInicial);
    setExibirForm(true);
  };

  const editarObjeto = (id) => {
    const p = listaObjetos.find((item) => item.id === id);
    setObjeto({
      ...p,
      entrada: p.entrada ? p.entrada.slice(0, 16) : '',
      saida: p.saida ? p.saida.slice(0, 16) : '',
    });
    setEditar(true);
    setAlerta({ status: '', message: '' });
    setExibirForm(true);
  };

  const acaoCadastrar = async (event) => {
    event.preventDefault();
    try {
      const corpo = { ...objeto, saida: objeto.saida === '' ? null : objeto.saida };
      const resposta = await fetch(`${API}/permanencias`, {
        method: editar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
      });
      const retorno = await resposta.json();
      setAlerta({ status: retorno.status, message: retorno.message });
      if (retorno.status === 'success') {
        setObjeto(retorno.objeto);
        setExibirForm(false);
        recuperaPermanencias();
      }
    } catch (err) {
      setAlerta({ status: 'error', message: 'Servidor indisponível. Tente novamente.' });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (id) => {
    if (!window.confirm('Deseja remover esta permanência?')) return;
    try {
      const resposta = await fetch(`${API}/permanencias/${id}`, { method: 'DELETE' });
      const retorno = await resposta.json();
      setAlerta({ status: retorno.status, message: retorno.message });
      recuperaPermanencias();
    } catch (err) {
      setAlerta({ status: 'error', message: 'Servidor indisponível. Tente novamente.' });
    }
  };

  return (
    <PermanenciaContext.Provider value={{ listaObjetos, vagas, veiculos, alerta, remover, objeto, editar, editarObjeto, acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm }}>
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Formulario />
    </PermanenciaContext.Provider>
  );
}

export default Permanencia;
