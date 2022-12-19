// из-за кривого solid-bootstrap не стал делать required
export const rules = {
    // required: (message: string = "Обязательное поле") => ({
    //     required: true,
    //     message
    // }),
    isDateAfter: (date: string) => {
        const result = new Date(date) > new Date(new Date().toDateString());
        return result;
    }
}