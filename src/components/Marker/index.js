import React from 'react';
import { EnvironmentTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import './styles.css';

export default function Marker(props){  
  const { onClick, report }  = props;

  const handleClick = () =>{
    onClick(report);
  }
  
  return (
    <>
    <Button
      shape="circle" 
      icon={<EnvironmentTwoTone twoToneColor="#F24C27" />}
      background-color = "#FFF587"
      onClick={handleClick}
    >      
    </Button>
    </>
    
  );
}