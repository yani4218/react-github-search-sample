import { DateTime } from 'luxon';
import { dateFormatted } from './date-formatted';

describe('Date format function.', () => {
    const mockDate = '2025-02-10T12:55:56.511Z';
    const customFormat = 'dd-LLL-yyyy';

    describe('Date is ISO string.', () => {
        it('default date format .', () => {
            const result = dateFormatted(mockDate);
            expect(result).toBe('10 Feb 2025');
        });

        it('custom date format .', () => {
            const result = dateFormatted(mockDate, customFormat);
            expect(result).toBe('10-Feb-2025');
        });
    });

    describe('Date is seconds.', () => {
        const mockDateSeconds = 1739192459518 / 1000;
        it('default date format .', () => {
            const result = dateFormatted(mockDateSeconds);
            expect(result).toBe('10 Feb 2025');
        });

        it('custom date format .', () => {
            const result = dateFormatted(mockDateSeconds, customFormat);
            expect(result).toBe('10-Feb-2025');
        });
    });

    describe('Date is DateTime object.', () => {
        const mockDateTimeObj = DateTime.fromISO(mockDate);
        it('default date format .', () => {
            const result = dateFormatted(mockDateTimeObj);
            expect(result).toBe('10 Feb 2025');
        });

        it('custom date format .', () => {
            const result = dateFormatted(mockDateTimeObj, customFormat);
            expect(result).toBe('10-Feb-2025');
        });
    });
});
