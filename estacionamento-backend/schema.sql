CREATE TABLE IF NOT EXISTS vagas (
  id SERIAL PRIMARY KEY,
  numero VARCHAR(10) NOT NULL UNIQUE,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('carro', 'moto', 'acessivel')),
  status VARCHAR(20) NOT NULL DEFAULT 'ativa' CHECK (status IN ('ativa', 'inativa'))
);

CREATE TABLE IF NOT EXISTS veiculos (
  id SERIAL PRIMARY KEY,
  placa VARCHAR(10) NOT NULL UNIQUE,
  modelo VARCHAR(60) NOT NULL,
  cor VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS permanencias (
  id SERIAL PRIMARY KEY,
  vaga_id INTEGER NOT NULL REFERENCES vagas(id),
  veiculo_id INTEGER NOT NULL REFERENCES veiculos(id),
  entrada TIMESTAMP NOT NULL,
  saida TIMESTAMP,
  CHECK (saida IS NULL OR saida > entrada)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_vaga_ativa
  ON permanencias (vaga_id) WHERE saida IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_veiculo_ativo
  ON permanencias (veiculo_id) WHERE saida IS NULL;
