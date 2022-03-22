import { getAuth, connectAuthEmulator } from 'firebase/auth'; // Firebase v9+
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'; // Firebase v9+

import { FirebaseAppProvider, DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import App from './App';

function FirebaseSetup() {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <App />
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default FirebaseSetup;