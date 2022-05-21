import React, { useState, useEffect } from 'react'
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState(''); // armazena o estado, função que atualiza o estado.
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudent(){

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); // Recuperar o estado anterior prevState, utilizamos o Spread Operator para pegar o conteudo de despejar dentro do vetor.

  }


  useEffect(() => {
    async function fetchData(){ 
      const response = await fetch('https://api.github.com/users/caiorodr');
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
      
    }
    // Corpo do useEffect, ele é executado automaticamente assim que, a interface for renderizada.
    // [] Array de dependencias para executar o useEffect. 
    fetchData();
  }, []);

  return (
    <div className='container'> {/* <> Fragment - para passar mais de um elemento em 1 return */}

      <header>
        <h1>Lista de Presença</h1>
        <div> 
          <strong>{user.name}</strong>
          <a href="https://github.com/caiorodr"><img className='img-circle' src={user.avatar} alt="Foto de perfil" /></a>
        </div>
      </header> 
      

      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />        

      <button type="button" disabled={!studentName} onClick={handleAddStudent} >
        Adicionar
      </button>

      {/* Em laço de repetição utilizar o key para chave unica. */}
      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
        ))
      };

    </div>
  )
}
