import React, { useState } from 'react';
import { EnvironmentTwoTone } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import './styles.css';

export default function Marker(props){  
  const { onClick }  = props;
  return (
    <>
    <Button
      shape="circle" 
      icon={<EnvironmentTwoTone twoToneColor="#F24C27" />}
      background-color = "#FFF587"
      onClick={onClick}
    >      
    </Button>
    </>
    
  );
}