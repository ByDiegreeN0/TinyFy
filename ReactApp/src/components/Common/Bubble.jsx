import React, { useEffect, useRef, useState } from 'react';
import "../styles/stylesCommon/Bubble.css"; // Estilos personalizados

// Componente Bubble que renderiza una burbuja animada
export const Bubble = ({ size, initialX, speed, initialY, color }) => {
  const ref = useRef(null); // Referencia para manipular el DOM
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Variables para la posición y movimiento de la burbuja
    let posX = initialX;
    let posY = initialY || window.innerHeight;
    let speedY = speed || -0.3; // Velocidad base de movimiento vertical
    let wobble = 0;
    let wobbleSpeed = Math.random() * 0.02; // Velocidad de movimiento lateral

    const animate = () => {
      if (!element || !element.parentNode) return;

      // Movimiento ondulante lateral
      wobble += wobbleSpeed;
      const xOffset = Math.sin(wobble) * 20; // Movimiento suave lateral

      // Actualización de la posición vertical
      posY += speedY;

      // Aplicar la transformación en X y Y
      element.style.transform = `translate(${posX + xOffset}px, ${posY}px)`;

      // Reiniciar la posición vertical cuando salga de la pantalla
      if (posY + size < 0) {
        posY = window.innerHeight;
      }

      requestAnimationFrame(animate); // Continuar la animación
    };

    animate(); // Iniciar la animación

  }, [size, initialX, speed, initialY]);

  return (
    <div ref={ref} className="bubble">
      <div
        className="bubble-inner"
        style={{
          width: `${size}px`, // Definir el tamaño de la burbuja
          height: `${size}px`,
          background: color, // Mantener el color fijo al aparecer
        }}
      />
    </div>
  );
};