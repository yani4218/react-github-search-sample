import { DateTime } from 'luxon';

const DEFAULT_FORMAT = 'dd LLL yyyy';

/**
 * @description Форматирование даты
 * Если тип даты число, то дата указывается в секундах
 * @param date - Дата
 * @param format - Формат ответа
 * @returns Отформатированная дата
 */
export const dateFormatted = (
    date: string | number | Date | DateTime,
    format = DEFAULT_FORMAT
): string => {
    if (typeof date === 'number') {
        return DateTime.fromSeconds(date).toFormat(format);
    }

    if (typeof date === 'string') {
        return DateTime.fromISO(date).toFormat(format);
    }

    if (DateTime.isDateTime(date)) {
        return date.toFormat(format);
    }

    return DateTime.fromJSDate(date).toFormat(format);
};
