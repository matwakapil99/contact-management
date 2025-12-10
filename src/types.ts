export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
}

export interface ContactsState {
  items: Contact[];
}
