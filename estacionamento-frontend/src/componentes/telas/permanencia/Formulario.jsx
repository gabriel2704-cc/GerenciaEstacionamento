import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import PermanenciaContext from './PermanenciaContext';
import Col from 'react-bootstrap/Col';

function Formulario() {
  const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, editar, vagas, veiculos } = useContext(PermanenciaContext);

  // Mostra só as vagas ativas, mais a vaga da permanência em edição
  const vagasVisiveis = vagas.filter((vaga) => vaga.status === 'ativa' || String(vaga.id) === String(objeto.vaga_id));

  return (
    <Dialogo
      id="modalPermanencia"
      idform="formularioPermanencia"
      titulo="Permanência"
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
        <CampoEntrada value={objeto.vaga_id} id="selVaga" name="vaga_id" label="Vaga" as="select"
          onchange={handleChange} msginvalido="Selecione a vaga" requerido>
          <option value="">Selecione</option>
          {vagasVisiveis.map((vaga) => (
            <option key={vaga.id} value={vaga.id}>{vaga.numero}</option>
          ))}
        </CampoEntrada>
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.veiculo_id} id="selVeiculo" name="veiculo_id" label="Veículo" as="select"
          onchange={handleChange} msginvalido="Selecione o veículo" requerido>
          <option value="">Selecione</option>
          {veiculos.map((veiculo) => (
            <option key={veiculo.id} value={veiculo.id}>{veiculo.placa}</option>
          ))}
        </CampoEntrada>
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.entrada} id="dttEntrada" name="entrada" label="Entrada" tipo="datetime-local"
          onchange={handleChange} msginvalido="Informe a data de entrada" requerido />
      </Col>
      <Col xs={12}>
        <CampoEntrada value={objeto.saida} id="dttSaida" name="saida" label="Saída (opcional)" tipo="datetime-local"
          onchange={handleChange} />
      </Col>
    </Dialogo>
  );
}

export default Formulario;
