import { createContext } from 'react';

import { createEditorState } from '../store/editor.store';

const StoreContext = createContext<ReturnType<typeof createEditorState> | null>(null);

export const Provider = StoreContext.Provider;
export default StoreContext;