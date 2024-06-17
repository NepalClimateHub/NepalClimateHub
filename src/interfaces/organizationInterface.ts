// define the interfaces for the data structure
export interface Contact {
  email: string;
  phone: string;
}

export interface Socials {
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface Organization {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: Contact;
  socials: Socials;
  website: string;
  tags: string[];
  logoUrl: string;
  pictures: string[];
}
