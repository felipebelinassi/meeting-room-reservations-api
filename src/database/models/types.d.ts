interface UserAttributes {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RoomAttributes {
  roomId: string;
  description?: string;
  openAt: string;
  closeAt: string;
  roomReservations?: ReservationAttributes[];
}

interface ReservationAttributes {
  reservationId: string;
  roomId: string;
  reservedBy: string;
  startAt: string;
  endAt: string;
}
