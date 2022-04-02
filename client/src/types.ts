export type AuthTypes = "register" | "login";

export type FormType = {
    email: string
    password: string
}

export type AuthResponse = {
    userId: number;
}

export type StateTask = {
    taskName: string
    completed: boolean
    id: string
}

export interface FullStateTask extends StateTask {
    subtasks: StateTask[] | []
    owner?: string | null
}