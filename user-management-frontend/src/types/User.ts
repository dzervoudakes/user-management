/**
 * Define expected shape for user objects.
 * @packageDocumentation
 */
export interface User {
  address: string;
  firstName: string;
  gender: 'male' | 'female' | 'other';
  id: string;
  lastName: string;
  username: string;
}

export default User;
