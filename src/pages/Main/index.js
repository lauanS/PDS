import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

import Map from '../../components/Gmaps/index';
import Layout from '../../components/Layout/index';
import Marker from '../../components/Marker/index';



export default function Main(){
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout>
      <Map>
        <Marker            
          lat={59.955413}
          lng={30.337844}
          onClick={showDrawer}
        />
      </Map>

      <Drawer
        title="Informações sobre a denúncia"
        placement="bottom"
        closable={false}
        onClose={hideDrawer}
        visible={drawerVisible}
        footer ={
          <div>
            <Button onClick={null} style={{ marginRight: 8 }}>
              Fechar
            </Button>
            <Button onClick={null} type="primary">
              Abrir caso
            </Button>
          </div>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Layout>
  );
}