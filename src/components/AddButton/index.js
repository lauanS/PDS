import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './styles.css';

export default function AddButton(props) {
  const handleOnClick = () => {

    props.onClick({
      "lat":props.mapInstance.getCenter().lat(),
      "lng":props.mapInstance.getCenter().lng(),
      "date": "XX",
      "adress": "Avenida Nova Denúncia, 37, São Paulo, SP",
      "animal": "Cacatua",
      "breeds": "",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis ligula accumsan leo efficitur finibus. Donec quis nisl condimentum, mattis purus id, dictum urna.",
      "status": "closed"
    });
  } 

  return (
    <div className="fixed-widgets">
      <Tooltip title="Realizar nova denúncia" color="yellow">
        <Button 
          type="primary" 
          shape="circle" 
          icon={<PlusOutlined />} 
          size="large" 
          onClick={handleOnClick}
        />
      </Tooltip>
    </div>
  );
  
}