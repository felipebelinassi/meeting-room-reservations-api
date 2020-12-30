import moment from 'moment';

export const formatDateTime = (
  date: string,
  time: string,
) => moment(date).add(time, 'hour').format();

export const normalizeTimePeriod = (
  period: string,
  pattern = 'HH:mm:ss',
) => moment(period, pattern).format(pattern);
