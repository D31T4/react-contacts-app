import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Search, { SearchProps } from './search';

const TOOLBAR_HEIGHT = 64;

const SearchBar: React.FunctionComponent<SearchProps> = React.memo(props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return (
        <>
            <AppBar elevation={ trigger ? 4 : 0 }>
                <Toolbar sx={{ height: `${TOOLBAR_HEIGHT}px` }}>
                    <Search {...props} />
                </Toolbar>
            </AppBar>
            <div style={{ marginTop: `${TOOLBAR_HEIGHT}px`, height: '0px' }} ></div>
        </>
    );
});

export default SearchBar;