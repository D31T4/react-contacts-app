import React, { useImperativeHandle, useCallback, useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';

export interface DialogInternalApi {
    open(elm: React.ReactElement): void
    close(): void
}

const DialogInternal = React.memo(React.forwardRef<DialogInternalApi>((_, ref) => {
    const [content, setContent] = useState<React.ReactElement | null>(null);

    const close = useCallback(() => {
        setContent(null);
    }, []);

    useImperativeHandle(ref, () => ({
        open: setContent,
        close
    }), []);

    return useMemo(() => {
        return (
            <Dialog 
                open={Boolean(content)} 
                onClose={close}
                maxWidth='xl'
            >
                {content}
            </Dialog>
        );
    }, [content]);
}));

export default DialogInternal;