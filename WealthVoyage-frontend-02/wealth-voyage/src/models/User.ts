class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  userEmail: string;
  role: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    userEmail: string,
    role: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.userEmail = userEmail;
    this.role = role;
  }
}

export default User;
