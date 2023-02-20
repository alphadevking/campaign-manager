import React, { useEffect, useState } from 'react';
import { DateFormatAPI } from '../customAPIs/DateFormatAPI';

interface DateProps {
    localeDate: string;
}

const useCustomDate = ({ localeDate }: DateProps) => {
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        const dateFormatAPI = new DateFormatAPI();
        const date = new Date(localeDate);
        const formatString = 'YYYY-MM-DD HH:mm:ss';
        const formatted = dateFormatAPI.format(date, formatString);
        setFormattedDate(formatted);
    }, [localeDate]);

    return formattedDate;
};

export default useCustomDate;
