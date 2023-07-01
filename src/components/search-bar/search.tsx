import React, { useRef, useCallback, useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

import { styled, alpha } from '@mui/material/styles';

const SearchWrapper = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

export interface SearchProps {
    onChange?: (query: string) => void
    pending: boolean
}

const Search: React.FunctionComponent<SearchProps> = props => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((event) => {
        props.onChange?.(event.currentTarget.value);
    }, [props.onChange]);

    const onClear = useCallback(() => {
        if (inputRef.current && inputRef.current.value !== '') {
            inputRef.current.value = '';
            props.onChange?.('');
        }
    }, []);

    return (
        <SearchWrapper>
            <TextField
                size='small'
                fullWidth
                InputProps={{
                    disabled: props.pending,
                    inputRef: inputRef,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            {props.pending && (
                                <CircularProgress
                                    size='1lh'
                                />
                            )}
                            {!props.pending && (
                                <IconButton onClick={onClear}>
                                    <CloseIcon/>
                                </IconButton>
                            )}
                        </InputAdornment>
                    )
                }}
                placeholder='Search...'
                aria-label='search'
                onChange={onChange}
            />
        </SearchWrapper>
    );
}

export default Search;