import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Vaga from './componentes/telas/vaga/Vaga';
import Veiculo from './componentes/telas/veiculo/Veiculo';
import Permanencia from './componentes/telas/permanencia/Permanencia';

function App() {
  const [telaAtual, setTelaAtual] = useState('vagas');

  const renderTela = () => {
    switch (telaAtual) {
      case 'veiculos':
        return <Veiculo />;
      case 'permanencias':
        return <Permanencia />;
      default:
        return <Vaga />;
    }
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Gerenciamento de Estacionamento</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link active={telaAtual === 'vagas'} onClick={() => setTelaAtual('vagas')}>Vagas</Nav.Link>
            <Nav.Link active={telaAtual === 'veiculos'} onClick={() => setTelaAtual('veiculos')}>Veículos</Nav.Link>
            <Nav.Link active={telaAtual === 'permanencias'} onClick={() => setTelaAtual('permanencias')}>Permanências</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="py-4">
        {renderTela()}
      </Container>
    </>
  );
}

export default App;
