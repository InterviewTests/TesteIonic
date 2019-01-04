// import { auth } from './user.mock';

export class FirebaseAuthMock {
    constructor() {}
    signInWithEmailAndPassword(email: string, password: string) {
        return false;
    }
    createUserWithEmailAndPassword(email: string, password: string) {
        return true;
    }
}
