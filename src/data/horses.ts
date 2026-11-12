export interface HorseListing {
  id: string;
  name: string;
  image: string;
  breed: string;
  age: string;
  gender: string;
  training: string;
  location: string;
  price?: string;
  description: string;
}
// Add only genuine, owner-approved listings. Empty means no published listings.
export const horses: HorseListing[] = [];
