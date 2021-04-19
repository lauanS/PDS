import React, { useState, useEffect, useRef } from 'react';
import { Button, Drawer } from 'antd';

import Map from '../../components/Gmaps/index';
import Layout from '../../components/Layout/index';
import Marker from '../../components/Marker/index';
import SearchBox from '../../components/SearchBox/index';

import { getReports } from '../../services/index';

export default function Main(){
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentReport, setCurrentReport] = useState({});

  const [mapInstance, setMapInstance] = useState(false);
  const [mapApi, setMapApi] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const [places, setPlaces] = useState([]);

  const [reports, setReports] = useState([]);

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const mounted = useRef(true);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const onClickMarker = (report) => {
    setCurrentReport(report);
    showDrawer();
  }

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
          setReports(response);
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
        {!isLoading && !errors && reports.map((report, key) => (
          <Marker
            key={key}
            lat={report.lat}
            lng={report.lng}
            report={report}
            onClick={onClickMarker}
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
            <Button onClick={hideDrawer} style={{ marginRight: 8 }}>
              Fechar
            </Button>
            <Button onClick={null} type="primary">
              Abrir caso
            </Button>
          </div>
        }
      >
        { !isLoading && !errors && <>
          <p>{currentReport.adress}</p>
          <p>Raça/Espécie: {currentReport.animal} 
            {currentReport.breeds && " | " + currentReport.breeds}</p>
          <p>Situação: {currentReport.status} </p>
        </>}
      </Drawer>
    </Layout>
  );
}