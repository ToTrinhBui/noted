export interface Task {
    id: string;
    name: string;
    deadline: Date;
    dsach_id: string;
    bang_id: string;
    done: any;
    members_task: string;
    label: string;
    description: string;
}

export interface Column {
    id: string;
    name: string;
    bang_id: string;
    background: string;
}

export interface Board {
    id: string;
    name: string;
    owner_id: string;
    background: string;
    members: string[];
}
export interface Background {
    id: number;
    link: string
}

export interface Member {
    user_id: string,
    email: string,
}