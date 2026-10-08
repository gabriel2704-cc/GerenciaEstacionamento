import { useEffect, useState } from 'react';
import Carregando from '../../comuns/Carregando';
import VeiculoContext from './VeiculoContext';
import Formulario from './Formulario';
import Tabela from './Tabela';

const API = process.env.REACT_APP_ENDERECO_API;

const objetoInicial = { id: '', placa: '', modelo: '', cor: '' };

function Veiculo() {
  const [listaObjetos, setListaObjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);
  const [objeto, setObjeto] = useState(objetoInicial);
  const [alerta, setAlerta] = useState({ status: '', message: '' });

  const recuperaVeiculos = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch(`${API}/veiculos`);
      const dados = await resposta.json();
      if (resposta.ok) {
        setListaObjetos(dados);
      } else {
        setAlerta(dados);
      }
    } catch (err) {
      setAlerta({ status: 'error', message: 'Servidor indisponível. Tente novamente.' });
    }
    setCarregando(false);
  };

  useEffect(() => {
    recuperaVeiculos();
  }, []);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: '', message: '' });
    setObjeto(objetoInicial);
    setExibirForm(true);
  };

  const editarObjeto = (id) => {
    const veiculo = listaObjetos.find((item) => item.id === id);
    setObjeto(veiculo);
    setEditar(true);
    setAlerta({ status: '', message: '' });
    setExibirForm(true);
  };

  const acaoCadastrar = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch(`${API}/veiculos`, {
        method: editar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objeto),
      });
      const retorno = await resposta.json();
      setAlerta({ status: retorno.status, message: retorno.message });
      if (retorno.status === 'success') {
        setObjeto(retorno.objeto);
        setEditar(true);
        recuperaVeiculos();
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
    if (!window.confirm('Deseja remover este veículo?')) return;
    try {
      const resposta = await fetch(`${API}/veiculos/${id}`, { method: 'DELETE' });
      const retorno = await resposta.json();
      setAlerta({ status: retorno.status, message: retorno.message });
      recuperaVeiculos();
    } catch (err) {
      setAlerta({ status: 'error', message: 'Servidor indisponível. Tente novamente.' });
    }
  };

  return (
    <VeiculoContext.Provider value={{ listaObjetos, alerta, remover, objeto, editar, editarObjeto, acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm }}>
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Formulario />
    </VeiculoContext.Provider>
  );
}

export default Veiculo;
