import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from './styles';

import api from '../../services/api';

interface IExame {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
};

const Dashboard: React.FC = () => {
  const [exames, setExames] = useState<IExame[]>([]);
  const [nome, setNome] = useState('');
  const [tipoexame, setTipoExame] = useState('');
  const [nomeexame, setNomeExame] = useState('');
  const [mesanoexame, setMesAnoExame] = useState('');
  const [laboratorio, setLaboratorio] = useState('');

  useEffect(() => {
    api.get('/exames').then(response => setExames(response.data))
  }, [])

  async function handleAddEvento(exame: any) {
    exame.preventDefault();

    let id='';

    const novoExame = {
      id,
      nome,
      tipoexame,
      nomeexame,
      mesanoexame,
      laboratorio
    }

    console.log('Novo evento:', novoExame)

    await api.post('/exames', novoExame);
    setExames([...exames, novoExame])
    console.log('Lista de exames: ', exames );
    alert('Exame incluido com sucesso');
    setNome('');
    setTipoExame('');
    setNomeExame('');
    setMesAnoExame('');
    setLaboratorio('');

  }

  return (
    <>
      <Form onSubmit={handleAddEvento}>
        <input type='text' name='nome' placeholder='Nome do Médico' value={nome}
        onChange={e => setNome(e.target.value)} />
        <input type='text' name='tipoexame' placeholder='Tipo de exame' value={tipoexame}
        onChange={e => setTipoExame(e.target.value)} />
        <input type='text' name='nomeExame' placeholder='Nome do exame' value={nomeexame}
        onChange={e => setNomeExame(e.target.value)} />
        <input type='text' name="mesanoexame" placeholder="Mês e ano do exame" value={mesanoexame}
        onChange={e => setMesAnoExame(e.target.value)} />
        <input type='text' name="laboratorio" placeholder="Laboratório" value={laboratorio}
        onChange={e => setLaboratorio(e.target.value)} />
        <button type="submit">Salvar</button>
      </Form>

      <Link to='/relatorios'>Relatórios</Link>

      {/* <Table>
        <thead>
          <tr>
            <td>Médico</td>
            <td>Tipo exame</td>
            <td>Nome exame</td>
            <td>Mês e ano exame</td>
            <td>Laboratório</td>
          </tr>
        </thead>
        <tbody>
          {exames.map(exame =>
            <tr key={exame.id}>
              <td>{exame.nome}</td>
              <td>{exame.tipoexame}</td>
              <td>{exame.nomeexame}</td>
              <td>{exame.mesanoexame}</td>
              <td>{exame.laboratorio}</td>
            </tr>
          )}
        </tbody>
      </Table> */}
    </>
  )
}

export default Dashboard



