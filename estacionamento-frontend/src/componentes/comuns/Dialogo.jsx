import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Dialogo({ id, idform, titulo, acaoCadastrar, exibirForm, setExibirForm, children }) {
  const [validated, setValidated] = useState(false);

  const fechar = () => {
    setValidated(false);
    setExibirForm(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const formularioValido = form.checkValidity();

    if (!formularioValido) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (formularioValido) {
      acaoCadastrar(event);
    }
  };

  return (
    <Modal show={exibirForm} onHide={fechar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Form id={idform || id} onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Container>
            <Row>{children}</Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fechar}>Fechar</Button>
          <Button variant="success" type="submit">
            Salvar <i className="bi bi-save" aria-hidden="true"></i>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Dialogo;
