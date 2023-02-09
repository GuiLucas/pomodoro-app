import { useQuery } from '@tanstack/react-query'
import { User, Todo } from '../types'
import axios from 'axios'
import { useUserEmail } from '../store'

const UsersEmailToId: Record<string, number> = {
    'Sincere@april.biz': 1,
    'Shanna@melissa.tv': 2,
    'Nathan@yesenia.net': 3,
    'Julianne.OConner@kory.org': 4,
    'Lucio_Hettinger@annie.ca': 5,
    'Karley_Dach@jasper.info': 6,
    'Telly.Hoeger@billy.biz': 7,
    'Sherwood@rosamond.me': 8,
    'Chaim_McDermott@dana.io': 9,
    'Rey.Padberg@karina.biz': 10
}

async function fetchUsers() {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users/')
    return response.data
}

async function fetchTodos(userId: number) {
    const response = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    console.log(response.data)
    return response.data
}

export function useUsers() {
    return useQuery(
        {
            queryKey: ['users'],
            queryFn: fetchUsers
        }
    )
}

export function useTodos() {
    const userEmail = useUserEmail()
    let id: number = 0
    if(userEmail) {
        id = UsersEmailToId[userEmail]
    }
    return useQuery(
        {
            queryKey: ['todos', id],
            queryFn: () => fetchTodos(id)
        }
    )
}
