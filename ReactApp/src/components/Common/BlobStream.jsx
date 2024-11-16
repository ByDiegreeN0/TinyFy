import React, { useState, useEffect } from "react";
import { Bubble } from "./Bubble"; // Componente Bubble
import "../styles/stylesCommon/BlobStream.css"; // Estilos

export const BlobStream = () => {
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    let blobId = 0;

    // Función para generar un nuevo blob con una probabilidad de ser grande o pequeño
    const createBlob = () => {
      let size;
      
      // Aumentar la probabilidad de burbujas pequeñas
      if (Math.random() > 0.7) { 
        size = Math.random() * (150 - 100) + 100; // Burbujas grandes (más raras)
      } else {
        size = Math.random() * (80 - 20) + 20; // Burbujas pequeñas (más comunes)
      }

      const x = Math.random() * (window.innerWidth - 80); // Ajuste para el tamaño máximo
      const speed = Math.random() * (0.3 - 0.05) + 0.05; // Velocidad variable
      const direction = Math.random() > 0.5 ? 1 : -1; // Subida o bajada
      const color = getRandomBlueGradient(); // Color azul fijo
      const borderRadius = getRandomBorderRadius(); // Forma aleatoria

      return {
        id: blobId++,
        size,
        x,
        speed,
        direction,
        color,
        borderRadius, // Añadimos la propiedad border-radius
      };
    };

    // Crear una cantidad inicial moderada de burbujas
    const initialBlobs = Array.from({ length: 5 }, createBlob);
    setBlobs(initialBlobs);

    // Intervalo para crear nuevas burbujas gradualmente
    const createInterval = setInterval(() => {
      setBlobs((prev) => [...prev, createBlob()]);
    }, 800);

    // Limitar la cantidad de burbujas
    const cleanupInterval = setInterval(() => {
      setBlobs((prev) => {
        if (prev.length > 100) {
          return prev.slice(-80);
        }
        return prev;
      });
    }, 800);

    return () => {
      clearInterval(createInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Función para generar un color azul aleatorio
  const getRandomBlueGradient = () => {
    const hue = Math.random() * (220 - 200) + 200; // Rango de tonos azules
    const sat1 = Math.random() * (100 - 70) + 70;
    const sat2 = Math.random() * (100 - 70) + 70;
    const light1 = Math.random() * (90 - 60) + 60;
    const light2 = Math.random() * (80 - 50) + 50;

    return `linear-gradient(${Math.random() * 360}deg,
      hsl(${hue}, ${sat1}%, ${light1}%) 0%,
      hsl(${hue}, ${sat2}%, ${light2}%) 100%)`;
  };

  // Función para generar border-radius aleatorio
  const getRandomBorderRadius = () => {
    const tl = Math.random() * 50 + 30; // 30% a 80%
    const tr = Math.random() * 50 + 30;
    const br = Math.random() * 50 + 30;
    const bl = Math.random() * 50 + 30;

    const tl2 = Math.random() * 50 + 30;
    const tr2 = Math.random() * 50 + 30;
    const br2 = Math.random() * 50 + 30;
    const bl2 = Math.random() * 50 + 30;

    return `${tl}% ${tr}% ${br}% ${bl}% / ${tl2}% ${tr2}% ${br2}% ${bl2}%`;
  };

  return (
    <div className="blob-container">
      {blobs.map((blob) => (
        <Bubble
          key={blob.id}
          size={blob.size}
          initialX={blob.x}
          speed={blob.speed * blob.direction}
          color={blob.color}
          borderRadius={blob.borderRadius} // Pasamos el border-radius al componente Bubble
        />
      ))}
    </div>
  );
};

export default BlobStream;
