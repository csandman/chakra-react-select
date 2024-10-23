import { GroupBase, OptionBase } from "chakra-react-select";

export interface CountryOption extends OptionBase {
  label: string;
  value: string;
}

const countries: GroupBase<CountryOption>[] = [
  {
    label: "Asia",
    options: [
      {
        label: "Afghanistan",
        value: "Afghanistan",
      },
      {
        label: "Armenia",
        value: "Armenia",
      },
      {
        label: "Azerbaijan",
        value: "Azerbaijan",
      },
      {
        label: "Bahrain",
        value: "Bahrain",
      },
      {
        label: "Bangladesh",
        value: "Bangladesh",
      },
      {
        label: "Bhutan",
        value: "Bhutan",
      },
      {
        label: "Brunei",
        value: "Brunei",
      },
      {
        label: "Cambodia",
        value: "Cambodia",
      },
      {
        label: "China",
        value: "China",
      },
      {
        label: "Cyprus",
        value: "Cyprus",
      },
      {
        label: "East Timor",
        value: "East Timor",
      },
      {
        label: "Georgia",
        value: "Georgia",
      },
      {
        label: "Hong Kong",
        value: "Hong Kong",
      },
      {
        label: "India",
        value: "India",
      },
      {
        label: "Indonesia",
        value: "Indonesia",
      },
      {
        label: "Iran",
        value: "Iran",
      },
      {
        label: "Iraq",
        value: "Iraq",
      },
      {
        label: "Israel",
        value: "Israel",
      },
      {
        label: "Japan",
        value: "Japan",
      },
      {
        label: "Jordan",
        value: "Jordan",
      },
      {
        label: "Kazakhstan",
        value: "Kazakhstan",
      },
      {
        label: "Kuwait",
        value: "Kuwait",
      },
      {
        label: "Kyrgyzstan",
        value: "Kyrgyzstan",
      },
      {
        label: "Laos",
        value: "Laos",
      },
      {
        label: "Lebanon",
        value: "Lebanon",
      },
      {
        label: "Macao",
        value: "Macao",
      },
      {
        label: "Malaysia",
        value: "Malaysia",
      },
      {
        label: "Maldives",
        value: "Maldives",
      },
      {
        label: "Mongolia",
        value: "Mongolia",
      },
      {
        label: "Myanmar",
        value: "Myanmar",
      },
      {
        label: "Nepal",
        value: "Nepal",
      },
      {
        label: "North Korea",
        value: "North Korea",
      },
      {
        label: "Oman",
        value: "Oman",
      },
      {
        label: "Pakistan",
        value: "Pakistan",
      },
      {
        label: "Palestine",
        value: "Palestine",
      },
      {
        label: "Philippines",
        value: "Philippines",
      },
      {
        label: "Qatar",
        value: "Qatar",
      },
      {
        label: "Saudi Arabia",
        value: "Saudi Arabia",
      },
      {
        label: "Singapore",
        value: "Singapore",
      },
      {
        label: "South Korea",
        value: "South Korea",
      },
      {
        label: "Sri Lanka",
        value: "Sri Lanka",
      },
      {
        label: "Syria",
        value: "Syria",
      },
      {
        label: "Tajikistan",
        value: "Tajikistan",
      },
      {
        label: "Thailand",
        value: "Thailand",
      },
      {
        label: "Turkey",
        value: "Turkey",
      },
      {
        label: "Turkmenistan",
        value: "Turkmenistan",
      },
      {
        label: "United Arab Emirates",
        value: "United Arab Emirates",
      },
      {
        label: "Uzbekistan",
        value: "Uzbekistan",
      },
      {
        label: "Vietnam",
        value: "Vietnam",
      },
      {
        label: "Yemen",
        value: "Yemen",
      },
    ],
  },
  {
    label: "Europe",
    options: [
      {
        label: "Albania",
        value: "Albania",
      },
      {
        label: "Andorra",
        value: "Andorra",
      },
      {
        label: "Austria",
        value: "Austria",
      },
      {
        label: "Belarus",
        value: "Belarus",
      },
      {
        label: "Belgium",
        value: "Belgium",
      },
      {
        label: "Bosnia and Herzegovina",
        value: "Bosnia and Herzegovina",
      },
      {
        label: "Bulgaria",
        value: "Bulgaria",
      },
      {
        label: "Croatia",
        value: "Croatia",
      },
      {
        label: "Czech Republic",
        value: "Czech Republic",
      },
      {
        label: "Denmark",
        value: "Denmark",
      },
      {
        label: "England",
        value: "England",
      },
      {
        label: "Estonia",
        value: "Estonia",
      },
      {
        label: "Faroe Islands",
        value: "Faroe Islands",
      },
      {
        label: "Finland",
        value: "Finland",
      },
      {
        label: "France",
        value: "France",
      },
      {
        label: "Germany",
        value: "Germany",
      },
      {
        label: "Gibraltar",
        value: "Gibraltar",
      },
      {
        label: "Greece",
        value: "Greece",
      },
      {
        label: "Holy See (Vatican City State)",
        value: "Holy See (Vatican City State)",
      },
      {
        label: "Hungary",
        value: "Hungary",
      },
      {
        label: "Iceland",
        value: "Iceland",
      },
      {
        label: "Ireland",
        value: "Ireland",
      },
      {
        label: "Italy",
        value: "Italy",
      },
      {
        label: "Latvia",
        value: "Latvia",
      },
      {
        label: "Liechtenstein",
        value: "Liechtenstein",
      },
      {
        label: "Lithuania",
        value: "Lithuania",
      },
      {
        label: "Luxembourg",
        value: "Luxembourg",
      },
      {
        label: "North Macedonia",
        value: "North Macedonia",
      },
      {
        label: "Malta",
        value: "Malta",
      },
      {
        label: "Moldova",
        value: "Moldova",
      },
      {
        label: "Monaco",
        value: "Monaco",
      },
      {
        label: "Montenegro",
        value: "Montenegro",
      },
      {
        label: "Netherlands",
        value: "Netherlands",
      },
      {
        label: "Northern Ireland",
        value: "Northern Ireland",
      },
      {
        label: "Norway",
        value: "Norway",
      },
      {
        label: "Poland",
        value: "Poland",
      },
      {
        label: "Portugal",
        value: "Portugal",
      },
      {
        label: "Romania",
        value: "Romania",
      },
      {
        label: "Russian Federation",
        value: "Russian Federation",
      },
      {
        label: "San Marino",
        value: "San Marino",
      },
      {
        label: "Scotland",
        value: "Scotland",
      },
      {
        label: "Serbia",
        value: "Serbia",
      },
      {
        label: "Slovakia",
        value: "Slovakia",
      },
      {
        label: "Slovenia",
        value: "Slovenia",
      },
      {
        label: "Spain",
        value: "Spain",
      },
      {
        label: "Svalbard and Jan Mayen",
        value: "Svalbard and Jan Mayen",
      },
      {
        label: "Sweden",
        value: "Sweden",
      },
      {
        label: "Switzerland",
        value: "Switzerland",
      },
      {
        label: "Ukraine",
        value: "Ukraine",
      },
      {
        label: "United Kingdom",
        value: "United Kingdom",
      },
      {
        label: "Wales",
        value: "Wales",
      },
    ],
  },
  {
    label: "Africa",
    options: [
      {
        label: "Algeria",
        value: "Algeria",
      },
      {
        label: "Angola",
        value: "Angola",
      },
      {
        label: "Benin",
        value: "Benin",
      },
      {
        label: "Botswana",
        value: "Botswana",
      },
      {
        label: "British Indian Ocean Territory",
        value: "British Indian Ocean Territory",
      },
      {
        label: "Burkina Faso",
        value: "Burkina Faso",
      },
      {
        label: "Burundi",
        value: "Burundi",
      },
      {
        label: "Cameroon",
        value: "Cameroon",
      },
      {
        label: "Cape Verde",
        value: "Cape Verde",
      },
      {
        label: "Central African Republic",
        value: "Central African Republic",
      },
      {
        label: "Chad",
        value: "Chad",
      },
      {
        label: "Comoros",
        value: "Comoros",
      },
      {
        label: "Congo",
        value: "Congo",
      },
      {
        label: "Djibouti",
        value: "Djibouti",
      },
      {
        label: "Egypt",
        value: "Egypt",
      },
      {
        label: "Equatorial Guinea",
        value: "Equatorial Guinea",
      },
      {
        label: "Eritrea",
        value: "Eritrea",
      },
      {
        label: "Ethiopia",
        value: "Ethiopia",
      },
      {
        label: "Gabon",
        value: "Gabon",
      },
      {
        label: "Gambia",
        value: "Gambia",
      },
      {
        label: "Ghana",
        value: "Ghana",
      },
      {
        label: "Guinea",
        value: "Guinea",
      },
      {
        label: "Guinea-Bissau",
        value: "Guinea-Bissau",
      },
      {
        label: "Ivory Coast",
        value: "Ivory Coast",
      },
      {
        label: "Kenya",
        value: "Kenya",
      },
      {
        label: "Lesotho",
        value: "Lesotho",
      },
      {
        label: "Liberia",
        value: "Liberia",
      },
      {
        label: "Libyan Arab Jamahiriya",
        value: "Libyan Arab Jamahiriya",
      },
      {
        label: "Madagascar",
        value: "Madagascar",
      },
      {
        label: "Malawi",
        value: "Malawi",
      },
      {
        label: "Mali",
        value: "Mali",
      },
      {
        label: "Mauritania",
        value: "Mauritania",
      },
      {
        label: "Mauritius",
        value: "Mauritius",
      },
      {
        label: "Mayotte",
        value: "Mayotte",
      },
      {
        label: "Morocco",
        value: "Morocco",
      },
      {
        label: "Mozambique",
        value: "Mozambique",
      },
      {
        label: "Namibia",
        value: "Namibia",
      },
      {
        label: "Niger",
        value: "Niger",
      },
      {
        label: "Nigeria",
        value: "Nigeria",
      },
      {
        label: "Reunion",
        value: "Reunion",
      },
      {
        label: "Rwanda",
        value: "Rwanda",
      },
      {
        label: "Saint Helena",
        value: "Saint Helena",
      },
      {
        label: "Sao Tome and Principe",
        value: "Sao Tome and Principe",
      },
      {
        label: "Senegal",
        value: "Senegal",
      },
      {
        label: "Seychelles",
        value: "Seychelles",
      },
      {
        label: "Sierra Leone",
        value: "Sierra Leone",
      },
      {
        label: "Somalia",
        value: "Somalia",
      },
      {
        label: "South Africa",
        value: "South Africa",
      },
      {
        label: "South Sudan",
        value: "South Sudan",
      },
      {
        label: "Sudan",
        value: "Sudan",
      },
      {
        label: "Swaziland",
        value: "Swaziland",
      },
      {
        label: "Tanzania",
        value: "Tanzania",
      },
      {
        label: "The Democratic Republic of Congo",
        value: "The Democratic Republic of Congo",
      },
      {
        label: "Togo",
        value: "Togo",
      },
      {
        label: "Tunisia",
        value: "Tunisia",
      },
      {
        label: "Uganda",
        value: "Uganda",
      },
      {
        label: "Western Sahara",
        value: "Western Sahara",
      },
      {
        label: "Zambia",
        value: "Zambia",
      },
      {
        label: "Zimbabwe",
        value: "Zimbabwe",
      },
    ],
  },
  {
    label: "Oceania",
    options: [
      {
        label: "American Samoa",
        value: "American Samoa",
      },
      {
        label: "Australia",
        value: "Australia",
      },
      {
        label: "Christmas Island",
        value: "Christmas Island",
      },
      {
        label: "Cocos (Keeling) Islands",
        value: "Cocos (Keeling) Islands",
      },
      {
        label: "Cook Islands",
        value: "Cook Islands",
      },
      {
        label: "Fiji Islands",
        value: "Fiji Islands",
      },
      {
        label: "French Polynesia",
        value: "French Polynesia",
      },
      {
        label: "Guam",
        value: "Guam",
      },
      {
        label: "Kiribati",
        value: "Kiribati",
      },
      {
        label: "Marshall Islands",
        value: "Marshall Islands",
      },
      {
        label: "Micronesia, Federated States of",
        value: "Micronesia, Federated States of",
      },
      {
        label: "Nauru",
        value: "Nauru",
      },
      {
        label: "New Caledonia",
        value: "New Caledonia",
      },
      {
        label: "New Zealand",
        value: "New Zealand",
      },
      {
        label: "Niue",
        value: "Niue",
      },
      {
        label: "Norfolk Island",
        value: "Norfolk Island",
      },
      {
        label: "Northern Mariana Islands",
        value: "Northern Mariana Islands",
      },
      {
        label: "Palau",
        value: "Palau",
      },
      {
        label: "Papua New Guinea",
        value: "Papua New Guinea",
      },
      {
        label: "Pitcairn",
        value: "Pitcairn",
      },
      {
        label: "Samoa",
        value: "Samoa",
      },
      {
        label: "Solomon Islands",
        value: "Solomon Islands",
      },
      {
        label: "Tokelau",
        value: "Tokelau",
      },
      {
        label: "Tonga",
        value: "Tonga",
      },
      {
        label: "Tuvalu",
        value: "Tuvalu",
      },
      {
        label: "United States Minor Outlying Islands",
        value: "United States Minor Outlying Islands",
      },
      {
        label: "Vanuatu",
        value: "Vanuatu",
      },
      {
        label: "Wallis and Futuna",
        value: "Wallis and Futuna",
      },
    ],
  },
  {
    label: "North America",
    options: [
      {
        label: "Anguilla",
        value: "Anguilla",
      },
      {
        label: "Antigua and Barbuda",
        value: "Antigua and Barbuda",
      },
      {
        label: "Aruba",
        value: "Aruba",
      },
      {
        label: "Bahamas",
        value: "Bahamas",
      },
      {
        label: "Barbados",
        value: "Barbados",
      },
      {
        label: "Belize",
        value: "Belize",
      },
      {
        label: "Bermuda",
        value: "Bermuda",
      },
      {
        label: "Canada",
        value: "Canada",
      },
      {
        label: "Cayman Islands",
        value: "Cayman Islands",
      },
      {
        label: "Costa Rica",
        value: "Costa Rica",
      },
      {
        label: "Cuba",
        value: "Cuba",
      },
      {
        label: "Dominica",
        value: "Dominica",
      },
      {
        label: "Dominican Republic",
        value: "Dominican Republic",
      },
      {
        label: "El Salvador",
        value: "El Salvador",
      },
      {
        label: "Greenland",
        value: "Greenland",
      },
      {
        label: "Grenada",
        value: "Grenada",
      },
      {
        label: "Guadeloupe",
        value: "Guadeloupe",
      },
      {
        label: "Guatemala",
        value: "Guatemala",
      },
      {
        label: "Haiti",
        value: "Haiti",
      },
      {
        label: "Honduras",
        value: "Honduras",
      },
      {
        label: "Jamaica",
        value: "Jamaica",
      },
      {
        label: "Martinique",
        value: "Martinique",
      },
      {
        label: "Mexico",
        value: "Mexico",
      },
      {
        label: "Montserrat",
        value: "Montserrat",
      },
      {
        label: "Netherlands Antilles",
        value: "Netherlands Antilles",
      },
      {
        label: "Nicaragua",
        value: "Nicaragua",
      },
      {
        label: "Panama",
        value: "Panama",
      },
      {
        label: "Puerto Rico",
        value: "Puerto Rico",
      },
      {
        label: "Saint Kitts and Nevis",
        value: "Saint Kitts and Nevis",
      },
      {
        label: "Saint Lucia",
        value: "Saint Lucia",
      },
      {
        label: "Saint Pierre and Miquelon",
        value: "Saint Pierre and Miquelon",
      },
      {
        label: "Saint Vincent and the Grenadines",
        value: "Saint Vincent and the Grenadines",
      },
      {
        label: "Trinidad and Tobago",
        value: "Trinidad and Tobago",
      },
      {
        label: "Turks and Caicos Islands",
        value: "Turks and Caicos Islands",
      },
      {
        label: "United States",
        value: "United States",
      },
      {
        label: "Virgin Islands, British",
        value: "Virgin Islands, British",
      },
      {
        label: "Virgin Islands, U.S.",
        value: "Virgin Islands, U.S.",
      },
    ],
  },
  {
    label: "Antarctica",
    options: [
      {
        label: "Antarctica",
        value: "Antarctica",
      },
      {
        label: "Bouvet Island",
        value: "Bouvet Island",
      },
      {
        label: "French Southern territories",
        value: "French Southern territories",
      },
      {
        label: "Heard Island and McDonald Islands",
        value: "Heard Island and McDonald Islands",
      },
      {
        label: "South Georgia and the South Sandwich Islands",
        value: "South Georgia and the South Sandwich Islands",
      },
    ],
  },
  {
    label: "South America",
    options: [
      {
        label: "Argentina",
        value: "Argentina",
      },
      {
        label: "Bolivia",
        value: "Bolivia",
      },
      {
        label: "Brazil",
        value: "Brazil",
      },
      {
        label: "Chile",
        value: "Chile",
      },
      {
        label: "Colombia",
        value: "Colombia",
      },
      {
        label: "Ecuador",
        value: "Ecuador",
      },
      {
        label: "Falkland Islands",
        value: "Falkland Islands",
      },
      {
        label: "French Guiana",
        value: "French Guiana",
      },
      {
        label: "Guyana",
        value: "Guyana",
      },
      {
        label: "Paraguay",
        value: "Paraguay",
      },
      {
        label: "Peru",
        value: "Peru",
      },
      {
        label: "Suriname",
        value: "Suriname",
      },
      {
        label: "Uruguay",
        value: "Uruguay",
      },
      {
        label: "Venezuela",
        value: "Venezuela",
      },
    ],
  },
];

export default countries;
