import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import VeiculoContext from './VeiculoContext';
import Col from 'react-bootstrap/Col';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, editar } = useContext(VeiculoContext);

  return (
    <Dialogo
      id="modalVeiculo"
      idform="formularioVeiculo"
      titulo="Veículo"
      acaoCadastrar={acaoCadastrar}
      exibirForm={exibirForm}
      setExibirForm={setExibirForm}
    >
      <Alerta alerta={alerta} />
      {editar && (
        <Col xs={12}>
          <CampoEntrada value={objeto.id} id="txtId" name="id" label="Código" tipo="number" onchange={handleChange} readonly />
        </Col>
      )}
      <Col xs={12}>
        <CampoEntrada value={objeto.placa} id="txtPlaca" name="placa" label="Placa" tipo="text"
          onchange={handleChange} msginvalido="Informe a placa" requerido maxCaracteres={10} />
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.modelo} id="txtModelo" name="modelo" label="Modelo" tipo="text"
          onchange={handleChange} msginvalido="Informe o modelo" requerido maxCaracteres={60} />
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.cor} id="txtCor" name="cor" label="Cor" tipo="text"
          onchange={handleChange} msginvalido="Informe a cor" requerido maxCaracteres={30} />
      </Col>
    </Dialogo>
  );
}

export default Formulario;
