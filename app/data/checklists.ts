type ChecklistItem = {
  id: string;
  title: string;
  documents: string[];
  fees: string[];
  faq: string[];
};

type Services = {
  oci: ChecklistItem[];
  passport: ChecklistItem[];
  visa: ChecklistItem[]
  evisa: ChecklistItem[]
};

type Checklists = {
  india: Services;
};


export const CHECKLISTS: Checklists = {
  india: {
    oci: [
      {
        id: "oci-adult",
        title: "OCI ADULT APPLICATION CHECKLIST",
        documents: [
          "Photograph - In color - Size: 2 inch x 2 inch (51mm x 51mm)",
          "Signature - Use blue or black ink only",
          "Copy of Current Valid Passport (Self-attested)",
          "Copy of Last Held Indian Passport (First 2 and last 2 pages)",
          "Copy of Naturalization Certificate (Self-attested)",
          "Copy of Renunciation Certificate / Surrender Certificate (Self-attested)",
          "Proof of Legal Status in the USA (Self-attested)",
          "Birth Certificate",
          "Proof of Marital Status (Self-attested)",
          "Name Change Document or Notarized Affidavit",
          "Proof of Employment / Work Letter (Self-attested)",
          "Proof of Current Address (Driving License or Utility Bill)",
          "OCI Undertaking & Affidavit In Lieu of Original",
        ],
        fees: [
          "Consular Fees $350.00",
          "Professional Service Charge $150 (Notary, copying, application support)",
          "2 Photos (2x2 white background) $10",
          "Birth Certificate Apostille Normal $150 / Expedited $250",
        ],
        faq: [
          "For re-issuance of OCI after new passport, name change, or card loss.",
          "Processing time: 45 business days once received by the Consulate.",
        ],
      },
      {
        id: "oci-minor",
        title: "OCI MINOR APPLICATION CHECKLIST",
        documents: [
          "Photograph - In color - 2x2 inch",
          "Signature - Blue/Black ink only",
          "Parental Authorization Form (Original & Notarized)",
          "Copy of Current Valid Passport (Self-attested)",
          "Copy of Last Held Indian Passport / Renunciation Docs",
          "Copy of Naturalization Certificate (Self-attested)",
          "Marriage Certificate of Parents",
          "Proof of Legal Status of Parents (Self-attested)",
          "Copies of OCI cards issued to parents (if any)",
          "Proof of Current Address (Driving License)",
        ],
        fees: [
          "Consular Fees $350.00",
          "Service Fee $150.00 (Notary + Copies + Support)",
          "2 Photos (2x2) $10",
        ],
        faq: [
          "Processing: 45 business days once the application reaches Consulate/Embassy.",
        ],
      },
      {
        id: "oci-spouse",
        title: "OCI SPOUSE BORN OUTSIDE (FOREIGN NATIONAL)",
        documents: [
          "Duly signed OCI forms (digital or printed)",
          "Photograph & Signature per specs",
          "Valid Passport Copy (6+ months validity)",
          "Applicant’s Apostilled Birth Certificate",
          "Marriage Certificate (registered/apostilled)",
          "Spouse’s passport + OCI card (if applicable)",
          "Proof of Legal Status (Green Card, EAD, Visa, etc.)",
          "Employment / Work Letter or Statement",
          "Proof of Current U.S. Address",
          "Affidavit in Lieu of Originals (Notarized)",
        ],
        fees: [
          "Consular Fees $350.00",
          "Service Fee $150.00 + $50 if expedited",
          "Photos (2x2 white background) $10",
        ],
        faq: [
          "Processing: 45 business days once received by Consulate.",
        ],
      },
      {
        id: "oci-pio-replacement",
        title: "OCI REGISTRATION (In Lieu of valid PIO card)",
        documents: [
          "Indian Passport Copy (Canceled)",
          "Renunciation Certificate",
          "US Passport Copy (Self-attested)",
          "Driving License / Utility Bill / Lease Proof",
          "Birth Certificate",
          "Naturalization Certificate",
          "Marriage Certificate",
          "PIO Card Original",
          "Two 2x2 Photos (white background)",
        ],
        fees: [
          "Govt Fees $183.90",
          "Service Fee $150.00 + Expedited $50.00",
          "Photos $10",
          "Total $293.90",
        ],
        faq: [
          "Processing: 45 business days once received by Consulate/Embassy.",
        ],
      },
      {
        id: "oci-lost",
        title: "OCI LOST / DAMAGED",
        documents: [
          "US Passport Copy (Self-attested)",
          "Driving License or Utility Bill as Address Proof",
          "Police Report for Lost OCI",
          "Naturalization Certificate Copy",
          "Birth Certificate Copy",
          "Marriage Certificate Copy",
          "Spouse Passport + OCI Copy (if applicable)",
          "Two 2x2 Photos (white background)",
        ],
        fees: [
          "Consular Fees $250.00",
          "Service Fee $150.00 + Expedited $50.00",
          "Photos $10",
        ],
        faq: [
          "Processing: 45 business days once received by Consulate/Embassy.",
        ],
      },
      {
        id: "oci-update",
        title: "OCI UPDATE / MISC SERVICE",
        documents: [
          "US Passport Copy",
          "Driving License or Utility Bill (Address Proof)",
          "OCI Copy (Front & Back)",
          "Naturalization Certificate or Date Mention",
          "Renunciation Indian Passport Copy",
          "Applicant Signature & One Photo (2x2 white background)",
        ],
        fees: [
          "Total Fee $100.00",
          "Processing: 24 hours (one day)",
        ],
        faq: [
          "Use for address, passport, or minor updates.",
        ],
      },
      {
        id: "oci-surrender",
        title: "OCI SURRENDER",
        documents: ["Original OCI Card", "Driving License Copy"],
        fees: [
          "Consular Fees $350.00",
          "Service Fee $150.00",
          "Photos $10",
        ],
        faq: ["Used when surrendering OCI permanently."],
      },
    ],
    passport: [
      {
        id: "passport-adult",
        title: "INDIAN PASSPORT RENEWALS FOR ADULT",
        documents: [
          "Original Indian Passport",
          "Legal Status Proof (GC/H1B)",
          "Driver License (Address Proof)",
          "Two 2x2 Photos (White Background)",
          "Marriage Certificate (if adding spouse name)",
          "Name Change Document (if applicable)",
          "Indian Address Proof (Adhaar / Ration Card)",
        ],
        fees: [
          "Consular Fees $150.00",
          "Quartus Fee $100",
          "Expedited $50 (Same Day)",
          "Pictures $10",
        ],
        faq: ["Processing: 1–2 weeks once application reaches Consulate."],
      },
      {
        id: "passport-minor",
        title: "INDIAN PASSPORT RENEWALS FOR MINOR",
        documents: [
          "Original Indian Passport",
          "Parents’ Legal Status & DL Copies",
          "Birth Certificate of Child",
          "Parents’ Passport Copies",
          "Affidavit of Appearance (Annexure D/E)",
          "Two 2x2 Photos (White Background)",
        ],
        fees: [
          "Consular Fee $142.90",
          "Quartus Fee $100",
          "Expedited $50",
          "Photos $10",
        ],
        faq: ["Processing: 4–5 weeks once received by Consulate."],
      },
      {
        id: "passport-lost",
        title: "INDIAN PASSPORT LOST",
        documents: [
          "Copy of Lost Passport & Police Report",
          "Green Card / Visa Copy",
          "Driver License / Utility Bill Proof",
          "Two 2x2 Photos",
          "Marriage Certificate / Name Change Docs",
        ],
        fees: [
          "Consular Fees $250.90",
          "Quartus Fee $100",
          "Expedited $50",
          "Photos $10",
        ],
        faq: ["Processing: 2–3 weeks average turnaround."],
      },
      {
        id: "passport-tatkal",
        title: "INDIAN PASSPORT TATKAL (Urgent)",
        documents: [
          "Original Passport",
          "Legal Status Proof (GC/H1B)",
          "Driver License / Utility Bill",
          "Two 2x2 Photos (White Background)",
          "Marriage Certificate (if adding spouse name)",
          "Indian Address Proof (Adhaar / Ration Card)",
        ],
        fees: [
          "Consular Fees $250.00",
          "Quartus Fee $100",
          "Expedited $50",
          "Pictures $10",
        ],
        faq: ["Processing: 1–2 weeks (Fast-track)"],
      },
    ],
    visa: [
      {
        id: "b1b2-visitor",
        title: "B1/B2 Visitor Visa",
        documents: [
          "Valid Passport (minimum 6 months validity)",
          "DS-160 Confirmation Page",
          "Visa Appointment Confirmation",
          "2 Recent Passport Photos (2x2 inches, white background)",
          "Proof of Financial Capability (Bank Statement, ITR, Salary Slips)",
          "Proof of Employment or Business Ownership",
          "Travel Itinerary / Invitation Letter (if visiting family or business)",
          "Proof of Residence in Home Country (Property or Rent Agreement)",
        ],
        fees: [
          "US Consular Visa Fee: $185",
          "Service Fee: $50 (Form & Document Review)",
        ],
        faq: [
          "Processing time: 7–10 business days (after interview).",
          "Applicants may be asked for additional documents during interview.",
        ],
      },
      {
        id: "f1-student",
        title: "F1 Student Visa",
        documents: [
          "Valid Passport",
          "I-20 Form from SEVP-certified institution",
          "SEVIS Fee Receipt (I-901)",
          "DS-160 Confirmation Page",
          "Visa Appointment Confirmation",
          "Bank Statements (last 6 months) showing ability to fund education",
          "Affidavit of Support (Form I-134 if applicable)",
          "Academic Transcripts and Test Scores (GRE, TOEFL, IELTS)",
          "Admission Letter and Proof of Enrollment",
        ],
        fees: [
          "Visa Application Fee: $185",
          "SEVIS Fee: $350",
        ],
        faq: [
          "You can apply up to 365 days before program start date.",
          "Entry to the U.S. allowed 30 days prior to course start.",
        ],
      },
      {
        id: "h1b-work",
        title: "H1B Work Visa",
        documents: [
          "Valid Passport",
          "I-797 Approval Notice (Original & Copy)",
          "H1B Petition Copy (LCA, Offer Letter, Job Description)",
          "Educational Qualification Proof (Degree Certificates)",
          "Resume / CV",
          "Latest Pay Slips (if already employed in U.S.)",
          "Employer Support Letter",
        ],
        fees: [
          "Filing Fee: $460",
          "ACWIA Fee: $750 / $1500 (based on employer size)",
          "Anti-Fraud Fee: $500",
        ],
        faq: [
          "Processing: 2–6 months (Premium Processing available).",
          "Visa validity: Up to 3 years (renewable to 6 years).",
        ],
      },
      {
        id: "l1-transfer",
        title: "L1 Intra-Company Transfer Visa",
        documents: [
          "Valid Passport",
          "I-129S Form (L1 Petition)",
          "Employment Verification Letter",
          "Salary Proof / Pay Slips",
          "Company Organizational Chart",
          "Educational Certificates",
        ],
        fees: [
          "Visa Fee: $500",
          "Fraud Prevention Fee: $500",
          "Premium Processing (Optional): $2500",
        ],
        faq: [
          "Used for transfer within the same company to U.S. branch.",
          "Validity: 1–3 years initially, extendable up to 7 years.",
        ],
      },
      {
        id: "j1-exchange",
        title: "J1 Exchange Visa",
        documents: [
          "DS-2019 Form issued by sponsor organization",
          "SEVIS Fee Receipt",
          "DS-160 Confirmation",
          "Valid Passport",
          "Sponsor Letter or Training Plan",
          "Financial Proof (Bank Statements, Sponsor Letter)",
        ],
        fees: [
          "Visa Fee: $185",
          "SEVIS Fee: $220",
        ],
        faq: [
          "Applies to exchange visitors, trainees, and interns.",
          "Some categories may have 2-year home residency rule.",
        ],
      },
      {
        id: "k1-fiance",
        title: "K1 Fiancé(e) Visa",
        documents: [
          "Valid Passport",
          "Form I-129F (Petition for Alien Fiancé)",
          "Proof of Relationship (Photos, Chats, etc.)",
          "Affidavit of Support (Form I-134)",
          "Medical Examination Report",
          "Police Clearance Certificate",
          "2 Photos (2x2 inch white background)",
        ],
        fees: [
          "Filing Fee: $535 (I-129F)",
          "Visa Fee: $265",
        ],
        faq: [
          "Used for fiancés of U.S. citizens entering to marry within 90 days.",
        ],
      },
      {
        id: "o1-extraordinary",
        title: "O1 Extraordinary Ability Visa",
        documents: [
          "Valid Passport",
          "Form I-797 Approval Notice",
          "Detailed Resume",
          "Letters of Recommendation (at least 3)",
          "Evidence of Awards, Media Coverage, Memberships",
          "Employment Contract or Offer Letter",
        ],
        fees: [
          "Visa Fee: $460",
          "Premium Processing (optional): $2500",
        ],
        faq: [
          "For individuals with extraordinary ability in arts, science, or business.",
        ],
      },
      {
        id: "tn-nafta",
        title: "TN/TD NAFTA Visa",
        documents: [
          "Valid Passport",
          "Employment Letter from U.S. Company",
          "Proof of Canadian/Mexican Citizenship",
          "Educational Credentials Evaluation (if required)",
          "Resume / CV",
        ],
        fees: [
          "Visa Fee: $50 (land) or $56 (air)",
        ],
        faq: [
          "Available to Canadian and Mexican citizens under NAFTA/USMCA.",
        ],
      }],
    evisa: [
      {
        id: "tourist-evisa",
        title: "Tourist E-Visa",
        documents: [
          "Valid Passport with at least 6 months validity from date of arrival",
          "Recent Passport-size Photograph (2x2 inch, white background)",
          "Scanned Bio Page of Passport (PDF under 300 KB)",
          "Confirmed Return Ticket",
          "Proof of Sufficient Funds (Bank Statement or Employment Proof)",
          "Hotel Booking or Accommodation Proof",
          "Travel Itinerary (optional but recommended)",
        ],
        fees: [
          "Visa Fee (varies by nationality, typically $25–$80)",
          "Service Fee $20 (Document verification & upload assistance)",
        ],
        faq: [
          "Processing Time: 3–5 business days after submission.",
          "Validity: 30 days from date of arrival (Double Entry allowed).",
          "Can be applied up to 120 days before intended travel date.",
        ],
      },
      {
        id: "business-evisa",
        title: "Business E-Visa",
        documents: [
          "Valid Passport (6+ months validity)",
          "Scanned Bio Page of Passport",
          "Recent Photo (2x2 inch white background)",
          "Business Card or Company Letterhead",
          "Invitation Letter from Indian Company",
          "Proof of Funds and Return Ticket",
        ],
        fees: [
          "Visa Fee (varies by country, approx. $80–$100)",
          "Service Fee $25 (Application support and file preparation)",
        ],
        faq: [
          "Processing Time: 3–5 business days.",
          "Validity: Up to 1 year, multiple entries allowed.",
          "Used for attending business meetings, trade fairs, or establishing contacts.",
        ],
      },
      {
        id: "medical-evisa",
        title: "Medical E-Visa",
        documents: [
          "Valid Passport (minimum 6 months validity)",
          "Recent Passport Photo (2x2 inch white background)",
          "Letter from Recognized Medical Institution in India",
          "Scanned Bio Page of Passport",
          "Proof of Funds (Bank Statement)",
          "Return Air Ticket Booking",
        ],
        fees: [
          "Visa Fee: $80 (average, varies by country)",
          "Service Fee: $25 (Verification & upload support)",
        ],
        faq: [
          "Processing: 3–4 working days after submission.",
          "Validity: 60 days from date of arrival (Triple Entry allowed).",
          "Can bring up to 2 medical attendants under Medical Attendant E-Visa.",
        ],
      },
      {
        id: "crew-evisa",
        title: "Crew E-Visa",
        documents: [
          "Valid Passport (6+ months validity)",
          "Employment Proof from Airline / Shipping Company",
          "Letter of Assignment or Duty Letter",
          "Scanned Bio Page of Passport",
          "Recent Passport Photo (2x2 inch white background)",
          "Return or Onward Ticket",
        ],
        fees: [
          "Visa Fee: $80 (average, depends on nationality)",
          "Service Fee: $25 (Support for digital upload)",
        ],
        faq: [
          "Processing Time: 3–5 working days.",
          "Validity: 30 days from entry (Single Entry).",
          "Applicable for crew members of airlines, ships, or charters.",
        ],
      },
    ],

  },
};
