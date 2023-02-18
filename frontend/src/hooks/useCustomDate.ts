import React from 'react'
import { DateFormatAPI } from './../customAPIs//DateFormatAPI';

interface DateType {
    currentDate: string
}

export const useCustomDate = (
    {
        currentDate
    } : DateType
) => {
    React.useEffect(() => {
        
        const dateFormatAPI = new DateFormatAPI();
        const date = new Date(currentDate);
        const formatString = 'YYYY-MM-DD HH:mm:ss';

        const formattedDate = dateFormatAPI.format(date, formatString);

        console.log(formattedDate); // Output: "2023-02-18 12:34:56"

    }, [])
}
