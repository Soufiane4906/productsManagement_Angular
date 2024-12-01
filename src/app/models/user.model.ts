export class userModel {
    id: number;
    username: string;
    password: string;
    roles : string [] ;
    constructor() {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.roles = [];
    }

}
