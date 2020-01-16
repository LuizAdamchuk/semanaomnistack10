import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css';
import './Sidebar.css';
import './App.css';
import './Main.css';

import DevItem from './components/Devitem';
import DevForm from './components/DevForm';

function App() {
  const[devs, setDevs] = useState([]);
 


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data) {

    const response = await api.post('/devs',
      )
    
    
    // é assim que se faz uma adicao dentro de um array ja existente
    // nesse caso a lista vai ser refeita e sera colocado o ultimo add 
    // e entao sera mostrada na interface automaticamente
    setDevs([...devs, response.data]);
   

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
         
          
        </ul>
      </main>
    </div>
  );
}

export default App;
