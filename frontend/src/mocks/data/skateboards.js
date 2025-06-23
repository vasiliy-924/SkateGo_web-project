import { SKATEBOARD_STATUSES } from '../types';

export const skateboards = [
  {
    id: 1,
    name: "Boosted Mini X",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 95,
    location: {
      lat: 55.751244,
      lng: 37.618423
    },
    model: "Boosted Mini X",
    price_per_hour: 500,
    price_per_minute: 10,
    image_url: "/images/skateboards/boosted-mini-x.jpg"
  },
  {
    id: 2,
    name: "Evolve GTR Bamboo",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 85,
    location: {
      lat: 55.753215,
      lng: 37.622504
    },
    model: "Evolve GTR Bamboo",
    price_per_hour: 600,
    price_per_minute: 12,
    image_url: "/images/skateboards/evolve-gtr.jpg"
  },
  {
    id: 3,
    name: "OneWheel Pint",
    status: SKATEBOARD_STATUSES.RENTED,
    battery_level: 45,
    location: {
      lat: 55.749511,
      lng: 37.613757
    },
    model: "OneWheel Pint",
    price_per_hour: 450,
    price_per_minute: 9,
    image_url: "/images/skateboards/onewheel-pint.jpg"
  },
  {
    id: 4,
    name: "Meepo V3",
    status: SKATEBOARD_STATUSES.MAINTENANCE,
    battery_level: 0,
    location: {
      lat: 55.752220,
      lng: 37.617634
    },
    model: "Meepo V3",
    price_per_hour: 400,
    price_per_minute: 8,
    image_url: "/images/skateboards/meepo-v3.jpg"
  },
  {
    id: 5,
    name: "Backfire G3",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 100,
    location: {
      lat: 55.755814,
      lng: 37.617635
    },
    model: "Backfire G3",
    price_per_hour: 550,
    price_per_minute: 11,
    image_url: "/images/skateboards/backfire-g3.jpg"
  }
]; 