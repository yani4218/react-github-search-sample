import { DateTime } from 'luxon';

const DEFAULT_FORMAT = 'dd LLL yyyy';

export const dateFormatted = (date: string, format = DEFAULT_FORMAT): string => {
    return DateTime.fromISO(date).toFormat(format);
};
