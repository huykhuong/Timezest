import React, { useEffect, useState } from "react";
import ButtonList from "../components/ButtonList";
import ContainerPanel from "../components/ContainerPanel";
import Header from "../components/Header";
import { getAvailableAppointments } from "../utils/getAvailableAppontments";

const Homepage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api.npoint.io/48a6a7f6c2e0f8dd6761"
      );

      const data = response.json();

      const availableTime = getAvailableAppointments(data);
      setAppointments(availableTime);
    };

    getData();
  }, []);

  return (
    <ContainerPanel>
      <Header />
      <ButtonList appointments={appointments} />
    </ContainerPanel>
  );
};

export default Homepage;
