import "../estilos/footer.css";
import { FaGithub, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <p>© 2025 full stack - Todos los derechos reservados</p>

    <div className="derecha">
    <p>Prevenir es tan importante como curar.</p>
    </div>
      <div className="footer-links">
        <a href="#"><FaGithub /> REPOSITORIO</a>
        <a href="#"><FaInfoCircle /> NOSOTROS</a>
        <a href="#"><FaEnvelope /> CONTACTO</a>
      </div>

      {/* Redes sociales en esquina inferior izquierda */}
      <div className="footer-socials">
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
    </footer>
  );
}
