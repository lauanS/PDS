import React from 'react';

import './styles.css';

export default function Report(props) {
  const {src} = props;
  return (
    <div className="video-play">
      <video width="100%" controls>
        <source src={src} />
        Seu navegador não suporta um player de vídeo
      </video>
    </div>
  );
}