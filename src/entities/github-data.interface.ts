export interface IList<T> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}

export interface IGitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    stargazers_count: number;
    description?: string;
    language?: string;
    updated_at: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
    };
}
