import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoEntrada({
  value,
  name,
  label,
  tipo,
  requerido = false,
  id,
  onchange,
  msgvalido,
  msginvalido,
  readonly = false,
  maxCaracteres,
  as,
  placeholder,
  children,
}) {
  return (
    <FloatingLabel controlId={id} label={label} className="mb-3">
      <Form.Control
        as={as}
        type={tipo}
        required={requerido}
        name={name}
        value={value}
        onChange={onchange}
        readOnly={readonly}
        maxLength={maxCaracteres}
        placeholder={placeholder || label}
      >
        {children}
      </Form.Control>
      {msgvalido && <Form.Control.Feedback>{msgvalido}</Form.Control.Feedback>}
      {msginvalido && <Form.Control.Feedback type="invalid">{msginvalido}</Form.Control.Feedback>}
    </FloatingLabel>
  );
}

export default CampoEntrada;
