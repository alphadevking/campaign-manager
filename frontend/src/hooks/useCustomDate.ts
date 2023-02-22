import { useEffect, useState } from 'react';
import DateFormatAPI from '../customAPIs/DateFormatAPI';

interface DateProps {
    localeDate: string;
    formatString?: string;
}

const useCustomDate = ({ localeDate, formatString = `dddd, MMMM D, YYYY. h:mm:ss A` }: DateProps) => {
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        const dateFormatAPI = new DateFormatAPI();
        const date = new Date(localeDate);
        const formatted = dateFormatAPI.format(date, formatString);
        setFormattedDate(formatted);
    }, [localeDate, formatString]);

    return formattedDate;
};

export default useCustomDate;
