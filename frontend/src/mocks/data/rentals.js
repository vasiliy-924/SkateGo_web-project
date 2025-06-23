import { RENTAL_STATUSES } from '../types';

export const rentals = [
  {
    id: 1,
    user_id: 1,
    skateboard_id: 1,
    start_time: "2024-03-15T10:00:00",
    end_time: "2024-03-15T11:30:00",
    total_cost: 750,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.751244,
      lng: 37.618423
    },
    end_location: {
      lat: 55.753215,
      lng: 37.622504
    },
    penalty_amount: 0,
    penalty_reason: null
  },
  {
    id: 2,
    user_id: 1,
    skateboard_id: 2,
    start_time: "2024-03-14T15:00:00",
    end_time: "2024-03-14T16:00:00",
    total_cost: 600,
    status: RENTAL_STATUSES.COMPLETED,
    start_location: {
      lat: 55.753215,
      lng: 37.622504
    },
    end_location: {
      lat: 55.755814,
      lng: 37.617635
    },
    penalty_amount: 100,
    penalty_reason: "Парковка вне разрешенной зоны"
  },
  {
    id: 3,
    user_id: 1,
    skateboard_id: 3,
    start_time: "2024-03-16T09:00:00",
    end_time: null,
    total_cost: null,
    status: RENTAL_STATUSES.ACTIVE,
    start_location: {
      lat: 55.749511,
      lng: 37.613757
    },
    end_location: null,
    penalty_amount: 0,
    penalty_reason: null
  }
]; 