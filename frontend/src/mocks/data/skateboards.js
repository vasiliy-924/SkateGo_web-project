import { 
  SKATEBOARD_STATUSES, 
  SKATEBOARD_TYPES, 
  DIFFICULTY_LEVELS,
  SKATEBOARD_SPECS 
} from '../types';

export const skateboards = [
  {
    id: 1,
    name: "Boosted Mini X",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 95,
    location: {
      lat: 55.751244,
      lng: 37.618423,
      address: "Тверская ул., 15"
    },
    model: "Boosted Mini X",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 500,
    price_per_minute: 10,
    image_url: "/images/skateboards/boosted-mini-x.jpg",
    description: "Компактный электроскейт с мощным двигателем. Идеален для городской среды и коротких поездок.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.FAST,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 32,
      max_range: 22,
      weight: 7.5,
      max_load: 120
    },
    difficulty_level: DIFFICULTY_LEVELS.INTERMEDIATE,
    features: ["Регенеративное торможение", "LED подсветка", "Bluetooth подключение"],
    rating: 4.8,
    total_rides: 156
  },
  {
    id: 2,
    name: "Evolve GTR Bamboo",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 85,
    location: {
      lat: 55.753215,
      lng: 37.622504,
      address: "Мясницкая ул., 13"
    },
    model: "Evolve GTR Bamboo",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 600,
    price_per_minute: 12,
    image_url: "/images/skateboards/evolve-gtr.jpg",
    description: "Премиальный электроскейт с бамбуковой декой. Отличная маневренность и высокая скорость.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.LONG,
      speed: SKATEBOARD_SPECS.SPEED.EXTREME,
      terrain: SKATEBOARD_SPECS.TERRAIN.ALLTERRAIN,
      max_speed: 42,
      max_range: 31,
      weight: 8.5,
      max_load: 130
    },
    difficulty_level: DIFFICULTY_LEVELS.ADVANCED,
    features: ["Сменные колеса", "LCD дисплей", "Режимы скорости"],
    rating: 4.9,
    total_rides: 203
  },
  {
    id: 3,
    name: "OneWheel Pint",
    status: SKATEBOARD_STATUSES.RENTED,
    battery_level: 45,
    location: {
      lat: 55.749511,
      lng: 37.613757,
      address: "Арбат ул., 20"
    },
    model: "OneWheel Pint",
    type: SKATEBOARD_TYPES.ONEWHEEL,
    price_per_hour: 450,
    price_per_minute: 9,
    image_url: "/images/skateboards/onewheel-pint.jpg",
    description: "Уникальный одноколесный электроборд. Интуитивное управление и футуристический дизайн.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.MEDIUM,
      terrain: SKATEBOARD_SPECS.TERRAIN.ALLTERRAIN,
      max_speed: 26,
      max_range: 20,
      weight: 10.5,
      max_load: 115
    },
    difficulty_level: DIFFICULTY_LEVELS.INTERMEDIATE,
    features: ["Самобалансировка", "Интегрированная ручка", "Мобильное приложение"],
    rating: 4.7,
    total_rides: 178
  },
  {
    id: 4,
    name: "Meepo V3",
    status: SKATEBOARD_STATUSES.MAINTENANCE,
    battery_level: 0,
    location: {
      lat: 55.752220,
      lng: 37.617634,
      address: "Большая Дмитровка ул., 7/5"
    },
    model: "Meepo V3",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 400,
    price_per_minute: 8,
    image_url: "/images/skateboards/meepo-v3.jpg",
    description: "Доступный электроскейт с отличными характеристиками. Лучшее соотношение цена/качество.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.FAST,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 35,
      max_range: 18,
      weight: 7.2,
      max_load: 125
    },
    difficulty_level: DIFFICULTY_LEVELS.BEGINNER,
    features: ["Влагозащита", "Двойные моторы", "Пульт с экраном"],
    rating: 4.5,
    total_rides: 142
  },
  {
    id: 5,
    name: "Backfire G3",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 100,
    location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    model: "Backfire G3",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 550,
    price_per_minute: 11,
    image_url: "/images/skateboards/backfire-g3.jpg",
    description: "Мощный электроскейт с карбоновой декой. Высокая скорость и отличная управляемость.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.LONG,
      speed: SKATEBOARD_SPECS.SPEED.FAST,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 38,
      max_range: 28,
      weight: 8.0,
      max_load: 130
    },
    difficulty_level: DIFFICULTY_LEVELS.ADVANCED,
    features: ["Карбоновая дека", "Турбо режим", "OLED дисплей"],
    rating: 4.6,
    total_rides: 167
  },
  {
    id: 6,
    name: "WowGo 3X",
    status: SKATEBOARD_STATUSES.CHARGING,
    battery_level: 15,
    location: {
      lat: 55.754167,
      lng: 37.620556,
      address: "Кузнецкий Мост ул., 3"
    },
    model: "WowGo 3X",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 480,
    price_per_minute: 9,
    image_url: "/images/skateboards/wowgo-3x.jpg",
    description: "Универсальный электроскейт для городского катания. Плавный ход и хорошая автономность.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.MEDIUM,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 30,
      max_range: 24,
      weight: 7.8,
      max_load: 120
    },
    difficulty_level: DIFFICULTY_LEVELS.INTERMEDIATE,
    features: ["Беспроводной пульт", "Сменные колеса", "Влагозащита"],
    rating: 4.4,
    total_rides: 134
  },
  {
    id: 7,
    name: "Exway Flex",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 90,
    location: {
      lat: 55.757222,
      lng: 37.618889,
      address: "Петровка ул., 2"
    },
    model: "Exway Flex",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 520,
    price_per_minute: 10,
    image_url: "/images/skateboards/exway-flex.jpg",
    description: "Гибкий и комфортный электроскейт. Умная система управления и стильный дизайн.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.FAST,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 36,
      max_range: 25,
      weight: 7.6,
      max_load: 125
    },
    difficulty_level: DIFFICULTY_LEVELS.INTERMEDIATE,
    features: ["Умное управление", "APP поддержка", "Быстрая зарядка"],
    rating: 4.7,
    total_rides: 189
  },
  {
    id: 8,
    name: "Ownboard W2",
    status: SKATEBOARD_STATUSES.RESERVED,
    battery_level: 75,
    location: {
      lat: 55.753889,
      lng: 37.621667,
      address: "Лубянка пл., 2"
    },
    model: "Ownboard W2",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 450,
    price_per_minute: 9,
    image_url: "/images/skateboards/ownboard-w2.jpg",
    description: "Надежный электроскейт для ежедневных поездок. Хорошая автономность и простота использования.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.MEDIUM,
      speed: SKATEBOARD_SPECS.SPEED.MEDIUM,
      terrain: SKATEBOARD_SPECS.TERRAIN.URBAN,
      max_speed: 28,
      max_range: 22,
      weight: 7.3,
      max_load: 120
    },
    difficulty_level: DIFFICULTY_LEVELS.BEGINNER,
    features: ["Съемная батарея", "LED индикация", "Круиз-контроль"],
    rating: 4.3,
    total_rides: 156
  },
  {
    id: 9,
    name: "OneWheel XR+",
    status: SKATEBOARD_STATUSES.AVAILABLE,
    battery_level: 88,
    location: {
      lat: 55.756111,
      lng: 37.615833,
      address: "Камергерский пер., 3"
    },
    model: "OneWheel XR+",
    type: SKATEBOARD_TYPES.ONEWHEEL,
    price_per_hour: 650,
    price_per_minute: 13,
    image_url: "/images/skateboards/onewheel-xr.jpg",
    description: "Продвинутая версия OneWheel с увеличенным запасом хода. Подходит для длительных поездок.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.LONG,
      speed: SKATEBOARD_SPECS.SPEED.MEDIUM,
      terrain: SKATEBOARD_SPECS.TERRAIN.ALLTERRAIN,
      max_speed: 30,
      max_range: 29,
      weight: 12.5,
      max_load: 135
    },
    difficulty_level: DIFFICULTY_LEVELS.EXPERT,
    features: ["Расширенный режим", "Усиленная рама", "Защита от воды"],
    rating: 4.8,
    total_rides: 223
  },
  {
    id: 10,
    name: "Teamgee H20T",
    status: SKATEBOARD_STATUSES.OFFLINE,
    battery_level: 0,
    location: {
      lat: 55.754722,
      lng: 37.614167,
      address: "Тверская ул., 7"
    },
    model: "Teamgee H20T",
    type: SKATEBOARD_TYPES.ELECTRIC,
    price_per_hour: 470,
    price_per_minute: 9,
    image_url: "/images/skateboards/teamgee-h20t.jpg",
    description: "Тонкий и легкий электроскейт. Встроенная в деку батарея и минималистичный дизайн.",
    specs: {
      range: SKATEBOARD_SPECS.RANGE.SHORT,
      speed: SKATEBOARD_SPECS.SPEED.MEDIUM,
      terrain: SKATEBOARD_SPECS.TERRAIN.SMOOTH,
      max_speed: 26,
      max_range: 18,
      weight: 6.8,
      max_load: 120
    },
    difficulty_level: DIFFICULTY_LEVELS.BEGINNER,
    features: ["Ультратонкий дизайн", "Скрытая батарея", "Легкий вес"],
    rating: 4.2,
    total_rides: 112
  }
]; 