"use client"

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../app/globals.css";

interface Country {
  name: string;
  population: number;
  flag: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((country: any) => ({
          name: country.name.common,
          population: country.population,
          flag: country.flags.svg,
        }));
        setCountries(formattedData);
        setFilteredCountries(formattedData);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div>
      <Head>
        <title style={{fontWeight: "600", fontSize: "24px"}}>Countries</title>
      </Head>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Countries List</h1>
        <input
          type="text"
          placeholder="Search for a country..."
          className="p-2 border rounded w-full mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="county">
          {filteredCountries.map((country, index) => (
            <li key={index} className="p-4 border-b">
              <Link href={`/details/${country.name}`}>
                <div className="flex items-center space-x-4">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-10 h-6"
                  />
                  <span>
                    {country.name} - {country.population.toLocaleString()}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
