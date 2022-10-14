import { setPersistence, connectAuthEmulator } from 'firebase/auth';
import auth from './firebase';

setPersistence(auth, browserSessionPersistence);
connectAuthEmulator(auth, "http://localhost:9099");