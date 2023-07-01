import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ItemSkeleton: React.FunctionComponent = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Skeleton variant='circular'>
                    <Avatar/>
                </Skeleton>
            </ListItemAvatar>
            <ListItemText>
                <Skeleton width='100%'>
                    <Typography noWrap>.</Typography>
                </Skeleton>
                <Skeleton width='80%'>
                    <Typography noWrap>.</Typography>
                </Skeleton>
            </ListItemText>
        </ListItem>
    );
};

interface ListSkeletonProps {
    /**no. of item to be rendered */
    count: number
}

/**
 * placeholder for loading data
 */
const ListSkeleton: React.FunctionComponent<ListSkeletonProps> = React.memo(props => {
    const items = new Array<React.ReactElement>(props.count);

    for (let i = 0; i < props.count; ++i) {
        items[i] = <ItemSkeleton key={i} />
    }

    return (
        <List>
            {items}
        </List>
    );
});

export { ItemSkeleton, ListSkeleton };
