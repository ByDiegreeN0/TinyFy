import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "../components/styles/TextWithBorder.css"; 

const TextWithBorder = ({ children }) => {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: "0px",
      duration: 2000,
      delay: 200,
      origin: "bottom",
      reset: true,
    });

    sr.reveal(".text-with-border", {
      afterReveal: function (el) {
        el.style.borderBottomWidth = "3px"; // Establecer el grosor inicial del borde
        el.style.borderBottomColor = "#333"; // Color inicial del borde
        el.style.width = `${el.clientWidth}px`; // Ajustar el ancho inicial al texto
        el.style.transition = "width 0.5s ease"; // Transición para el efecto de expansión
      },
    });
  }, []);

  return <>{children}</>; // Renderiza los hijos dentro del componente
};

export default TextWithBorder;
