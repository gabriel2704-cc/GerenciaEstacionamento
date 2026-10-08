import Alert from 'react-bootstrap/Alert';

function Alerta({ alerta }) {
  if (!alerta?.message) return null;

  return <Alert variant={alerta.status === 'success' ? 'success' : 'warning'}>{alerta.message}</Alert>;
}

export default Alerta;
