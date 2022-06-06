export class User {
    id: string;
    username: string;
    password: string;
    
    constructor(id: string, username: string, pass: string) {
        this.id = id;
        this.username = username;
        this.password = pass;
    };
} 
