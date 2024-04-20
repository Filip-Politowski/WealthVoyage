export type UserProfileToken = {
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

export type UserProfile = {
  username: string;
  role: string;
};

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
