import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import VagaContext from './VagaContext';
import Col from 'react-bootstrap/Col';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, editar } = useContext(VagaContext);

  return (
    <Dialogo
      id="modalVaga"
      idform="formularioVaga"
      titulo="Vaga"
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
        <CampoEntrada value={objeto.numero} id="txtNumero" name="numero" label="Número da vaga" tipo="text"
          onchange={handleChange} msginvalido="Informe o número da vaga" requerido maxCaracteres={10} />
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.tipo} id="selTipo" name="tipo" label="Tipo" as="select"
          onchange={handleChange} msginvalido="Selecione o tipo" requerido>
          <option value="">Selecione</option>
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
          <option value="acessivel">Acessível</option>
        </CampoEntrada>
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.status} id="selStatus" name="status" label="Status" as="select"
          onchange={handleChange} msginvalido="Selecione o status" requerido>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
        </CampoEntrada>
      </Col>
    </Dialogo>
  );
}

export default Formulario;
