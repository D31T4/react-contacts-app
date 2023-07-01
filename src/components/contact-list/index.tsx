import React, { useState, useCallback, useRef, useEffect } from 'react';
import useContacts from "./use-contacts";
import { useDialog } from '../dialog-provider';

import SearchBar from '../search-bar';

import { ListSkeleton } from './skeleton';
import { InternalList } from './internal-list';
import FilteredList from './filtered-list';
import ContactDetail from './contact-detail';


const ContactList: React.FunctionComponent = () => {
    const { contacts, pending } = useContacts();
    const { open } = useDialog();

    // search string
    const [query, setQuery] = useState<string>('');

    /**open popup */
    const onOpen = useCallback((id: number) => {
        const c = contacts.find(c => c.id === id);
        c && open(<ContactDetail contact={c}/>)
    }, [contacts]);

    const containerRef = useRef<HTMLDivElement>(null);
    
    const scrollRef = useRef<{ query: string, scroll: number }>({
        query: '',
        scroll: 0
    });

    scrollRef.current.query = query;

    /**memoize scroll top */
    useEffect(() => {
        if (!containerRef.current) return;

        const elm = containerRef.current;

        const onScroll = () => {
            if (!scrollRef.current.query)
                scrollRef.current.scroll = elm.scrollTop;
        };

        elm.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            elm.removeEventListener('scroll', onScroll);
        };
    }, []);

    /**restore scroll top when switching from filtered list to full list */
    useEffect(() => {
        if (containerRef.current)
            containerRef.current.scrollTop = !query ? scrollRef.current.scroll : 0;
    }, [query]);

    return (
        <>
            <SearchBar
                pending={pending}
                onChange={setQuery}
            />
            <div style={{ flexGrow: 1, overflow: 'auto' }} ref={containerRef}>
                {pending && (
                    <ListSkeleton
                        count={5}
                    />
                )}
                {!pending && (
                    <InternalList
                        contacts={contacts}
                        hidden={Boolean(query)}
                        onOpen={onOpen}
                    />
                )}
                {(!pending && Boolean(query)) && (
                    <FilteredList
                        contacts={contacts}
                        query={query}
                        hidden={false}
                        onOpen={onOpen}
                    />
                )}
            </div>
        </>
    );
};

export default ContactList;