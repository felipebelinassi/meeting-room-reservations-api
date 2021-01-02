import moment from 'moment';

interface DateTime {
  timestamp: string;
  time: string;
}

export const formatDateTime = (date: string) => ({
  timestamp: moment(date).format(),
  time: moment(date).format('HH:mm:ss'),
});

export const normalizeTimePeriods = (params: Record<string, string>) => {
  const response = {} as Record<string, DateTime>;
  Object.keys(params).forEach(key => {
    response[key] = formatDateTime(params[key]);
  });
  return response;
};

export const validateDateRange = (start: string, end: string) => {
  const { timestamp: startTimestamp } = formatDateTime(start);
  const { timestamp: endTimestamp } = formatDateTime(end);

  const isValidStartDate = startTimestamp >= moment().format();
  const isValidRange = endTimestamp > startTimestamp;

  return isValidStartDate && isValidRange;
}; 