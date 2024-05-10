export class User {
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;

    constructor(id: number, email: string, userName: string, firstName: string,lastName: string) {
      this.id = id;
      this.email = email;
      this.userName = userName;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }