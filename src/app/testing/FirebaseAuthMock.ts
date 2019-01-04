import { auth } from './user.mock';

export class FirebaseAuthMock {
    signInWithEmailAndPassword(email: string, password: string) {
        return auth;
    }
    createUserWithEmailAndPassword(email: string, password: string) {
        return true;
    }
}
