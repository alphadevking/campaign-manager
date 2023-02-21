export class DateFormatAPI {
    /**
     * Format a given date object as a string according to the specified format.
     * 
     * @param date The date object to format.
     * @param format The format string to use. See below for supported format tokens.
     * 
     * @returns A string representation of the date in the specified format.
     */
    public format(date: Date, format: string): string {
        const parts = format.split(/[^a-z]+/i);
        const separators = format.split(/[a-z]+/i).filter((s) => s);

        const tokens = parts.reduce((tokens: string[], part, i) => {
            if (part) {
                tokens.push(...this.getTokens(part));
            }

            if (separators[i]) {
                tokens.push(separators[i]);
            }

            return tokens;
        }, []);

        return tokens.reduce((result: string, token: string) => {
            if (this.isToken(token)) {
                return result + this.getTokenValue(token, date);
            } else {
                return result + token;
            }
        }, '');
    }

    /**
     * Get an array of supported format tokens for a given format string.
     * 
     * @param format The format string to extract tokens from.
     * 
     * @returns An array of supported format tokens.
     */
    private getTokens(format: string): string[] {
        // TODO: Add support for more tokens as needed.
        const supportedTokens = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];

        return supportedTokens.filter((token) => format.includes(token));
    }

    /**
     * Determine whether a given string is a supported format token.
     * 
     * @param str The string to check.
     * 
     * @returns A boolean indicating whether the string is a supported format token.
     */
    private isToken(str: string): boolean {
        // TODO: Add support for more tokens as needed.
        const supportedTokens = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];

        return supportedTokens.includes(str);
    }

    /**
     * Get the value of a given format token for a given date object.
     * 
     * @param token The format token to get the value of.
     * @param date The date object to get the token value from.
     * 
     * @returns A string representation of the value of the token for the given date object.
     */
    private getTokenValue(token: string, date: Date): string {
        switch (token) {
            case 'YYYY':
                return date.getFullYear().toString();
            case 'MM':
                return (date.getMonth() + 1).toString().padStart(2, '0');
            case 'DD':
                return date.getDate().toString().padStart(2, '0');
            case 'HH':
                return date.getHours().toString().padStart(2, '0');
            case 'mm':
                return date.getMinutes().toString().padStart(2, '0');
            case 'ss':
                return date.getSeconds().toString().padStart(2, '0');
            default:
                throw new Error(`Unsupported format token: ${token}`);
        }
    }
}


// Example hook calls

// import React, { useEffect, useState } from 'react';
// import { DateFormatAPI } from '../customAPIs/DateFormatAPI';

// interface DateProps {
//     localeDate: string;
// }

// const useCustomDate = ({ localeDate }: DateProps) => {
//     const [formattedDate, setFormattedDate] = useState<string>('');

//     useEffect(() => {
//         const dateFormatAPI = new DateFormatAPI();
//         const date = new Date(localeDate);
//         const formatString = 'YYYY-MM-DD HH:mm:ss';
//         const formatted = dateFormatAPI.format(date, formatString);
//         setFormattedDate(formatted);
//     }, [localeDate]);

//     return formattedDate;
// };

// export default useCustomDate;


// Example Usage

// const dateFormatAPI = new DateFormatAPI();
// const date = new Date('2023-02-18T12:34:56Z');
// const formatString = 'YYYY-MM-DD HH:mm:ss';

// const formattedDate = dateFormatAPI.format(date, formatString);

// console.log(formattedDate); // Output: "2023-02-18 12:34:56"
