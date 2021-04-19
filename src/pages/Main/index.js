import React, { useState, useEffect, useRef } from 'react';
import { Button, Drawer } from 'antd';

import Map from '../../components/Gmaps/index';
import Layout from '../../components/Layout/index';
import Marker from '../../components/Marker/index';
import SearchBox from '../../components/SearchBox/index';

import { getReports } from '../../services/index';

export default function Main(){
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [mapInstance, setMapInstance] = useState(false);
  const [mapApi, setMapApi] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const [places, setPlaces] = useState([]);

  const [markers, setMarkers] = useState([]);

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const mounted = useRef(true);

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

  /* Carregando as denúncias */
  useEffect(() => {   
    async function load(){
      setIsLoading(true);
      try {
        const response = await getReports();
        if(mounted.current){
          setMarkers(response);
          setIsLoading(false);  
        }
      } catch (error) {
        if(mounted.current){
          console.log(error);
          setIsLoading(false);  
          setErrors(true);
        }
      }
      return;
    }
    load(); 
    
    return () => {mounted.current = false} 
  }, []);

  return (
    <Layout>
      <Map handleApiLoaded={handleApiLoaded}>
        {!isLoading && !errors && markers.map((marker, key) => (
          <Marker
            key={key}
            lat={marker.lat}
            lng={marker.lng}
            onClick={showDrawer}
          />
        ))}
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