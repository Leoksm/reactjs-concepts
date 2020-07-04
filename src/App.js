import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repositoy ${Date.now()}`,
      url: 'http://github.com/leo.git',
      techs: ['Javascript']
    });
    const repository = response.data;
    setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if (response.status===204) {
        setRepositories(repositories.filter(item => item.id !== id));
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
