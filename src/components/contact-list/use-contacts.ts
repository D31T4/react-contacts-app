import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

export interface Contact {
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

export interface State {
    pending: boolean
    contacts: Contact[]
}

namespace State {
    export function getDefault(): State {
        return {
            pending: true,
            contacts: []
        }
    }
}

export default function useContacts() {
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState<State>(State.getDefault);

    useEffect(() => {
        const abortController = new AbortController();

        const retrieve = (retry: number) => {
            // fetch with retry
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'GET',
                signal: abortController.signal
            })
                .then(async resp => {
                    const contacts: Contact[] = await resp.json();
    
                    if (abortController.signal.aborted)
                        return;
    
                    contacts.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    
                    setState({
                        pending: false,
                        contacts
                    });
                })
                .catch(reason => {
                    if (abortController.signal.aborted)
                        return;
    
                    enqueueSnackbar('Failed to fetch contact list', { variant: 'error' });

                    if (retry > 0) {
                        setTimeout(() => retrieve(retry - 1), 5000);
                    }
                });
        };

        retrieve(5);

        return () => abortController.abort();
    }, []);

    return state;
}
