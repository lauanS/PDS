import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CheckOutlined } from '@ant-design/icons';

import './styles.css';

export default function AddButton(props) {
  const { onClick, onClickConfirm } = props;
  const [ isSelected, setIsSelected ] = useState(false);
  const handleOnClick = () => {
    if(isSelected){
      onClickConfirm();
    } else{
      onClick();
    }
    setIsSelected(true);    
  } 

  return (
    <div className="fixed-widgets">
      <Tooltip title={!isSelected ? "Realizar nova denúncia" : "Confirmar Localização"} color="yellow">
        <Button 
          type="default" 
          shape="circle" 
          icon={!isSelected ? <PlusOutlined /> : <CheckOutlined /> } 
          size="large" 
          onClick={handleOnClick}
        />
      </Tooltip>
    </div>
  );
  
}