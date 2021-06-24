import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CheckOutlined } from '@ant-design/icons';
import './styles.css';
import { useEffect } from 'react';

export default function AddButton(props) {
  const { onClick, onClickConfirm } = props;
  const [ isSelected, setIsSelected ] = useState(false);
  const { showTooltip, setShowTooltip } = props;

  const handleOnClick = () => {
    if(isSelected){
      onClickConfirm();
    } else{
      onClick();
    }
    setIsSelected(true);
    setShowTooltip(true);
  }

  //Esconde tooltip após cinco segundos
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    const count = async() => {
      await delay(2000);
      console.log(showTooltip)
      setShowTooltip(false)
    }
    count();
  }, [])

  const toggleVisibility = (value) => {
    setShowTooltip(value)
  }

  return (
    <div className="fixed-widgets">
      <Tooltip 
        title={!isSelected ? "Realizar nova denúncia" : "Confirmar Localização"} 
        color="#001529"
        placement="bottomRight"
        visible={showTooltip}
        >
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