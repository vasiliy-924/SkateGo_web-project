import { RENTAL_STATUSES } from '../types';

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
      lng: 37.618423
    },
    end_location: {
      lat: 55.753215,
      lng: 37.622504
    },
    penalty: 0
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
      lng: 37.622504
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635
    },
    penalty: 100
  },
  {
    id: 3,
    user_id: 1,
    skateboard_id: 3,
    start_time: "2024-03-16T09:00:00",
    end_time: "2024-03-16T10:30:00",
    duration: 1.5,
    distance: 800,
    cost: 900,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.749511,
      lng: 37.613757
    },
    end_location: {
      lat: 55.751244,
      lng: 37.618423
    },
    penalty: 0
  },
  {
    id: 4,
    user_id: 1,
    skateboard_id: 1,
    start_time: "2024-03-17T14:00:00",
    end_time: "2024-03-17T16:00:00",
    duration: 2.0,
    distance: 1200,
    cost: 1200,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.751244,
      lng: 37.618423
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635
    },
    penalty: 0
  },
  {
    id: 5,
    user_id: 1,
    skateboard_id: 2,
    start_time: "2024-03-18T11:00:00",
    end_time: "2024-03-18T12:00:00",
    duration: 1.0,
    distance: 400,
    cost: 600,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.753215,
      lng: 37.622504
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635
    },
    penalty: 50
  }
]; 