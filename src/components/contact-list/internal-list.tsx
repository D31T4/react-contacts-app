import React, { useMemo } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { ContactCard, NoDataCard } from './item';
import type { Contact } from './use-contacts';

interface ContactCard {
    type: 'contact'
    contact: Contact
}

interface GroupCard {
    type: 'group'
    name: string
}

export type Card = ContactCard | GroupCard;

interface InternalListProps {
    contacts: Contact[]
    onOpen(id: number): void
    hidden: boolean
}

/**
 * character is alphabet
 * @param char character
 * @returns `true` if `char` is alphabet
 */
function isAlphabet(char: string) {
    return char[0].toLowerCase() !== char[0].toUpperCase();
}

const InternalList: React.FunctionComponent<InternalListProps> = React.memo(props => {
    const cards = useMemo<Card[]>(() => {
        const c: Card[] = [];

        let previousGroup: string | null = null;

        // group names with same starting alphabet
        for (const contact of props.contacts) {
            let group: string;
            
            if (isAlphabet(contact.name[0])) {
                group = contact.name[0].toUpperCase();
            } else {
                group = '#';
            }

            if (group !== previousGroup) {
                c.push({ type: 'group', name: group });
            }

            c.push({ type: 'contact', contact });
            previousGroup = group;
        }

        return c;
    }, [props.contacts]);

    return (
        <List
            subheader={<ListSubheader/>}
            sx={{ display: props.hidden ? 'none' : undefined }}
        >
            {cards.length === 0 && (
                <NoDataCard/>
            )}
            {cards.map(item => {
                switch (item.type) {
                    case 'contact':
                        return (
                            <ContactCard 
                                key={item.contact.id} 
                                contact={item.contact} 
                                onClick={() => props.onOpen(item.contact.id)}
                            />
                        );
                    case 'group':
                        return (
                            <ListSubheader key={item.name} sx={{ borderBottom: '1px solid lightgray' }}>
                                <Typography paddingTop='20px'>
                                    {item.name}
                                </Typography>
                            </ListSubheader>
                        );
                    default:
                        return null;
                }
            })}
        </List>
    );
});

export { InternalList };