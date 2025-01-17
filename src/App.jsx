import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('Programming');
  const [loading, setLoading] = useState(false);

  const jokeCategories = [
    'Programming',
    'Miscellaneous',
    'Puns',
    'Spooky',
    'Christmas',
    'Dark'
  ];

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=single`);
      setJoke(response.data.joke);
    } catch (error) {
      console.error('Erro ao buscar piada', error);
      setJoke('Desculpe, houve um erro ao buscar a piada.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, [category]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Gerador de Piadas</h1>

      <div style={styles.selectContainer}>
        <label htmlFor="category" style={styles.label}>Escolha uma categoria:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {jokeCategories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.jokeContainer}>
        <h3 style={styles.jokeHeading}>Piada:</h3>
        {loading ? <p style={styles.loading}>Carregando...</p> : <p style={styles.jokeText}>{joke}</p>}
      </div>

      <button onClick={fetchJoke} style={styles.button}>
        Gerar Piada
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '50%',
    margin: 'auto',
    borderRadius: '15px', // Bordas arredondadas
    backgroundColor: '#aaaaaa', // Aqui você pode alterar para qualquer cor que desejar
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  selectContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '10px',
    display: 'block',
    color: '#34495e',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '2px solid #2980b9',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: '#ecf0f1',
    color: '#34495e', // Definindo a cor do texto do seletor
    transition: 'all 0.3s ease',
  },
  jokeContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#34495e',
    width: 'auto', // Largura fixa para a caixa de piada
    height: '100px', // Altura fixa para a caixa de piada
    padding: '15px', // Adiciona espaço interno
    borderRadius: '15px', // Bordas arredondadas
    border: '2px solid #2980b9',
    backgroundColor: '#ecf0f1',
    overflow: 'auto',
    wordWrap: 'break-word',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para dar o efeito de flutuação
  },
  jokeHeading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  jokeText: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    fontStyle: 'italic',
  },
  root: {
    margin: 'auto',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#e74c3c',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px', // Distância entre o botão e o conteúdo acima
  },
};

export default App;
