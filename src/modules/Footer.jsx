import "../estilos/footer.css";
import { FaGithub, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        
        {/* IZQUIERDA: Redes sociales */}
        <div className="footer-left footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>

        {/* CENTRO: Texto + links */}
        <div className="footer-center">
          <p>© 2025 full stack - Todos los derechos reservados</p>
          <div className="footer-links">
            <a href="https://github.com/WillyBarrios/MedicalInfo.git"><FaGithub /> REPOSITORIO</a>
            <a href="/nosotros"><FaInfoCircle /> NOSOTROS</a>
            <a href="/contacto"><FaEnvelope /> CONTACTO</a>
          </div>
        </div>

        {/* DERECHA: Frase */}
        <div className="footer-right derecha">
          Prevenir es tan importante como curar.
        </div>

      </div>
    </footer>
  );
}
