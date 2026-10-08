import Spinner from 'react-bootstrap/Spinner';

export default function Carregando({ carregando, children }) {
  if (!carregando) return children;

  return (
    <div className="d-flex align-items-center gap-2 m-5" role="status" aria-live="polite">
      <strong>Carregando...</strong>
      <Spinner animation="border" size="sm" variant="primary" />
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
