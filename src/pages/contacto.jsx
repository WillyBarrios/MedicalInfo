// Importamos React y el hook useState para manejar estados
import { useState } from "react";
import Navbar from "../modules/Navbar.jsx";
import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
// Importamos emailjs para enviar correos
import emailjs from "emailjs-com";

// Importamos íconos de react-icons (FontAwesome)
import { FaUser, FaBirthdayCake, FaEnvelope, FaCommentDots } from "react-icons/fa";

// Importamos SweetAlert2 para mostrar alertas personalizadas
import Swal from "sweetalert2";

// Importamos el CSS del componente
import "../estilos/contacto.css";

// Importamos el footer
import Footer from '../modules/Footer.jsx';
function useContactoTour() {
  useEffect(() => {
    const driverObj = driver({
      prevBtnText: 'Anterior',
      nextBtnText: 'Siguiente',
      finishBtnText: 'Finalizar',
      doneBtnText: 'Cerrar',
      allowClose: true,
      animate: true,
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '.contact-page',
          popover: {
            title: 'Página de contacto',
            description: 'Aquí puedes ponerte en contacto con nosotros.',
            position: 'right'
          }
        },
        {
          element: '.contact-form',
          popover: {
            title: 'Formulario',
            description: 'Completa el formulario para enviarnos un mensaje.',
            position: 'right'
          }
        },
        {
          element: '.phone',
          popover: {
            title: 'Teléfono',
            description: 'También puedes contactarnos por teléfono.',
            position: 'right'
          }
        },
        {
          element: '.about-title',
          popover: {
            title: 'Terminamos',
            description: 'Fin del tutorial de contacto.',
            position: 'left'
          }
        }
      ]
    });
    driverObj.drive();
  }, []);
}

export default function Contact() {
  useContactoTour();
  // Estado para almacenar los valores del formulario
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    message: ""
  });

  // Estado para mostrar un "cargando" mientras se envía
  const [loading, setLoading] = useState(false);

  // Estado para contar la cantidad de caracteres en el mensaje
  const [charCount, setCharCount] = useState(0);

  // Función que maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtenemos nombre y valor del input
    setForm({ ...form, [name]: value }); // Actualizamos el estado del formulario

    // Si el campo que cambia es el mensaje, actualizamos el contador
    if (name === "message") {
      setCharCount(value.length);
    }
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación básica de campos vacíos
    if (!form.name || !form.age || !form.email || !form.message) {
      Swal.fire("Error", "Por favor completa todos los campos.", "error");
      return;
    }

    // Validación de formato de email con expresión regular
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire("Error", "Ingresa un correo electrónico válido.", "error");
      return;
    }

    setLoading(true); // Mostramos spinner de carga

    // Enviamos los datos con EmailJS
    emailjs.send(
      "service_up2la8p",   // ID del servicio de EmailJS
      "template_xq71zfr",  // ID de la plantilla de EmailJS
      {
        name: form.name,
        age: form.age,
        email: form.email,
        message: form.message,
        to_email: "dorianjosueo@gmail.com" // Correo de destino
      },
      "KyNfe8whSF5wLhrKD" // API key pública de EmailJS
    )
    .then(() => {
      // Si el envío es exitoso
      Swal.fire("¡Éxito!", "Mensaje enviado con éxito.", "success");
      setForm({ name: "", age: "", email: "", message: "" }); // Limpiamos el formulario
      setCharCount(0); // Reiniciamos contador de caracteres
    })
    .catch((error) => {
      // Si ocurre un error
      console.error("Error:", error);
      Swal.fire("Error", "Hubo un problema al enviar el mensaje.", "error");
    })
    .finally(() => setLoading(false)); // Quitamos el estado de carga
  };

  return (
    <>
      <Navbar />
    <div className="contact-page">
      <div className="contact-wrapper">
        
        {/* Lado izquierdo con imagen decorativa */}
        <div className="contact-image">
          <img src="src/assets/img/imagen.jpg" alt="Contacto" />
        </div>

        {/* Lado derecho con formulario */}
        <main className="contact-container">
          {/* Teléfono de contacto */}
          <p className="phone"><strong>Contacto:</strong> 1111-1111</p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="contact-form">
            
            {/* Campo de nombre */}
            <label>
              <FaUser className="icon" /> Nombre:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            {/* Campo de edad */}
            <label>
              <FaBirthdayCake className="icon" /> Edad:
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
              />
            </label>

            {/* Campo de email */}
            <label>
              <FaEnvelope className="icon" /> Correo Electrónico:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            {/* Campo de mensaje */}
            <label>
              <FaCommentDots className="icon" /> Mensaje:
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Inserta tu mensaje aquí"
                rows="4"
                maxLength="500"
                required
              ></textarea>
              {/* Contador de caracteres */}
              <span className="char-count">{charCount}/500</span>
            </label>

            {/* Botón de envío con spinner si está cargando */}
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Enviar"}
            </button>
          </form>
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
}
