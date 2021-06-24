import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Button, Drawer, Modal, message } from "antd";

import Map from "../../components/Gmaps/index";
import Marker from "../../components/Marker/index";
import SearchBox from "../../components/SearchBox/index";
import AddButton from "../../components/AddButton/index";
import Report from "../../components/Report";
import ModalViewReport from "../../components/ViewReport/Modal";
import alertIcon from "../../assets/alert.png";

import { getReports } from "../../services/index";
import { Context } from "../../context/authContext";
import { statusTranslate } from "../../utils/statusConverter";

export default function Main() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);;

  const [currentReport, setCurrentReport] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    lat: -23.5532481,
    lng: -46.6402224,
  });

  const [mapInstance, setMapInstance] = useState(false);
  const [mapApi, setMapApi] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const [ , setPlaces] = useState([]);
  const [address, setAddress] = useState("");

  const [reports, setReports] = useState([]);
  const [marker, setMarker] = useState(null);

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);

  const { isAuthenticated } = useContext(Context);

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getReports();
      if (mounted.current) {
        setReports(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (mounted.current) {
        console.log(error);
        setIsLoading(false);
        setErrors(true);
        message.error("Erro ao carregar as denúncias");
      }
    }
    return;
  }, []);

  const latLngToAddress = useCallback(
    async (latlng) => {
      if (apiReady) {
        if (latlng.lat === 0) {
          return "Without address";
        }

        const geocoder = new mapApi.Geocoder();
        await geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setErrors(true);
              console.log("No results found");
              setAddress("Endereço não encontrado");
            }
          } else {
            setErrors(true);
            console.log("Geocoder failed due to: " + status);
            setAddress("Erro ao buscar o endereço");
          }
        });
      }
    },
    [mapApi, apiReady]
  );

  const addMarker = (map, maps) => {
    var icon = {
      url: alertIcon,
      scaledSize: new maps.Size(32, 32),
    };

    const marker = new maps.Marker({
      position: map.getCenter(),
      map: map,
      draggable: true,
      icon: icon,
    });

    // Atualiza a posição quando reposicionar o marker
    marker.addListener("dragend", () => {
      setCurrentLocation(marker.getPosition().toJSON());
    });

    setMarker(marker);
    setCurrentLocation(marker.getPosition().toJSON());
  };

  const removeMarker = () => {
    // Remove do mapa
    marker.setMap(null);
    // Remove da página
    setMarker(null);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showReportModal = () => {
    setModalReportVisible(true);
    hideDrawer();
  };

  const onFinishForm = async () => {
    hideModal();
    await loadReports();
  };

  /* Funções para manipulação do drawer*/
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  /* */
  const onClickMarker = (report) => {
    setCurrentReport(report);
    showDrawer();
  };

  const onClickReport = () => {
    addMarker(mapInstance, mapApi);
  };

  const onClickConfirm = () => {
    showModal();
    removeMarker();
  };

  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setMapInstance(map);
      setMapApi(maps);
      setApiReady(true);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const browserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(browserLocation);
        setCurrentLocation(browserLocation);
      });
    }
  };

  /* Carregando as denúncias */
  useEffect(() => {
    loadReports();
    return () => {
      mounted.current = false;
    };
  }, [loadReports]);

  /* Atualiza o endereço */
  useEffect(() => {
    latLngToAddress(currentLocation);
  }, [currentLocation, latLngToAddress]);

  return (
    <>
      <Map handleApiLoaded={handleApiLoaded}>
        {!isLoading &&
          !errors &&
          reports.map((report, key) => (
            <Marker
              key={key}
              lat={report.lat}
              lng={report.lng}
              report={report}
              onClick={onClickMarker}
            />
          ))}
      </Map>
      { !modalVisible && !drawerVisible && isAuthenticated() && (
        <AddButton
          mapInstance={mapInstance}
          onClick={onClickReport}
          onClickConfirm={onClickConfirm}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
        />
      )}
      {apiReady && (
        <SearchBox map={mapInstance} mapApi={mapApi} addplace={setPlaces} />
      )}

      {!isLoading && (
        <Modal
          title="Denúncia"
          visible={modalVisible}
          onCancel={hideModal}
          footer={null}
        >
          <Report
            lat={currentLocation.lat}
            lng={currentLocation.lng}
            address={address}
            onFinish={onFinishForm}
          />
        </Modal>
      )}

      <Drawer
        title="Informações sobre a denúncia"
        placement="bottom"
        closable={false}
        onClose={hideDrawer}
        visible={drawerVisible}
        footer={
          <div>
            <Button onClick={hideDrawer} style={{ marginRight: 8 }}>
              Fechar
            </Button>
            <Button onClick={showReportModal} type="primary">
              Mais detalhes
            </Button>
          </div>
        }
      >
        {!isLoading && !errors && (
          <>
            <p>{currentReport.address}</p>
            <p>
              Raça/Espécie: {currentReport.animal}
              {currentReport.breeds && " | " + currentReport.breeds}
            </p>
            <p>Situação: {statusTranslate(currentReport.status)} </p>
          </>
        )}
      </Drawer>

      {!modalVisible && 
        <ModalViewReport
          report={currentReport}
          modalVisible={modalReportVisible}
          setModalVisible={setModalReportVisible}
        />
      }
    </>
  );
}
