import { RENTAL_STATUSES, PENALTY_TYPES } from '../types';

export const rentals = [
  {
    id: 1,
    user_id: 1,
    skateboard_id: 1,
    start_time: "2024-03-15T10:00:00",
    end_time: "2024-03-15T11:30:00",
    duration: 1.5, // часы
    distance: 500, // метры
    cost: 750,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.751244,
      lng: 37.618423,
      address: "Тверская ул., 15"
    },
    end_location: {
      lat: 55.753215,
      lng: 37.622504,
      address: "Мясницкая ул., 13"
    },
    route_points: [
      { lat: 55.751244, lng: 37.618423 },
      { lat: 55.752230, lng: 37.620464 },
      { lat: 55.753215, lng: 37.622504 }
    ],
    penalty: {
      amount: 0,
      type: null,
      description: null
    },
    rating: 5,
    review: "Отличный скейт, очень доволен поездкой!"
  },
  {
    id: 2,
    user_id: 1,
    skateboard_id: 2,
    start_time: "2024-03-14T15:00:00",
    end_time: "2024-03-14T16:00:00",
    duration: 1.0,
    distance: 300,
    cost: 600,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.753215,
      lng: 37.622504,
      address: "Мясницкая ул., 13"
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    route_points: [
      { lat: 55.753215, lng: 37.622504 },
      { lat: 55.754515, lng: 37.620070 },
      { lat: 55.755814, lng: 37.617635 }
    ],
    penalty: {
      amount: 100,
      type: PENALTY_TYPES.LATE_RETURN,
      description: "Возврат на 10 минут позже"
    },
    rating: 4,
    review: "Хороший скейт, но немного задержался с возвратом"
  },
  {
    id: 3,
    user_id: 2,
    skateboard_id: 3,
    start_time: "2024-03-16T09:00:00",
    end_time: "2024-03-16T10:30:00",
    duration: 1.5,
    distance: 800,
    cost: 900,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.749511,
      lng: 37.613757,
      address: "Арбат ул., 20"
    },
    end_location: {
      lat: 55.751244,
      lng: 37.618423,
      address: "Тверская ул., 15"
    },
    route_points: [
      { lat: 55.749511, lng: 37.613757 },
      { lat: 55.750378, lng: 37.616090 },
      { lat: 55.751244, lng: 37.618423 }
    ],
    penalty: {
      amount: 0,
      type: null,
      description: null
    },
    rating: 5,
    review: "OneWheel - это нечто! Очень необычные ощущения"
  },
  {
    id: 4,
    user_id: 3,
    skateboard_id: 1,
    start_time: "2024-03-17T14:00:00",
    end_time: "2024-03-17T16:00:00",
    duration: 2.0,
    distance: 1200,
    cost: 1200,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.751244,
      lng: 37.618423,
      address: "Тверская ул., 15"
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    route_points: [
      { lat: 55.751244, lng: 37.618423 },
      { lat: 55.753529, lng: 37.618029 },
      { lat: 55.755814, lng: 37.617635 }
    ],
    penalty: {
      amount: 0,
      type: null,
      description: null
    },
    rating: 5,
    review: "Отличная длительная поездка, заряда хватило с запасом"
  },
  {
    id: 5,
    user_id: 2,
    skateboard_id: 2,
    start_time: "2024-03-18T11:00:00",
    end_time: "2024-03-18T12:00:00",
    duration: 1.0,
    distance: 400,
    cost: 600,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.753215,
      lng: 37.622504,
      address: "Мясницкая ул., 13"
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    route_points: [
      { lat: 55.753215, lng: 37.622504 },
      { lat: 55.754515, lng: 37.620070 },
      { lat: 55.755814, lng: 37.617635 }
    ],
    penalty: {
      amount: 50,
      type: PENALTY_TYPES.BATTERY_DRAIN,
      description: "Батарея разряжена ниже 10%"
    },
    rating: 4,
    review: "Хороший скейт, но нужно следить за зарядом внимательнее"
  },
  {
    id: 6,
    user_id: 4,
    skateboard_id: 7,
    start_time: "2024-03-19T13:00:00",
    end_time: null,
    duration: null,
    distance: null,
    cost: null,
    status: RENTAL_STATUSES.ACTIVE,
    start_location: {
      lat: 55.757222,
      lng: 37.618889,
      address: "Петровка ул., 2"
    },
    end_location: null,
    route_points: [
      { lat: 55.757222, lng: 37.618889 }
    ],
    penalty: {
      amount: 0,
      type: null,
      description: null
    },
    rating: null,
    review: null
  },
  {
    id: 7,
    user_id: 5,
    skateboard_id: 9,
    start_time: "2024-03-19T10:00:00",
    end_time: "2024-03-19T11:30:00",
    duration: 1.5,
    distance: 600,
    cost: 975,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.756111,
      lng: 37.615833,
      address: "Камергерский пер., 3"
    },
    end_location: {
      lat: 55.751244,
      lng: 37.618423,
      address: "Тверская ул., 15"
    },
    route_points: [
      { lat: 55.756111, lng: 37.615833 },
      { lat: 55.753678, lng: 37.617128 },
      { lat: 55.751244, lng: 37.618423 }
    ],
    penalty: {
      amount: 0,
      type: null,
      description: null
    },
    rating: 5,
    review: "OneWheel XR+ превзошел все ожидания! Потрясающая управляемость"
  },
  {
    id: 8,
    user_id: 6,
    skateboard_id: 8,
    start_time: "2024-03-19T12:00:00",
    end_time: null,
    duration: null,
    distance: null,
    cost: null,
    status: RENTAL_STATUSES.PENDING_PAYMENT,
    start_location: {
      lat: 55.753889,
      lng: 37.621667,
      address: "Лубянка пл., 2"
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    route_points: [
      { lat: 55.753889, lng: 37.621667 },
      { lat: 55.754852, lng: 37.619651 },
      { lat: 55.755814, lng: 37.617635 }
    ],
    penalty: {
      amount: 200,
      type: PENALTY_TYPES.DAMAGE,
      description: "Царапины на деке"
    },
    rating: 3,
    review: "Скейт хороший, но случайно поцарапал"
  },
  {
    id: 9,
    user_id: 7,
    skateboard_id: 4,
    start_time: "2024-03-18T16:00:00",
    end_time: "2024-03-18T17:30:00",
    duration: 1.5,
    distance: 700,
    cost: 600,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.752220,
      lng: 37.617634,
      address: "Большая Дмитровка ул., 7/5"
    },
    end_location: {
      lat: 55.757222,
      lng: 37.618889,
      address: "Петровка ул., 2"
    },
    route_points: [
      { lat: 55.752220, lng: 37.617634 },
      { lat: 55.754721, lng: 37.618262 },
      { lat: 55.757222, lng: 37.618889 }
    ],
    penalty: {
      amount: 150,
      type: PENALTY_TYPES.ZONE_VIOLATION,
      description: "Выезд за пределы разрешенной зоны"
    },
    rating: 4,
    review: "Хороший скейт, но случайно выехал за зону"
  },
  {
    id: 10,
    user_id: 8,
    skateboard_id: 5,
    start_time: "2024-03-19T09:00:00",
    end_time: "2024-03-19T10:00:00",
    duration: 1.0,
    distance: 450,
    cost: 550,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.755814,
      lng: 37.617635,
      address: "Театральная пл., 1"
    },
    end_location: {
      lat: 55.753215,
      lng: 37.622504,
      address: "Мясницкая ул., 13"
    },
    route_points: [
      { lat: 55.755814, lng: 37.617635 },
      { lat: 55.754515, lng: 37.620070 },
      { lat: 55.753215, lng: 37.622504 }
    ],
    penalty: {
      amount: 100,
      type: PENALTY_TYPES.PARKING_VIOLATION,
      description: "Неправильная парковка"
    },
    rating: 5,
    review: "Отличный скейт! Извините за неправильную парковку"
  }
]; 