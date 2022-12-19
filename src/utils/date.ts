// вот тут вместо . поставил –
// тк FullCalendar принимает такой формат
export const formatDate = (date: Date): string => {
    // можно было конечно сделать так:
    // datepicker.getDate("yyyy-mm-dd") as string; 
    
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${year}-${month}-${day}`
}