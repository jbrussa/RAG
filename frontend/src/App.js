import './App.css';
import Section from './components/Section.jsx';
import Navbar from './components/Navbar.jsx';
import React, {useState, useEffect} from 'react';
import Title from './components/Title.jsx';

function App() {

  const [chat, setChat] = useState(false);
  const [show, setShow] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // UseEffect para agregar la clase show para el titulo
  useEffect(() => {
      setTimeout(() => setShow(true), 100); // Agrega la clase después de 100ms
  }, []);

  // UseEffect para obtener el ID de la sesión
  useEffect(() => {
    fetch('http://127.0.0.1:8000/session', {
      method: 'POST',  // Especifica que es una solicitud GET
    }) 
      .then(response => response.json())
      .then(data => {
        setSessionId(data.id); // Asumiendo que la respuesta es { "id": session_id }
        console.log('Sesión obtenida');
      })
      .catch(error => {
        console.error('Error al obtener la sesión:', error);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  if (!chat) {  
  return (
    <div className="App">
     <Section>  
      <Navbar />
      <div className="container">
        <Title clase={`element ${show ? "show" : ""}`}>Empowering Humanity Through AI</Title>
        <input className="input" type="text" placeholder="Chat with us" onSubmit={() => setChat(true)} />
      </div>


     </Section>
    </div>
  );
} else {
  return (
    <div className="App">
     <Section>  
      <Navbar />

     </Section>
    </div>

);
}
}

export default App;
