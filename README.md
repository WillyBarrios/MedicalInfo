## Despliegue en producción

Para desplegar MedicalInfo en un servidor o hosting estático:

1. Genera la versión optimizada de la aplicación:
	```
	npm run build
	```
2. El contenido final estará en la carpeta `dist/`.
3. Sube el contenido de `dist/` a tu servidor, Netlify, Vercel, GitHub Pages o cualquier hosting estático.
4. Si usas rutas personalizadas, asegúrate de configurar el servidor para que todas las rutas apunten a `index.html` (Single Page Application).

## Capturas de pantalla

Pantalla principal:

![Pantalla principal](./screenshots/main.png)

Dashboard de favoritos:

![Dashboard](./screenshots/dashboard.png)

Barra de búsqueda:

![Barra de búsqueda](./screenshots/searchbar.png)

> Puedes agregar tus propias capturas en la carpeta `/screenshots`.

## Autores y contacto

- Willy Barrios (Desarrollador principal)
- Colaboradores: [Agrega aquí otros nombres si aplica]

Contacto: [Tu email o enlace de contacto]

# MedicalInfo

MedicalInfo es un sistema web desarrollado en React + Vite que permite consultar información de medicamentos, gestionar favoritos y asignar horarios de toma de medicamentos. El sistema está orientado a usuarios que desean acceder de forma rápida y sencilla a datos oficiales sobre medicamentos disponibles en España, integrando la API pública de la Agencia Española de Medicamentos y Productos Sanitarios (CIMA).

## Características principales

- Búsqueda de medicamentos por nombre usando la API oficial de CIMA.
- Visualización de información relevante: nombre, ID, vía de administración, laboratorio, imágenes.
- Gestión de favoritos: agrega y elimina medicamentos favoritos.
- Asignación de horarios personalizados a cada medicamento favorito.
- Interfaz moderna y responsiva.

## Funcionamiento de la API (CIMA)

El sistema utiliza la API pública de CIMA para obtener información de medicamentos. La consulta principal se realiza a:

```
GET https://cima.aemps.es/cima/rest/medicamentos?nombre={nombre}
```

Donde `{nombre}` es el nombre (o parte del nombre) del medicamento a buscar. La respuesta incluye un array de medicamentos con información relevante.

### Ejemplo de respuesta

```json
{
  "resultados": [
	 {
		"nombre": "ALOPURINOL NORMON 300 mg comprimidos EFG",
		"nregistro": "12345",
		"formaFarmaceutica": { "nombre": "comprimido" },
		"labcomercializador": "Normon S.A.",
		"foto": "/images/medicamento.jpg"
		// ...otros campos
	 }
  ]
}
```

## Instalación y uso

1. Clona el repositorio:
	```
	git clone https://github.com/WillyBarrios/MedicalInfo.git
	cd MedicalInfo
	```
2. Instala las dependencias:
	```
	npm install
	```
3. Crea un archivo `.env` en la raíz si quieres usar la búsqueda de imágenes de Google (opcional):
	```
	VITE_GOOGLE_API_KEY=tu_api_key
	VITE_GOOGLE_CX=tu_cx
	```
4. Inicia el servidor de desarrollo:
	```
	npm run dev
	```
5. Accede a `http://localhost:5173` en tu navegador.

## ¿Cómo buscar medicamentos?

1. Usa la barra de búsqueda superior o el botón "Busca medicamento".
2. Escribe el nombre del medicamento y presiona Enter o haz clic en "Buscar".
3. Se mostrarán los resultados obtenidos desde la API de CIMA.
4. Puedes agregar medicamentos a favoritos y asignarles horarios personalizados.

## Estructura del proyecto

- `src/modules/Cards.jsx`: Muestra los resultados de búsqueda y permite agregar favoritos.
- `src/modules/useMedicamentos.js`: Hook personalizado para consultar la API de CIMA.
- `src/pages/Dashboard.jsx`: Página de favoritos y gestión de horarios.
- `src/modules/SearchBar.jsx`: Barra de búsqueda reutilizable.
- `src/modules/Footer.jsx` y `src/modules/Navbar.jsx`: Componentes de navegación y pie de página.

## Créditos y licencias

Este proyecto utiliza la API pública de CIMA (AEMPS) y puede requerir clave de API de Google para imágenes opcionales. Uso educativo y demostrativo.
