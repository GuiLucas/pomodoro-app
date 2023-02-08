import { useQuery } from '@tanstack/react-query'
import { User, Todo } from '../types'
import axios from 'axios'
import { useUserEmail } from '../store'

// function getUserId() {
//     const { data } = useUsers()
//     const userEmail = useUserEmail()

//     return data?.filter(user => user.email === userEmail)
// }

async function fetchUsers()  {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users/')
    return response.data
}

async function fetchTodos(userId: number)  {
    const response = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    return response.data
}

export function useUsers() {
    return useQuery<User[], Error>(
        { 
            queryKey: ['users'], 
            queryFn: fetchUsers 
        }
    )
}

export function useTodos(userId: number) {
    // const userId = getUserId()
    return useQuery<Todo[], Error>(
        { 
            queryKey: ['todos', userId], 
            queryFn: () => fetchTodos(userId) 
        }
    )
}
