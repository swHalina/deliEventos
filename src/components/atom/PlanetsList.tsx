import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
//import { PlanetsDetails } from "./PlanetsDetails";

export const PlanetsList = () => {
  const [errores, setErrores] = useState("");
  // const [urlSwapi, setUrlSwapi] = useState("https://swapi.dev/api/planets/");
  const urlPlanetsList = "https://swapi.dev/api/planets/";
  const [planets, setPlanets] = useState(null);
  const [planet, setPlanet] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const mystyle = {
    color: "white",
    // backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  const getUsuariosAjaxAW = async (urlSwapi: string, callback: any) => {
    try {
      setLoading(true);
      const request = await fetch(urlSwapi);
      const data = await request.json();
      setLoading(false);
      callback(data);
    } catch (error: any) {
      setErrores(error.message);
    }
  };

  const handlePlanet = (index: string) => {
    setPlanets(null);
    const callback = (data: any) => setPlanet(data);
    getUsuariosAjaxAW(`${urlPlanetsList}${index}`, callback);
  };

  const handleBack = () => {
    setIsShown((current) => !current);
    setCount(1);
  };

  const handlePreview = () => {
    setCount(count - 1);
    const callback = (data: any) => setPlanets(data.results);
    getUsuariosAjaxAW(`${urlPlanetsList}?page=${count - 1}`, callback);
  };

  const handleNext = () => {
    setCount(count + 1);
    const callback = (data: any) => setPlanets(data.results);
    getUsuariosAjaxAW(`${urlPlanetsList}?page=${count + 1}`, callback);
  };

  useEffect(() => {
    setPlanet(null);
    const callback = (data: any) => setPlanets(data.results);
    getUsuariosAjaxAW(urlPlanetsList, callback);
  }, [isShown]);

  if (loading == true) {
    // Cuando esta todo cargando
    return <div className="cargando">Cargando datos...</div>;
  } else if (loading == false) {
    return (
      <div style={mystyle}>
        {planet && (
          <button
            onClick={() => handleBack()}
            style={{
              backgroundColor: "lightblue",
              border: "none",
              color: "black",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              borderRadius: 50,
              fontSize: "16px",
            }}
          >
            Back
          </button>
        )}

        {planets && (
          <div>
            <p>
              <span
                style={{
                  marginRight: "2rem",
                }}
              >
                Previus:{count - 1}{" "}
              </span>
              <span
                style={{
                  marginRight: "2rem",
                }}
              >
                Current: {count}
              </span>
              <span>Next: {count + 1}</span>
            </p>
            <div
              style={{
                overflow: "scroll",
                maxHeight: "450px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  color: "#212529",
                }}
              >
                <thead>
                  <tr>
                    <th className="">Id</th>
                    <th className="">Planet</th>
                    <th className="">Name</th>
                    <th className="">Terrain</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    textAlign: "center",
                    width: "30px",
                    height: "300px",
                    overflow: "scroll",
                  }}
                >
                  {planets && planets.length > 0 ? (
                    planets.map((planet, index) => (
                      <tr
                        key={index}
                        onClick={() => handlePlanet(index + 1)}
                        style={{
                          borderTop: "2px solid black",
                        }}
                      >
                        <td scope="col">{index + 1}</td>
                        <td scope="col">
                          <img
                            style={{
                              height: "50%",
                              width: "70px",
                              borderRadius: 50,
                              display: "inline",
                            }}
                            src={
                              "https://www.collinsdictionary.com/images/full/planet_222842452.jpg"
                            }
                          ></img>
                        </td>
                        <td scope="col">{planet.name}</td>
                        <td scope="col">{planet.terrain}</td>
                      </tr>
                    ))
                  ) : (
                    <h4>No Data Found!!</h4>
                  )}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    visibility: count == 1 ? "hidden" : "visible",
                    backgroundColor: "lightblue",
                    border: "none",
                    color: "black",
                    padding: "15px 32px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    borderRadius: 50,
                    fontSize: "16px",
                    marginRight: "2rem",
                  }}
                  onClick={() => handlePreview()}
                >
                  Preview
                </button>
                <button
                  style={{
                    visibility: count == 6 ? "hidden" : "visible",
                    backgroundColor: "lightblue",
                    border: "none",
                    color: "black",
                    padding: "15px 32px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    borderRadius: 50,
                    fontSize: "16px",
                  }}
                  onClick={() => handleNext()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 👇️ show component on click */}
        {planet && <PlanetsDetails data={planet} />}
      </div>
    );
  }
};

export const PlanetsDetails = ({ data }) => {
  return (
    <div>
      <ul>
        <li>
          <span style={{ color: "black" }}>Name:</span> {data.name}
        </li>
        <li>
          <span style={{ color: "black" }}>rotation_period:</span>{" "}
          {data.rotation_period}
        </li>
        <li>
          <span style={{ color: "black" }}>orbital_period:</span>
          {data.orbital_period}
        </li>
        <li>
          <span style={{ color: "black" }}>diameter:</span> {data.diameter}
        </li>
        <li>
          <span style={{ color: "black" }}>climate:</span> {data.climate}
        </li>
        <li>
          <span style={{ color: "black" }}>gravity:</span> {data.gravity}
        </li>
        <li>
          <span style={{ color: "black" }}>terrain:</span>
          {data.terrain}
        </li>
        <li>
          <span style={{ color: "black" }}>surface_water:</span>{" "}
          {data.surface_water}
        </li>
        <li>
          <span style={{ color: "black" }}>population:</span> {data.population}
        </li>
      </ul>
    </div>
  );
};
