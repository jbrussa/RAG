import "./App.css";
import Section from "./components/Section.jsx";
import Navbar from "./components/Navbar.jsx";
import React, { useState, useEffect, useRef } from "react";
import Title from "./components/Title.jsx";
import MessageBox from "./components/MessageBox.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  // Estados y variables
  const [section2, setSection2] = useState(false);
  const [show, setShow] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]); // Un solo estado para las consultas y respuestas
  const [thinking, setThinking] = useState(false); // Un solo estado para las consultas y respuestas

  const messagesEndRef = useRef(null); // Referencia al final del chat para hacer scroll

  // UseEffect para agregar la clase show para el titulo
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  // UseEffect para obtener el ID de la sesión
  useEffect(() => {
    fetch("http://127.0.0.1:8000/session", {
      method: "POST", // Especifica que es una solicitud GET
    })
      .then((response) => response.json())
      .then((data) => {
        setSessionId(data.id); // Asumiendo que la respuesta es { "id": session_id }
        console.log("Sesión obtenida");
      })
      .catch((error) => {
        console.error("Error al obtener la sesión:", error);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  // UseEffect para hacer scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Se ejecuta cuando cambian los mensajes

  // función para enviar mensajes al chatbot
  const sendMessage = (query) => {
    if (!sessionId) {
      console.error("No hay sesión activa.");
      return;
    }

    const newQueryMessage = {
      type: "query",
      text: query,
    };
    // Actualizar el estado con el nuevo mensaje de consulta
    setMessages((prevMessages) => [...prevMessages, newQueryMessage]);

    // Activar el estado de "pensando" mientras se espera la respuesta
    setThinking(true);

    fetch("http://127.0.0.1:8000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: sessionId,
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Agregar las respuestas a la lista de mensajes
        const newResponseMessage = {
          type: "response",
          text: data,
        };
        // Actualizamos el estado con la nueva respuesta
        setMessages((prevMessages) => [...prevMessages, newResponseMessage]);

        // Desactivar el estado de "pensando" una vez recibida la respuesta
        setThinking(false);
      })
      .catch((error) => console.error("Error al llamar a /message:", error));
  };

  if (!section2) {
    return (
      <div className="App">
        <Section>
          <Navbar />
          <div className="container">
            <Title clase={`element ${show ? "show" : ""}`}>
              Empowering Humanity Through AI
            </Title>

            <input
              className="input"
              type="text"
              placeholder="Chat with us"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e.target.value);
                  e.target.value = "";
                  setSection2(true);
                }
              }}
            />
          </div>
        </Section>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Section>
          <Navbar />
          <div className="container">
            <Chat>
              {messages.map((message, index) => (
                <MessageBox key={index} classname={message.type}>
                  {message.text}
                </MessageBox>
              ))}
              <div ref={messagesEndRef} />
              {thinking && (
                <MessageBox id="thinking" classname="response">
                  <l-bouncy size="25" speed="1.50" color="white"></l-bouncy>
                </MessageBox>
              )}
            </Chat>

            <input
              className="input"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </Section>
      </div>
    );
  }
}

export default App;
