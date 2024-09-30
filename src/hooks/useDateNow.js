const useDateNow = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    if (month < 10) {
        return `${year}-0${month}-${date}`
    }
    return `${year}-${month}-${date}`;
}

export default useDateNow