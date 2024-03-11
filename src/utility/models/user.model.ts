export class UserModel {
    name?: string;
    email?: string;
    password!: string;
    salt?: string;
}
