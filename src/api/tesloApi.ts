const baseUrl = '/api'

interface Props {
    url: string;
    method?: Action;
    data?: {
        email?: string;
        password?: string;
        name?: string;
        token?: string;
    }
}
type Action = 'GET' | 'POST' | 'PUT' | 'DELETE';


export const tesloApi = async ({ url, method = 'GET', data }: Props) => {

    if(method == 'GET') return await fetch(baseUrl + url);
    else{
        const response = await fetch(baseUrl + url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response;
    }
}
