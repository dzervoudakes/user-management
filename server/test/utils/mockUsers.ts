import { UserType } from '@src/models';

export const mockUserOne = {
  firstName: 'Eli',
  lastName: 'Manning',
  username: 'nyg10', // unique constraint
  address: '1925 Giants Drive, East Rutherford, NJ 07071',
  gender: 'male' as UserType['gender']
};

export const mockUserTwo = {
  firstName: 'Saquon',
  lastName: 'Barkley',
  username: 'nyg26', // unique constraint
  address: '1925 Giants Drive, East Rutherford, NJ 07071',
  gender: 'male' as UserType['gender']
};
