import { useQuery } from '@tanstack/react-query'
import { Todo } from '../types'
import axios from 'axios'
import { useStoreActions, useUserEmail } from '../store'

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

export async function fetchTodos(userId: number) {
    const response = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    return response.data
}

export function useTodos() {
    const { setTodos } = useStoreActions()

    const userId = UsersEmailToId[useUserEmail()]
    
    return useQuery(
        {
            queryKey: ['todos', userId],
            queryFn: () => fetchTodos(userId),
            onSuccess: (data) => setTodos(data as Todo[]),
        }
    )
}
