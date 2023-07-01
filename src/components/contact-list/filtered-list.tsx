import React, { useMemo, useDeferredValue } from 'react';
import List from '@mui/material/List';
import { ContactCard, NoDataCard } from './item';
import type { Contact } from './use-contacts';

interface FilteredListProps {
    query: string
    contacts: Contact[]
    onOpen(id: number): void
    hidden: boolean
}

const FilteredList: React.FunctionComponent<FilteredListProps> = React.memo(props => {
    const deferredQuery = useDeferredValue(props.query);

    const contacts = useMemo(() => {
        if (!deferredQuery) return [];

        const q = deferredQuery.toLowerCase();

        return props.contacts.filter(c => {
            return c.name.toLowerCase().startsWith(q);
        });
    }, [deferredQuery, props.contacts]);

    const stale = deferredQuery !== props.query;

    return (
        <List sx={{ display: props.hidden ? 'none' : undefined, opacity: !stale ? 1 : 0.5 }}>
            {contacts.length === 0 && (
                <NoDataCard/>
            )}
            {contacts.map(c => (
                <ContactCard 
                    contact={c} 
                    onClick={() => props.onOpen(c.id)}
                    key={c.id}
                />
            ))}
        </List>
    );
});

export default FilteredList;