import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';

import type { Contact } from './use-contacts';
import stringAvatar from './avatar';

interface ContactCardProps {
    contact: Contact
    onClick: React.MouseEventHandler
}

const ContactCard: React.FunctionComponent<ContactCardProps> = React.memo(props => {
    const { contact } = props;

    return (
        <ListItemButton 
            sx={{ borderBottom: '1px solid lightgray' }} 
            onClick={props.onClick}
        >
            <ListItemAvatar>
                <Avatar {...stringAvatar(contact.name)} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography noWrap>
                        {contact.name}
                    </Typography>
                }
                secondary={
                    <Typography noWrap variant='body2'>
                        {contact.company.name}
                    </Typography>
                }
            />
        </ListItemButton>
    );
});

/**
 * indicator for no data
 */
const NoDataCard: React.FunctionComponent<{ text?: string }> = React.memo(props => {
    return (
        <ListItem alignItems='center' sx={{ justifyContent: 'center', padding: '50px' }}>
            <ListItemText
                primary={
                    <Typography variant='h3' align='center'>
                        <CancelIcon fontSize='large' />
                    </Typography>
                }
                secondary={
                    <Typography variant='h3' align='center'>
                        {props.text || 'No contacts found'}
                    </Typography>
                }
            />
        </ListItem>
    );
});

export { ContactCard, NoDataCard };