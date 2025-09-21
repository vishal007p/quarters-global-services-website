"use client";

import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useGetCountriesQuery } from "@/services/countryApi";
import { useGetPlatformServiceCategoriesQuery } from "@/services/platformCategoryApi";
import DropdownWrapper from "./DropdownWrapper";
import { savePlatformServiceStep } from "@/lib/platformServiceStorage";

// --- Type Definitions ---
type DropdownOption = {
  id?: string;
  name: string;
  slug: string;
};

// --- Sample States ---
const states: DropdownOption[] = [
  { id: "1", name: "Alabama", slug: "alabama" },
  { id: "2", name: "Alaska", slug: "alaska" },
  { id: "3", name: "Arizona", slug: "arizona" },
  { id: "4", name: "Arkansas", slug: "arkansas" },
  { id: "5", name: "California", slug: "california" },
  { id: "6", name: "Colorado", slug: "colorado" },
  { id: "7", name: "Connecticut", slug: "connecticut" },
  { id: "8", name: "Delaware", slug: "delaware" },
  { id: "9", name: "Florida", slug: "florida" },
  { id: "10", name: "Georgia", slug: "georgia" },
];

// --- Go Button ---
const GoButton = ({ handleGo }: { handleGo: () => void }) => (
  <div className="w-full md:w-auto flex items-center mt-4 md:mt-0">
    <button
      onClick={handleGo}
      className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition"
    >
      Go
    </button>
  </div>
);

// --- DropdownForm Component ---
function DropdownForm({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const router = useRouter();

  // --- Fetch Countries ---
  const { data } = useGetCountriesQuery();
  const apiCountries: DropdownOption[] =
    data?.data?.data?.map((country: any) => ({
      id: country._id,
      code:country.code,
      name: country.name,
      slug: country.slug,
    })) || [];

  // --- Fetch Passport & Apostille Options ---
  const { data: passportList } = useGetPlatformServiceCategoriesQuery({
    platformServiceSlug: "passport",
    toCountrySlug: "", // updated dynamically later
  });

  const { data: apostilleOptions } = useGetPlatformServiceCategoriesQuery({
    platformServiceSlug: "apostilleOptions",
    toCountrySlug: "",
  });

  const apiPassport: DropdownOption[] =
    passportList?.data?.data?.map((item: any) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
    })) || [];

  const apostilleOption: DropdownOption[] =
    apostilleOptions?.data?.data?.map((item: any) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
    })) || [];

  // --- State ---
  const [citizenship, setCitizenship] = useState<DropdownOption | null>(null);
  const [citizenshipSearch, setCitizenshipSearch] = useState("");

  const [country, setCountry] = useState<DropdownOption | null>(null);
  const [countrySearch, setCountrySearch] = useState("");

  const [stateOrCountry, setStateOrCountry] = useState<DropdownOption | null>(null);
  const [stateSearch, setStateSearch] = useState("");

  const [passportType, setPassportType] = useState<DropdownOption | null>(null);
  const [passportSearch, setPassportSearch] = useState("");

  const [apostilleType, setApostilleType] = useState<DropdownOption | null>(null);
  const [apostilleSearch, setApostilleSearch] = useState("");

  const [errors, setErrors] = useState({
    citizenship: "",
    country: "",
    state: "",
    passport: "",
    apostille: "",
  });

  // --- Filter Options ---
  const filteredCountries = apiCountries.filter((option) =>
    option.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCitizenships = apiCountries.filter((option) =>
    option.name.toLowerCase().includes(citizenshipSearch.toLowerCase())
  );

  const filteredStates = states.filter((option) =>
    option.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredApostille = apostilleOption.filter((option) =>
    option.name.toLowerCase().includes(apostilleSearch.toLowerCase())
  );

  // --- Validation ---
  const validate = () => {
    let newErrors = { ...errors };
    if (activeTab === "visa") {
      newErrors = {
        citizenship: citizenship ? "" : "Please select citizenship",
        country: country ? "" : "Please select country",
        state: stateOrCountry ? "" : "Please select state",
        passport: "",
        apostille: "",
      };
    } else if (activeTab === "passport") {
      newErrors = {
        citizenship: "",
        country: country ? "" : "Please select country",
        state: "",
        passport: passportType ? "" : "Please select passport type",
        apostille: "",
      };
    } else if (activeTab === "apostille") {
      newErrors = {
        citizenship: "",
        country: country ? "" : "Please select country",
        state: "",
        passport: "",
        apostille: apostilleType ? "" : "Please select apostille type",
      };
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  // --- Handle Go ---
  const handleGo = () => {
    if (!validate()) return;

    if (activeTab === "visa") {
      router.push(`/visa?country=${country?.id}`);
      savePlatformServiceStep({ platformServiceId: country?.id });
    } else if (activeTab === "passport") {
      router.push(
        `/passport/plan-section?toCountrySlug=${country?.slug}&platformServiceCategorySlug=${passportType?.slug}`
      );
      savePlatformServiceStep({ platformServiceId: country?.id });
    } else if (activeTab === "apostille") {
      router.push(`/apostille?type=${apostilleType?.slug}`);
    }
  };

  // --- Tabs ---
  const tabs = ["visa", "passport", "apostille"];

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-8 text-sm font-medium mt-10 text-white mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 transition ${activeTab === tab
              ? "border-blue-500 text-blue-400 font-semibold"
              : "border-transparent hover:text-blue-300"
              }`}
          >
            {tab === "visa"
              ? "Expedited Visas"
              : tab === "passport"
                ? "Expedited Passport"
                : "Apostille & Legalization"}
          </button>
        ))}
      </div>

      {/* Visa Form */}
      {activeTab === "visa" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center">
          <DropdownWrapper
            value={citizenship}
            setValue={setCitizenship}
            search={citizenshipSearch}
            setSearch={setCitizenshipSearch}
            filteredOptions={filteredCitizenships}
            errors={errors.citizenship}
            placeholder="Select Citizenship"
            type="flag"
          />
          <DropdownWrapper
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Select Country"
            type="flag"
          />
          <DropdownWrapper
            value={stateOrCountry}
            setValue={setStateOrCountry}
            search={stateSearch}
            setSearch={setStateSearch}
            filteredOptions={filteredStates}
            errors={errors.state}
            placeholder="Select State"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}

      {/* Passport Form */}
      {activeTab === "passport" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center">
          <DropdownWrapper
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Select Country"
            type="flag"
          />
          <DropdownWrapper
            value={passportType}
            setValue={setPassportType}
            search={passportSearch}
            setSearch={setPassportSearch}
            filteredOptions={apiPassport}
            errors={errors.passport}
            placeholder="Select Passport Type"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}

      {/* Apostille Form */}
      {activeTab === "apostille" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center">
          <DropdownWrapper
            value={country}
            setValue={setCountry}
            search={countrySearch}
            setSearch={setCountrySearch}
            filteredOptions={filteredCountries}
            errors={errors.country}
            placeholder="Select Country"
            type="flag"
          />
          <DropdownWrapper
            value={apostilleType}
            setValue={setApostilleType}
            search={apostilleSearch}
            setSearch={setApostilleSearch}
            filteredOptions={filteredApostille}
            errors={errors.apostille}
            placeholder="Select Apostille Type"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}
    </div>
  );
}

export default DropdownForm;
