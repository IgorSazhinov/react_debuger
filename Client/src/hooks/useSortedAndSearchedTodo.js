import { useMemo } from "react"
import useDateNow from "./useDateNow"

/** 
    * Выбор типа сортировки
    * @param {string} sort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
    * @description для 'text' и 'date' используем метод localeCompare(); для 'today' фильтруем с помощью кастомного метода useDateNow(); для 'completed' фильтруем по обратному параметру completed
    * @return  {Array} возвращаем тип сортировки. Далее эта функция будет вызвана в sortedTodos
*/
const selectSortType = (sort, todos) => {
    if (sort === 'text' || sort === 'date') {
        return [...todos].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    if (sort === 'today') {
        return todos.filter(t => t.date === useDateNow())
    }
    if (sort === 'completed') {
        return todos.filter(t => !t.completed)
    }
}

/** 
    * Выполняем сортировку
    * @param {string} sort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
    * @description выполняем проверку на случай незаданного типа сортировки. Выполняем сортировку обернутую в useMemo
    * @dependency filter.sort - отслеживаем изменение типа сортировки
    * @dependency todos - отслеживаем изменение массива со списком дел
    * @dependency oldTodo - отслеживаем изменения отредактированого дела
    * @return {Array} возвращаем отсортированный массив. Далее отдадам его в функцию sortedAndSearchedTodo
*/
export const useSortedTodo = (sort, todos, changedTodo) => {
    const sortedTodos = useMemo(() => {
        if (sort) {
            return selectSortType(sort, todos)
        }
        return todos
    }, [sort, todos, changedTodo])
    return sortedTodos
}


/** 
    * Выполняем поиск после сортировки
    * @param {object} sortedTodos - отсортированное дело.
    * @param {string} filter.query - состояние строки поиска.
    * @description отсортированный список фильтруем по строке поиска. всё обёрнуто в useMemo.
    * @dependency filter.query - отслеживаем изменение в поле поиска
    * @dependency sortedTodos - отслеживаем изменение сортировки списка дел
    * @dependency oldTodo - отслеживаем изменения отредактированого дела
    * @return {Array} возвращаем отсортированный и отфильтрованный массив. Далее отдадим его в компонент TodoList
*/
export const useSortedAndSearchedTodo = (query, sort, todos, changedTodo) => {
    const sortedTodos = useSortedTodo(sort, todos, changedTodo)
    const sortedAndSearchedTodo = useMemo(() => {
        return sortedTodos.filter(todo => todo.text.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedTodos, changedTodo])
    return sortedAndSearchedTodo
}


