import React, { useState, useEffect, useRef } from 'react';
import { Button, Drawer, Modal } from 'antd';

import Map from '../../components/Gmaps/index';
import Layout from '../../components/Layout/index';
import Marker from '../../components/Marker/index';
import SearchBox from '../../components/SearchBox/index';
import AddButton from '../../components/AddButton/index';
import Report from '../../components/Report';

import alertIcon from '../../assets/alert.png';

import { getReports } from '../../services/index';


export default function Main(){
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentReport, setCurrentReport] = useState({});

  const [mapInstance, setMapInstance] = useState(false);
  const [mapApi, setMapApi] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const [places, setPlaces] = useState([]);

  const [reports, setReports] = useState([]);

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const mounted = useRef(true);


  const addPin = (map, maps) => {
    var icon = {
      url: alertIcon,
      scaledSize: new maps.Size(32, 32), // scaled size
    };
    new maps.Marker({
      position: { lat: -23.558676911772462, lng: -46.64665970163575 },
      map: map,
      draggable: true,
      icon: icon
    });
  
  }

  const setCurrentLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log({
                center: [position.coords.latitude, position.coords.longitude],
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }
}

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

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

  const onClickReport = (newReport) => {
    console.log([...reports, newReport]);
    addPin(mapInstance, mapApi);
    setReports([...reports, newReport]);
  }

  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setMapInstance(map);
      setMapApi(maps);
      setApiReady(true);
    }
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
      <AddButton mapInstance={mapInstance} onClick={showModal}/>
      {apiReady && <SearchBox map={mapInstance} mapApi={mapApi} addplace={setPlaces} />}
      
      <Modal title="Denúncia" visible={modalVisible} onCancel={hideModal}>
        <Report />
      </Modal>      
      
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