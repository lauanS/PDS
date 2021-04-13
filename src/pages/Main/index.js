import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

import Map from '../../components/Gmaps/index';
import Layout from '../../components/Layout/index';
import Marker from '../../components/Marker/index';
import SearchBox from '../../components/SearchBox/index';

export default function Main(){
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [mapInstance, setMapInstance] = useState(false);
  const [mapApi, setMapApi] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const [places, setPlaces] = useState([]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setMapInstance(map);
      setMapApi(maps);
      setApiReady(true);
      console.log("SET TRUE");
    }
    console.log("ESTÁ FALSO");
  };

  return (
    <Layout>
      <Map handleApiLoaded={handleApiLoaded}>
        <Marker            
          lat={-23.55413}
          lng={-46.64044}
          onClick={showDrawer}
        />
        <Marker            
          lat={-23.56313}
          lng={-46.6544}
          onClick={showDrawer}
        />
        <Marker            
          lat={-23.54613}
          lng={-46.63944}
          onClick={showDrawer}
        />
      </Map>
      {apiReady && <SearchBox map={mapInstance} mapApi={mapApi} addplace={setPlaces} />}
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