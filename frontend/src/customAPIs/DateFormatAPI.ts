export default class DateFormatAPI {
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
        const supportedTokens = ['YYYY', 'MMMM', 'D', 'dddd', 'h', 'm', 's', 'A'];

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
        const supportedTokens = ['YYYY', 'MMMM', 'D', 'dddd', 'h', 'm', 's', 'A'];

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
            case 'MMMM':
                return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
            case 'D':
                const day = date.getDate();
                let suffix;
                if (day === 1 || day === 21 || day === 31) {
                    suffix = 'st';
                } else if (day === 2 || day === 22) {
                    suffix = 'nd';
                } else if (day === 3 || day === 23) {
                    suffix = 'rd';
                } else {
                    suffix = 'th';
                }
                return date.getDate().toString() + suffix;
            case 'dddd':
                return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
            case 'h':
                return (date.getHours() % 12 || 12).toString();
            case 'm':
                return date.getMinutes().toString().padStart(2, '0');
            case 's':
                return date.getSeconds().toString().padStart(2, '0');
            case 'A':
                return date.getHours() < 12 ? 'AM' : 'PM';
            default:
                throw new Error(`Unsupported format token: ${token}`);
        }
    }
}
