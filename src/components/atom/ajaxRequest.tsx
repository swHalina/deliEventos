import React, { useEffect, useState } from "react";

export const PeticionesAjax = () => {
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState("");
  const [urlSliderImages, setUrlSliderImages] = useState(
    process.env.REACT_APP_remoteHost + "api/sliders/"
  );
  const [urlRuta, setUrlRuta] = useState(
    process.env.REACT_APP_remoteHost + "api/articulos/imagen/"
  );

  const getUsuariosAjaxAW = async () => {
    try {
      const peticion = await fetch(urlSliderImages);
      const datos = await peticion.json();

      let dt = datos.data;
    } catch (error: any) {
      setErrores(error.message);
    }
  };

  useEffect(() => {
    getUsuariosAjaxAW();
  }, []);
};
