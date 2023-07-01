import React, { createContext, useRef, useContext, useMemo } from 'react';
import DialogInternal, { DialogInternalApi } from './internal';

type DialogProviderProps = React.PropsWithChildren;

const DialogContext = createContext<React.RefObject<DialogInternalApi | null>>({
    current: null
});

const DialogProvider: React.FunctionComponent<DialogProviderProps> = React.memo(props => {
    const ref = useRef<DialogInternalApi>(null);
    
    return (
        <>
            <DialogInternal ref={ref} />
            <DialogContext.Provider value={ref}>
                {props.children}
            </DialogContext.Provider>
        </>
    );
});

function useDialog() {
    const ref = useContext(DialogContext);

    return useMemo<DialogInternalApi>(() => ({
        open(elm) {
            ref.current?.open(elm);
        },
        close() {
            ref.current?.close();
        }
    }), []);
}

export { DialogProvider, useDialog };