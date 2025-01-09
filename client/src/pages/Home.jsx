import React from "react";
import { Player} from "@lottiefiles/react-lottie-player";
import '../styles/HomeStyles.css';

export const Home = () => {
  return (
    <div className="contenedor">
      <div className="inner-container">
        <div className="text-column">
          <h1>Tu Éxito, Tu Comunidad, Tu Camino.</h1>
          <p>
          UniLearn, es una plataforma colaborativa entre 
          estudiantes, donde se podrá encontrar una 
          personalización educativa, interacción y tutoría en línea 
          inmediata, comunidad de aprendizaje activa y desarrollo 
          integral del estudiante.
          </p>
        </div>
        <div className="animation-column">
          <Player
            autoplay
            loop
            src="https://lottie.host/4d6bb84a-670a-4e2e-9664-d0d075aa37fc/zcvs5uQChy.json"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
