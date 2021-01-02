import moment from 'moment';

interface DateTime {
  timestamp: string;
  time: string;
}

export const formatDateTime = (date: string) => ({
  timestamp: moment(date).format(),
  time: moment(date).format('HH:mm:ss'),
});

export const normalizePeriods = (params: Record<string, string>) => {
  const response = {} as Record<string, DateTime>;
  Object.keys(params).forEach(key => {
    response[key] = formatDateTime(params[key]);
  });
  return response;
};