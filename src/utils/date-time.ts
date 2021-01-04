import moment from 'moment';

interface DateTime {
  timestamp: string;
  time: string;
}

const formatTimestamp = (date?: string) => moment(date).format();

export const formatDate = (date?: string) => moment(date).format('YYYY-MM-DD');

export const formatTime = (date: string) => moment(date).format('HH:mm:ss');

export const formatTimePeriods = (params: Record<string, string>) => {
  const response = {} as Record<string, DateTime>;
  Object.keys(params).forEach(key => {
    response[key] = {
      timestamp: formatTimestamp(params[key]),
      time: formatTime(params[key]),
    };
  });
  return response;
};

export const validateDateRange = (start: string, end: string) => {
  const startTimestamp = formatTimestamp(start);
  const endTimestamp = formatTimestamp(end);

  const currentDate = moment().format();
  const isValidStartDate = startTimestamp >= currentDate;
  const isValidRange = endTimestamp > startTimestamp;

  return isValidStartDate && isValidRange;
}; 