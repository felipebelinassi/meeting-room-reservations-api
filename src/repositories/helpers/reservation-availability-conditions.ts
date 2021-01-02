import { Op } from 'sequelize';

/* Collection of shared methods to check reservation availity using sequelize */

export default (from: string, to: string) => {
  const containsRequestedPeriod = {
    startAt: { [Op.gt]: from },
    endAt: { [Op.lt]: to },
  };

  const isContainedInRequestedPeriod = {
    startAt: { [Op.lt]: from },
    endAt: { [Op.gt]: to },
  };

  const startIsBetweenRequestedPeriod = {
    startAt: { 
      [Op.and]: {
        [Op.gte]: from,
        [Op.lt]: to, 
      },
    },
  };

  const endIsBetweenRequestedPeriod = {
    endAt: { 
      [Op.and]: {
        [Op.gt]: from,
        [Op.lte]: to, 
      },
    },
  };

  return {
    [Op.or]: [
      containsRequestedPeriod,
      isContainedInRequestedPeriod,
      startIsBetweenRequestedPeriod,
      endIsBetweenRequestedPeriod,
    ],
  };
};
