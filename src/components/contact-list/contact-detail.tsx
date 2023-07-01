import React from 'react';

import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar';
import stringAvatar from './avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';

import type { Contact } from './use-contacts';

interface ContactDetailProps {
    contact: Contact
}

const ContactDetail: React.FunctionComponent<ContactDetailProps> = props => {
    const { contact } = props;
    const avatarProps = stringAvatar(contact.name);

    avatarProps.sx ??= {};
    //@ts-ignore
    avatarProps.sx.width = '60px';
    //@ts-ignore
    avatarProps.sx.height = '60px';


    return (
        <DialogContent sx={{ padding: '0px' }}>
            <Card sx={{ padding: '20px' }}>
                <CardHeader
                    avatar={<Avatar {...avatarProps} />}
                    title={
                        <Typography noWrap>
                            {contact.name}
                        </Typography>
                    }
                    subheader={
                        <Typography noWrap variant='body2'>
                            {contact.company.name}
                        </Typography>
                    }
                />
                <Divider/>
                <CardContent>
                    <Row
                        field={<PhoneIcon/>}
                        value={
                            <Typography noWrap>
                                {contact.phone}
                            </Typography>
                        }
                    />
                    <Row
                        field={<EmailIcon/>}
                        value={<Link href={`mailto:${contact.email}`}>{contact.email}</Link>}
                    />
                    <Row
                        field={<WebIcon/>}
                        value={<Link href={`http://${contact.website}`} target='__blank'>{contact.website}</Link>}
                    />
                </CardContent>
            </Card>
        </DialogContent>
    );
};

export default ContactDetail;

const Row: React.FunctionComponent<{ field: React.ReactNode, value: React.ReactNode }> = props => {
    return (
        <Grid container spacing={2} wrap='nowrap'>
            <Grid item>
                {props.field}
            </Grid>
            <Grid item xs>
                {props.value}
            </Grid>
        </Grid>
    );
};