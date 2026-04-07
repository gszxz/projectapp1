import { useEffect, useState } from 'react';
import './App.css';
import Trash from '../src/assets/trash.png';
import api from './services/api.js'

function App() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');      // ← estado para cada input
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    async function getUsers() {
        const userFromAPI = await api.get('/usuarios')
        setUsers(userFromAPI.data);
    }

    async function createUser() {

        await api.post('/usuarios', 
        {
          "name": name,
          "age": age,
          "email": email
        })
        getUsers(); // atualiza a lista depois de cadastrar
        setName('');  // limpa os campos
        setEmail('');
        setAge('');
    }
    async function deleteUser(id) {
      await api.delete(`/usuarios/${id}`)
      getUsers()
    }
    async function deleteUser(id) {
        await api.delete(`/usuarios/${id}`)
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <form>
                <h1>Cadastro de Usuarios</h1>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // ← captura o valor
                    type='email'
                    placeholder='Coloque seu Email'
                />
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='Coloque seu Nome'
                />
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type='number'
                    placeholder='Coloque sua Idade'
                />
                <button onClick={createUser} type='button'>Cadastrar</button>  {/* ← onClick aqui */}
            </form>

            <div>
                {users.map((user) => (
                    <div key={user.id} className='card'>
                        <p>Nome: <span>{user.name}</span></p>
                        <p>Idade: <span>{user.age}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                        <button onClick={() => deleteUser(user.id)}>
                            <img src={Trash} className='TrashButton' alt="Deletar"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;