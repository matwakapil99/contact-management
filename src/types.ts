export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  state?: string;
  pincode: string;
}

export interface ContactsState {
  items: Contact[];
}
