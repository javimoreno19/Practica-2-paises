"use client"
import { useParams, useRouter } from "next/navigation";
import { Country } from "@/types";
import { useState, useEffect } from "react";
import "./page.css";
import { getCountryByName } from "@/lib/api/getCountryByName";

const UnPais = () => {
  const router = useRouter();
  const { name } = useParams();
  const [pais, setPais] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [miError, setError] = useState<string>("");

  useEffect(() => {
    const nombreBuscado = String(name).replace(/-/g, " ");
    getCountryByName(nombreBuscado)
      .then((res) => {
        const data: Country[] = res.data;
        const encontrado =
          data.find(
            (c) =>
              c.name.common.toLowerCase().replace(/\s+/g, "-") === String(name)
          ) ?? data[0];
        setPais(encontrado);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const idiomas = pais?.languages ? Object.values(pais.languages) : [];
  const monedas = pais?.currencies
    ? Object.values(pais.currencies).map((c) => c.name)
    : [];

  return (
    <div className="containerDetalle">
      {loading && <h1>Loading...</h1>}
      {miError && <h2>{miError}</h2>}

      {pais && (
        <>
          <h1>{pais.name.common}</h1>
          <img
            src={pais.flags?.svg || pais.flags?.png}
            alt={`Bandera de ${pais.name.common}`}
          />
          <div className="infoCard">
            <p><span>Nombre oficial: </span>{pais.name.official}</p>
            <p><span>Capital: </span>{pais.capital?.join(", ") ?? "-"}</p>
            <p><span>Region: </span>{pais.region}</p>
            <p><span>Subregion: </span>{pais.subregion ?? "-"}</p>
            <p><span>Poblacion: </span>{pais.population.toLocaleString("es-ES")} hab.</p>
            <p><span>Superficie: </span>{pais.area ? pais.area.toLocaleString("es-ES") + " km2" : "-"}</p>
            {monedas.length > 0 && (
              <p><span>Moneda: </span>{monedas.join(", ")}</p>
            )}
            {idiomas.length > 0 && (
              <p>
                <span>Idiomas: </span>
                <span className="idiomas">
                  {idiomas.map((lang) => (
                    <span key={lang} className="idiomaTag">{lang}</span>
                  ))}
                </span>
              </p>
            )}
          </div>
        </>
      )}

      <button className="botonVolver" onClick={() => router.push("/")}>
        Volver
      </button>
    </div>
  );
};

export default UnPais;
