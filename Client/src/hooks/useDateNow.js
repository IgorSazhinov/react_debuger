const useDateNow = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    if (month < 10 && date < 10) {
        return `${year}-0${month}-0${date}`;
    }
    if (month < 10) {
        return `${year}-0${month}-${date}`;
    }
    if (date < 10) {
        return `${year}-${month}-0${date}`;
    }
    console.log(`${year}-${month}-${date}`);
    return `${year}-${month}-${date}`;
}



// const dateNow = (date) => {
//     const Now = dateNow()
//     if (date != Now || date === null) {
//         return dateNow
//     }
//     return 'Сегодня'
// }

export default useDateNow