"use client";

import { useEffect, useState } from "react";

interface Country {
  name: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flag: string;
}

export default function CountryDetails({
  params,
}: {
  params: { name: string };
}) {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!params?.name) return;
    fetch(
      `https://restcountries.com/v3.1/name/${decodeURIComponent(params.name)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const c = data[0];
          setCountry({
            name: c.name.common,
            population: c.population,
            region: c.region,
            subregion: c.subregion,
            capital: c.capital?.[0] || "N/A",
            flag: c.flags.svg,
          });
        }
      });
  }, [params.name]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{country.name}</h1>
      <img src={country.flag} alt={country.name} className="w-40 mt-4" />
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Capital: {country.capital}</p>
    </div>
  );
}
