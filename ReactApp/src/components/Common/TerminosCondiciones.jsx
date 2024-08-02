import React, { useState } from 'react';
import "../styles/stylesUtils/shape-divider6074.css";
import "../styles/stylesCommon/TerminosCondiciones.css";

const TerminosYCondiciones = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const secciones = [
    {
      titulo: "1. Uso del Servicio",
      contenido: (
        <div>
          <p>Nuestro servicio de acortamiento de URLs está diseñado para crear versiones más cortas de enlaces web largos. Al utilizar nuestro servicio, usted acepta:</p>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
            <li>No utilizar nuestro servicio para acortar URLs que contengan contenido ilegal, ofensivo, difamatorio o que viole los derechos de terceros.</li>
            <li>No intentar manipular o sobrecargar nuestros sistemas mediante el uso de bots, scripts automatizados o cualquier otro medio.</li>
            <li>No utilizar nuestro servicio para spam, phishing, o cualquier actividad maliciosa.</li>
            <li>Ser el único responsable del contenido al que apuntan los enlaces que acorta.</li>
          </ul>
        </div>
      )
    },
    {
      titulo: "2. Cuenta de Usuario",
      contenido: (
        <div>
          <p>Al crear una cuenta en nuestro servicio, usted acepta:</p>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
            <li>Proporcionar información precisa y actualizada durante el proceso de registro.</li>
            <li>Mantener la confidencialidad de su contraseña y no compartirla con terceros.</li>
            <li>Ser responsable de todas las actividades que ocurran bajo su cuenta.</li>
            <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</li>
          </ul>
        </div>
      )
    },
    {
      titulo: "3. Privacidad y Datos",
      contenido: (
        <div>
          <p>Respetamos su privacidad y nos comprometemos a proteger sus datos personales. Al usar nuestro servicio:</p>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
            <li>Aceptamos recopilar y utilizar su información de acuerdo con nuestra Política de Privacidad.</li>
            <li>Podemos recopilar datos analíticos anónimos sobre el uso de los enlaces acortados.</li>
            <li>No venderemos ni compartiremos su información personal con terceros sin su consentimiento expreso.</li>
            <li>Tiene derecho a solicitar la eliminación de su cuenta y datos asociados en cualquier momento.</li>
          </ul>
        </div>
      )
    },
    {
      titulo: "4. Limitación de Responsabilidad",
      contenido: (
        <div>
          <p>Al utilizar nuestro servicio de acortamiento de URLs, usted entiende y acepta que:</p>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
            <li>Proporcionamos el servicio "tal cual" y no garantizamos su disponibilidad ininterrumpida o libre de errores.</li>
            <li>No somos responsables del contenido de los sitios web a los que dirigen los enlaces acortados.</li>
            <li>No nos hacemos responsables de cualquier daño directo, indirecto, incidental o consecuente que pueda surgir del uso de nuestro servicio.</li>
            <li>Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento sin previo aviso.</li>
          </ul>
        </div>
      )
    },
    {
      titulo: "5. Propiedad Intelectual",
      contenido: (
        <div>
          <p>Con respecto a la propiedad intelectual:</p>
          <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
            <li>Todos los derechos, títulos e intereses en y del servicio, incluyendo software, imágenes, texto, gráficos, logos, patentes, marcas registradas y otros derechos de propiedad intelectual son y permanecerán propiedad exclusiva de nuestra empresa.</li>
            <li>Usted se compromete a no reproducir, distribuir, modificar o crear trabajos derivados de cualquier material encontrado o accesible a través de nuestro servicio sin nuestra autorización expresa.</li>
            <li>Al utilizar nuestro servicio, nos otorga una licencia mundial, no exclusiva y libre de regalías para usar, reproducir y distribuir los enlaces que acorta a través de nuestro servicio.</li>
          </ul>
        </div>
      )
    },
    {
      titulo: "6. Modificaciones de los Términos",
      contenido: (
        <div>
          <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Al continuar utilizando nuestro servicio después de dichas modificaciones, usted acepta los nuevos términos. Es su responsabilidad revisar regularmente estos términos para mantenerse informado de cualquier cambio.</p>
        </div>
      )
    }
  ];

  return (
    <div className='terminos-y-condiciones shapedividers_com-6074'>
      <h1 className='terminos-y-condiciones-title'>Términos y Condiciones</h1>
      {secciones.map((seccion, index) => (
        <div key={index} className='terminos-y-condiciones-section'>
          <button
            onClick={() => toggleSection(index)}
            className='terminos-y-condiciones-section-title'
          >
            {seccion.titulo}
          </button>
          <div className={`terminos-y-condiciones-section-content ${expandedSection === index ? 'expanded' : ''}`}>
            {seccion.contenido}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TerminosYCondiciones;
