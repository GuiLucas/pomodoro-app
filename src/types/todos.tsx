import type * as Core from '../types'

export type User = {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
      name: string
      catchPhrase: string
      bs: string
    }
}

export type Todo = {
    userId: number
    id: number
    title: string
    body: string
} & {
    completed?: Core.Optional<boolean>
}