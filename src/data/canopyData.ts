import { Canopy, Manufacturer } from '../types';

export const canopiesData: Canopy[] = [
  {
    "id": "8bc35daf-c7c0-46fb-95c4-a6e58fba086f",
    "name": "Sabre3",
    "cells": "9",
    "firstYearOfProduction": "2020",
    "manufacturerId": "541E8673-69E0-458A-8633-A3698311FD4B",
    "availableSizes": [89, 97, 107, 120, 135, 150, 170, 190, 210, 230],
    "url": "https://www.performancedesigns.com/sabre3",
    "links": [
      {
        "type": "youtube",
        "title": "Sabre3",
        "id": "cYh8JgfxYME"
      },
      {
        "type": "youtube",
        "title": "SABRE3: Two Years Since The Release",
        "id": "NsVNNZhQqQ4"
      }
    ],
    "crossbraced": false,
    "category": 3
  },
  {
    "id": "c1723ad6-0b19-4fec-bb0f-b1df674a989e",
    "name": "Sabre2",
    "cells": "9",
    "firstYearOfProduction": "2001",
    "lastYearOfProduction": "2020",
    "manufacturerId": "541E8673-69E0-458A-8633-A3698311FD4B",
    "availableSizes": [97, 107, 120, 135, 150, 170, 190, 210, 230, 260],
    "url": "https://www.performancedesigns.com/sabre2",
    "links": [
      {
        "type": "youtube",
        "title": "Sabre2",
        "id": "OS0lkMLpyTA"
      }
    ],
    "crossbraced": false,
    "category": 3
  },
  {
    "id": "0e50d9c5-9137-4e47-8ef3-92d13ad53a8c",
    "name": "Pilot",
    "cells": "9",
    "manufacturerId": "aeac3fd1-4aaa-4b2d-90c3-1d8b77f89c8e",
    "availableSizes": [90, 96, 104, 111, 117, 124, 132, 140, 150, 168, 188, 210, 230, 250],
    "url": "https://www.flyaerodyne.com/canopy-pilot.html",
    "links": [
      {
        "type": "youtube",
        "title": "Aerodyne Pilot 188 some Openings & Landings",
        "id": "WB9qogEb6SI"
      }
    ],
    "crossbraced": false,
    "category": 2
  },
  {
    "id": "9d4a0836-43cb-4337-a04e-cfde3a1edcf0",
    "name": "Pilot 7",
    "cells": "7",
    "manufacturerId": "aeac3fd1-4aaa-4b2d-90c3-1d8b77f89c8e",
    "availableSizes": [117, 127, 137, 147, 167, 187, 207, 227, 247, 277],
    "url": "https://www.flyaerodyne.com/canopy-pilot-7.html",
    "links": [
      {
        "type": "youtube",
        "title": "Aerodyne Pilot7 ZPX 147sqf - Wingsuit Openings",
        "id": "S0kAdYobGek"
      }
    ],
    "crossbraced": false,
    "category": 2
  },
  {
    "id": "fd7bc927-eba2-4d05-aeaa-0fde72c67e71",
    "name": "Karma",
    "cells": "9",
    "manufacturerId": "aeac3fd1-4aaa-4b2d-90c3-1d8b77f89c8e",
    "availableSizes": [93, 99, 109, 119, 129, 149],
    "url": "https://www.flyaerodyne.com/karma.html",
    "crossbraced": false,
    "category": 5
  },
  { 
    "id": "8ddccedd-a5be-41a9-a460-5b0fa918b90a",
    "name": "Petra",
    "cells": "9",
    "firstYearOfProduction": "2012",
    "manufacturerId": "13cc7d53-c38f-4722-9a93-7a059c5ad663",
    "availableSizes": [55, 57, 61, 65, 71, 77, 83, 89],
    "url": "https://www.jyro.com/product/petra",
    "links": [
      {
        "type": "youtube",
        "title": "Petra | JYRO",
        "id": "jDXG3-Rmu3E"
      }
    ],
    "crossbraced": true,
    "category": 7
  },
  { 
    "id": "59f8ac99-a1a8-4dbc-88f9-e9949498fe86",
    "name": "Crossfire 3",
    "cells": "9",
    "manufacturerId": "13cc7d53-c38f-4722-9a93-7a059c5ad663",
    "availableSizes": [89, 99, 109, 119, 129, 139, 149, 159],
    "url": "https://www.jyro.com/product/crossfire-3",
    "links": [
      {
        "type": "youtube",
        "title": "JYRO Crossfire 3 | The Art of Flight",
        "id": "LvirTl9i8QM"
      },
      {
        "type": "youtube",
        "title": "JYRO Crossfire 3 | In Flight",
        "id": "wqQ7yiuJPDw"
      }
    ],
    "crossbraced": false,
    "category": 5
  }
];

export const manufacturersData: Manufacturer[] = [
  {
    "id": "541E8673-69E0-458A-8633-A3698311FD4B",
    "name": "Performance Designs",
    "country": "United States",
    "shortname": "PD",
    "url": "https://www.performancedesigns.com"
  },
  {
    "id": "13cc7d53-c38f-4722-9a93-7a059c5ad663",
    "name": "JYRO",
    "country": "New Zealand",
    "shortname": "JYRO",
    "url": "https://www.jyro.com"
  },
  {
    "id": "aeac3fd1-4aaa-4b2d-90c3-1d8b77f89c8e",
    "name": "Aerodyne",
    "country": "New Zealand",
    "shortname": "Aerodyne",
    "url": "https://www.flyaerodyne.com"
  },
];