"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useGetCountriesQuery } from "@/services/countryApi";
import { useGetPlatformServiceCategoriesQuery } from "@/services/platformCategoryApi";
import DropdownWrapper from "./DropdownWrapper";
import { savePlatformServiceStep } from "@/lib/platformServiceStorage";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";

// --- Type Definitions ---
type DropdownOption = {
  id?: string;
  name: string;
  slug: string;
  code?: string;
};

export type PlatformServiceStep = {
  citizenship?: string;
  country?: string;
  state?: string;
  passportType?: string;
  apostilleType?: string;
  countryCode: string,
  citizenship_code: string | undefined
};


type TabType = "visa" | "passport" | "apostille";

interface DropdownFormProps {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}


// --- Tabs ---
const tabs: TabType[] = ["visa", "passport", "apostille"];

const STORAGE_KEY = "platformServiceStep";


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
  <div className="w-full md:w-auto mt-4 md:mt-0">
    <button
      onClick={handleGo}
      className="w-full md:w-auto bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
    >
      Go
    </button>
  </div>
);


// --- DropdownForm Component ---
function DropdownForm({ activeTab, setActiveTab }: DropdownFormProps) {
  const router = useRouter();

  // --- Fetch Countries ---
  const { data, isLoading: countryLoading } = useGetCountriesQuery();
  const apiCountries: DropdownOption[] =
    data?.data?.data?.map((country: any) => ({
      id: country._id,
      code: country.code,
      name: country.name,
      slug: country.slug,
    })) || [];

  const [country, setCountry] = useState<DropdownOption | null>(null);

  // --- Fetch Passport & Apostille Options ---
  const { data: passportList, isLoading: passportLoading } = useGetPlatformServiceCategoriesQuery({
    platformServiceSlug: "passport",
    toCountrySlug: country?.slug || "",
    fromCountrySlug: country?.slug || ""
  });

  const { data: apostilleOptions, isLoading: apostilleLoading } = useGetPlatformServiceCategoriesQuery({
    platformServiceSlug: "apostilleOptions",
    toCountrySlug: country?.slug || "",
    fromCountrySlug: country?.slug || ""
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


  const [countrySearch, setCountrySearch] = useState("");

  const [stateOrCountry, setStateOrCountry] = useState<DropdownOption | null>(null);
  const [stateSearch, setStateSearch] = useState("");

  const [passportType, setPassportType] = useState<DropdownOption | null>(null);
  const [passportSearch, setPassportSearch] = useState("");

  const [apostilleType, setApostilleType] = useState<DropdownOption | null>(null);
  const [apostilleSearch, setApostilleSearch] = useState("");
  const pathname = usePathname();
  const currentPath = pathname === "/" ? "" : pathname.replace("/", "");
  const visibleTabs = currentPath === "" ? tabs : tabs.filter((tab) => tab === currentPath);

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

  // --- Save to sessionStorage ---
  const saveStep = (step: PlatformServiceStep) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(step));
    }
  };

  // --- Load from sessionStorage ---
  const loadStep = (): PlatformServiceStep | null => {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PlatformServiceStep) : null;
    }
    return null;
  };


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

    const step: PlatformServiceStep = {
      citizenship: citizenship?.slug,
      citizenship_code: citizenship?.code,
      country: country?.slug,
      countryCode: (country as any)?.code, // ✅ store country.code
      state: stateOrCountry?.slug,
      passportType: passportType?.slug,
      apostilleType: apostilleType?.slug,
    };
    saveStep(step);
    if (activeTab === "visa") {
      router.push(`/visa?toCountrySlug=${country?.slug}&fromCountrySlug=${citizenship?.slug}`);
      savePlatformServiceStep({ platformServiceId: country?.id });
    } else if (activeTab === "passport") {
      router.push(
        `/passport/plan-section?toCountrySlug=${country?.slug}&platformServiceCategorySlug=${passportType?.slug}&fromCountrySlug=${citizenship?.slug}`
      );
      savePlatformServiceStep({ platformServiceId: country?.id });
    } else if (activeTab === "apostille") {
      router.push(`/apostille?type=${apostilleType?.slug}&&fromCountrySlug=${citizenship?.slug}`);
    }
  };

  useEffect(() => {
    const saved = loadStep();
    if (saved) {
      if (saved.citizenship)
        setCitizenship({
          id: saved.citizenship,
          name: saved.citizenship,
          slug: saved.citizenship,
          code: saved.citizenship_code,
        });

      if (saved.country && saved.countryCode)
        setCountry({
          id: saved.countryCode,
          code: saved.countryCode,
          name: saved.country,
          slug: saved.country,
        });

      if (saved.state)
        setStateOrCountry({
          id: saved.state,
          name: saved.state,
          slug: saved.state,
        });

      if (saved.passportType)
        setPassportType({
          id: saved.passportType,
          name: saved.passportType,
          slug: saved.passportType,
        });

      if (saved.apostilleType)
        setApostilleType({
          id: saved.apostilleType,
          name: saved.apostilleType,
          slug: saved.apostilleType,
        });
    }

    if (currentPath === "visa" || currentPath === "passport" || currentPath === "apostille") {
      setActiveTab(currentPath as TabType);
    }
  }, [currentPath, setActiveTab])

  if (countryLoading || passportLoading || apostilleLoading) { // your loading condition
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-row gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            height={40}
            width={250}
            borderRadius={6}
            baseColor="#e0e0e0"       // optional: background color
            highlightColor="#f0f0f0"  // optional: animation highlight
            enableAnimation={true}     // ensures animation runs
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex justify-center space-x-8 text-sm font-medium mt-10 text-white mb-6 min-w-max">
          {visibleTabs.map((tab) => (
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
