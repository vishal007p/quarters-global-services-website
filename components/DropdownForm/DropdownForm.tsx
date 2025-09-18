import { useRouter } from "nextjs-toploader/app";
import DropdownWrapper from "./DropdownWrapper";
import { useState } from "react";
import { useGetCountriesQuery } from "@/services/countryApi";

const GoButton = ({ handleGo }: any) => (
  <div className="w-full md:w-auto flex items-center mt-4 md:mt-0">
    <button
      onClick={handleGo}
      className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition"
    >
      Go
    </button>
  </div>
);

function DropdownForm({ activeTab, setActiveTab }: any) {
  const { data, error, isLoading } = useGetCountriesQuery();

  console.log(data, "datasss")
  const apiCountries =
    //@ts-ignore
    data?.data?.data?.map((country: any) => ({
      id: country._id,
      code: country.code,
      name: country.name,
      slug: country.slug
    })) || [];

  // --- Sample Data ---
  const states = [
    { id: 1, name: "Alabama" },
    { id: 2, name: "Alaska" },
    { id: 3, name: "Arizona" },
    { id: 4, name: "Arkansas" },
    { id: 5, name: "California" },
    { id: 6, name: "Colorado" },
    { id: 7, name: "Connecticut" },
    { id: 8, name: "Delaware" },
    { id: 9, name: "Florida" },
    { id: 10, name: "Georgia" },
  ];


  const passportOptions = [
    { id: 1, name: "Regular Passport" },
    { id: 2, name: "Emergency Passport" },
  ];

  const apostilleOptions = [
    { id: 1, name: "Document Apostille" },
    { id: 2, name: "Legalization Service" },
  ];

  const router = useRouter();

  // --- State ---
  const [citizenship, setCitizenship] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const [citizenshipSearch, setCitizenshipSearch] = useState("");

  const [country, setCountry] = useState<{
    id: string;
    code: string;
    name: string;
  } | null>(null);
  console.log(country, "country")
  const [countrySearch, setCountrySearch] = useState("");

  const [stateOrCountry, setStateOrCountry] = useState("");
  const [stateSearch, setStateSearch] = useState("");

  const [passportType, setPassportType] = useState("");
  const [passportSearch, setPassportSearch] = useState("");

  const [apostilleType, setApostilleType] = useState("");
  const [apostilleSearch, setApostilleSearch] = useState("");

  const [errors, setErrors] = useState({
    citizenship: "",
    country: "",
    state: "",
    passport: "",
    apostille: "",
  });

  // --- Filters ---
  const filteredCountries = apiCountries.filter((option: any) =>
    option.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  console.log(filteredCountries, "filteredCountries")
  const filteredCitizenships = apiCountries.filter((option: any) =>
    option.name.toLowerCase().includes(citizenshipSearch.toLowerCase())
  );
  const filteredStates = states.filter((option) =>
    option.name.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const filteredPassport = passportOptions.filter((option) =>
    option.name.toLowerCase().includes(passportSearch.toLowerCase())
  );
  const filteredApostille = apostilleOptions.filter((option) =>
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
        country: "",
        state: "",
        passport: passportType ? "" : "Please select passport type",
        apostille: "",
      };
    } else if (activeTab === "apostille") {
      newErrors = {
        citizenship: "",
        country: "",
        state: "",
        passport: "",
        apostille: apostilleType ? "" : "Please select apostille type",
      };
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleGo = () => {
    if (validate()) {
      if (activeTab === "visa") {
        router.push(
          `/visa?toCountrySlug=${country?.slug}`
        );
      } else if (activeTab === "passport") {
        router.push(`/passport?type=${passportType}`);
      } else if (activeTab === "apostille") {
        router.push(`/apostille?type=${apostilleType}`);
      }
    }
  };

  // --- Tab Buttons ---
  const tabs = ["visa", "passport", "apostille"];

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-8 text-sm font-medium mt-10 text-white mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
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
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4  justify-center">
          {/* Citizenship */}
          <DropdownWrapper
            value={citizenship}
            setValue={setCitizenship}
            search={citizenshipSearch}
            setSearch={setCitizenshipSearch}
            filteredOptions={filteredCitizenships} // ✅ FIXED
            errors={errors.citizenship}
            placeholder="Select Citizenship"
            type="flag"
          />

          {/* Country */}
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

          {/* State */}
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
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4   justify-center">
          <DropdownWrapper
            value={passportType}
            setValue={setPassportType}
            search={passportSearch}
            setSearch={setPassportSearch}
            filteredOptions={filteredPassport}
            errors={errors.passport}
            placeholder="Select Passport Type"
          />
          <GoButton handleGo={handleGo} />
        </div>
      )}

      {/* Apostille Form */}
      {activeTab === "apostille" && (
        <div className="p-6 rounded-md max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 justify-center ">
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
