import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactsState } from '../types';

const STORAGE_KEY = 'contacts_v1';

const load = (): Contact[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const save = (items: Contact[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
};

const initialState: ContactsState = { items: load() };

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.items.unshift(action.payload);
      save(state.items);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const idx = state.items.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      save(state.items);
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.items = state.items.filter(c => c.id !== action.payload);
      save(state.items);
    },
    bulkDelete(state, action: PayloadAction<string[]>) {
      const toDelete = new Set(action.payload);
      state.items = state.items.filter(c => !toDelete.has(c.id));
      save(state.items);
    }
  }
});

export const { addContact, updateContact, deleteContact, bulkDelete } = slice.actions;
export default slice.reducer;
