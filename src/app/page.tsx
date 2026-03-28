"use client"
import { useEffect, useState } from "react";
import "./globals.css";
import "./page.css";
import { Country } from "../types";
import { CountryCard } from "../components/country/page";
import { getAllCountries } from "../lib/api/getAllCountries";

const Home = () => {
  const [inputName, setInputName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [miError, setError] = useState<string>("");

  const borrarFiltros = () => {
    setInputName("");
    setSearch("");
    setCountries(allCountries);
  };

  useEffect(() => {
    getAllCountries()
      .then((res) => {
        const sorted = res.data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAllCountries(sorted);
        setCountries(sorted);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setCountries(allCountries);
      return;
    }
    const filtrados = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(filtrados);
  }, [search, allCountries]);

  return (
    <div className="mainContainer">
      <h1 className="tituloPrincipal">Paises del Mundo</h1>

      <form
        className="buscador"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(inputName);
        }}
      >
        <label>Pais: </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
            setSearch(e.target.value);
          }}
        />
        {search && (
          <button type="button" className="botonBorrar" onClick={borrarFiltros}>
            Borrar Filtros
          </button>
        )}
      </form>

      <div className="botones">
        <button onClick={() => setSearch(inputName)}>Buscar</button>
      </div>

      {loading && <h2>Loading...</h2>}
      {miError && <h2>{miError}</h2>}

      {!loading && (
        <p className="totalResultados">{countries.length} Paises encontrados</p>
      )}

      <div className="countriesContainer">
        {countries.length > 0 ? (
          countries.map((c) => (
            <CountryCard key={c.name.common} pais={c} />
          ))
        ) : (
          !loading && <p className="noResultados">No se han encontrado paises</p>
        )}
      </div>
    </div>
  );
};

export default Home;