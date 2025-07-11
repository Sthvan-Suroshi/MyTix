import {apiClient} from '../apiClient';

export const fetchBuses = async (from: string, to: string, date: string) => {
  const {data} = await apiClient.post('/bus/search', {from, to, date});
  return data?.data || [];
};

export const fetchBusDetails = async (busId: string) => {
  const {data} = await apiClient.get(`/bus/${busId}`);
  return data?.data || null;
};

export const fetchUserTickets = async () => {
  const {data} = await apiClient.get(`/ticket/my-tickets`);
  return data?.tickets;
};

export const bookTicket = async ({
  busId,
  date,
  seatNumbers,
}: {
  busId: string;
  date: string;
  seatNumbers: number[];
}) => {
  console.log('reached api call to book ticket');

  const {data} = await apiClient.post('/ticket/book', {
    busId,
    date,
    seatNumbers,
  });

  return data?.data;
};
