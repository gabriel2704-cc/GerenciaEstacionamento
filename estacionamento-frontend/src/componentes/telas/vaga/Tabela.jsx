import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import VagaContext from './VagaContext';

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(VagaContext);

  return (
    <>
      {alerta.message && (
        <div className={`alert alert-${alerta.status === 'success' ? 'success' : 'warning'}`} role="alert">
          {alerta.message}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Vagas</h2>
        <Button variant="primary" onClick={novoObjeto}>
          Novo <i className="bi bi-file-earmark-plus" aria-hidden="true"></i>
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Status</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaObjetos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">Nenhuma vaga cadastrada.</td>
            </tr>
          ) : listaObjetos.map((objeto) => (
            <tr key={objeto.id}>
              <td>{objeto.numero}</td>
              <td>{objeto.tipo}</td>
              <td>{objeto.status}</td>
              <td className="text-center">
                <Button variant="info" size="sm" className="me-2" onClick={() => editarObjeto(objeto.id)}>
                  Editar <i className="bi bi-pencil-square" aria-hidden="true"></i>
                </Button>
                <Button variant="danger" size="sm" onClick={() => remover(objeto.id)}>
                  Excluir <i className="bi bi-trash" aria-hidden="true"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Tabela;
