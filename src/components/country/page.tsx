import { Country } from "@/types";
import "./page.css";
import { useRouter } from "next/navigation";

export const CountryCard = (params: { pais: Country }) => {
  const pais = params.pais;
  const router = useRouter();

  const slug = pais.name.common.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="cardContainer">
      <img
        src={pais.flags?.svg || pais.flags?.png}
        alt={`Bandera de ${pais.name.common}`}
      />
      <h2 className="nombrePais">{pais.name.common}</h2>
      <p className="regionPais">{pais.region}</p>
      <button
        className="botonVer"
        onClick={() => router.push(`/country/${encodeURIComponent(slug)}`)}
      >
        Ver pais
      </button>
    </div>
  );
};