import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { Table } from "./styles";

interface IExame {
  id: string;
  nome: string;
  tipoexame: string;
  nomeexame: string;
  mesanoexame: string;
  laboratorio: string;
}

const Relatorio: React.FC = () => {
  const [exames, setExames] = useState<IExame[]>([]);



  useEffect(() => {
    api.get('/exames').then(response => setExames(response.data))
  }, [])

  async function deleteExam(id: any) {
    await api.delete(`/exames/${id}`);
    setExames(exames.filter(exame => exame.id !== id))
  }

  function showLab() {
    const totalLabFunc = exames.filter(e => e.laboratorio === 'Lab Funcional').length;
    const totalLabMed = exames.filter(e => e.laboratorio === 'Lab Médico').length;
    alert(`O total de exames no Lab Funcional é: ${totalLabFunc}, e o total no Lab Médico é: ${totalLabMed}`)
  };

  function showTipo() {
    const totalTipoAdm = exames.filter(e => e.tipoexame === 'Admissional').length;
    const totalTipoPer = exames.filter(e => e.tipoexame === 'Periódico').length;
    const totalTipoDem = exames.filter(e => e.tipoexame === 'Demissional').length;
    alert(`O total de exames Admissionais é: ${totalTipoAdm}, o total de exames Periódicos é: ${totalTipoPer} e o total de exames Demissionais é: ${totalTipoDem}`)
  };

  function showNome() {
    const totalHemo= exames.filter(e => e.nomeexame === 'Hemograma Completo').length;
    const totalAudio = exames.filter(e => e.nomeexame === 'Audiometria').length;
    const totalAcu = exames.filter(e => e.nomeexame === 'Acuidade Visual').length;
    alert(`O total de exames de Hemograma é: ${totalHemo}, o total de exames de Audiometria é: ${totalAudio}, e o total de exames de Acuidade Visual é: ${totalAcu}`)
  }


  return (
    <>

      <button onClick={showLab}>Mostrar exames por Lab</button>
      <br />
      <button onClick={showTipo}>Mostrar exames por Tipo</button>
      <br />
      <button onClick={showNome}>Mostrar exames por Nome</button>

      <Table>
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
              <td><button onClick={() => deleteExam(exame.id)}>Excluir Exame</button></td>
            </tr>
          )}
        </tbody>
      </Table>

      <Link to='/'>Voltar para o cadastro</Link>
    </>
  )
}

export default Relatorio;
