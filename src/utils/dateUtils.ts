import moment from 'moment';

export const generateDateString = (): string => moment().format('L');
