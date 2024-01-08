import './App.css';

import 'firebase/firestore';
import 'firebase/auth';


import { initializeApp } from "firebase/app";
import TodoList from './components/TodoList';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBv1wztnOrOf5YLKG-J6wuz19YbO-uFMHI",
  authDomain: "todo-list-ac2ff.firebaseapp.com",
  projectId: "todo-list-ac2ff",
  storageBucket: "todo-list-ac2ff.appspot.com",
  messagingSenderId: "153963668498",
  appId: "1:153963668498:web:ea22d29d4c695b74c7e4cb",
  measurementId: "G-S19196XGZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


function App() {

  return (
    <div className="App">
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh'
      }}>
        <TodoList
          dataBase={db}
        />
      </section>
    </div>
  );
}

export default App;
