import moment from "moment";


export const getCheckOutDate = (checkInDate: string, amountOfDays: string) => {
    let checkInAfterMoment;
    if (checkInDate) {
        checkInAfterMoment = moment(checkInDate).format('YYYY-MM-DD');
    } else {
        checkInAfterMoment = moment().format('YYYY-MM-DD');
    }

    const checkOutDate = new Date(checkInAfterMoment);
    const checkOut = moment(checkOutDate.setDate(checkOutDate.getDate() + +amountOfDays)).format('YYYY-MM-DD');
    return checkOut
}

export const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD')
}