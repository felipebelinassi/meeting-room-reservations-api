import moment from 'moment';
import * as dateTimeUtils from '../../../src/utils/date-time';

describe('Date time utils unit tests', () => {
  describe('date and time formatters', () => {
    it('should format date in YYYY-MM-DD format', () => {
      const formattedDate = dateTimeUtils.formatDate();
      expect(formattedDate).toMatch(/(\d{4})-(\d{2})-(\d{2})/);
    });
  
    it('should format time periods from an object as time and timestamp', () => {
      const periods = {
        period: moment().format(),
        mockPeriod: moment().add(1, 'days').format(),
      };
  
      const expectedFormattedPeriod = {
        timestamp: expect.any(String),
        time: expect.any(String),
      };
  
      const formattedPeriods = dateTimeUtils.formatTimePeriods(periods);
      expect(formattedPeriods).toEqual({
        period: expect.objectContaining(expectedFormattedPeriod),
        mockPeriod: expect.objectContaining(expectedFormattedPeriod),
      });
    });
  });

  describe('time range validation based on current date', () => {
    it('should return false for future timestamps', () => {
      // Set future timestamps
      const start = moment().add(5, 'days').format();
      const end = moment().add(5, 'days').format();

      expect(dateTimeUtils.validateDateRange(start, end)).toBeFalsy();
    });

    it('should return false for invalid range (start time greater than end time)', () => {
      const start = moment().add(1, 'days').format();
      // Set future timestamps
      const end = moment().format();
  
      expect(dateTimeUtils.validateDateRange(start, end)).toBeFalsy();
    });

    it('should return true for valid time ranges', () => {
      const start = moment().add(15, 'minutes').format();
      const end = moment().add(30, 'minutes').format();
  
      expect(dateTimeUtils.validateDateRange(start, end)).toBeTruthy();
    });
  });
});
