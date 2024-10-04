const useDateNow = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    if (month < 10) {
        return `${year}-0${month}-${date}`;
    }
    if (date < 10) {
        return `${year}-${month}-0${date}`;
    }
    return `${year}-${month}-${date}`;
}

export default useDateNow