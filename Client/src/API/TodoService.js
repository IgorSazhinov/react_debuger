export default class TodoService {
    static async get() {
        await axios.get('http://localhost:7000/todos/').then((response) => {

        }).catch((e) => {
            console.error(e)
        })
        return response.date, e
    }
    static async post() {
        
    }
}