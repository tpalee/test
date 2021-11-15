import React from 'react';
import {useState, useContext} from "react";
import { AuthContext } from '../../context/AuthContext';
import {Link} from "react-router-dom";
import axios from "axios";
import styles from './Signin.module.css';
import {FaUser} from 'react-icons/fa';



function Signin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        console.log(username,password);

        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                username: username,
                password: password,
            });
            // log result
            console.log(result.data.jwt);
            login(result.data.jwt);

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }


    return (


        <div className={styles.logincontainer}>
            <div className={styles.titlecontainer}>
                <FaUser id={styles['login-user-icon']}/>
                <h3 id={styles['loginform-title']}>SignIn</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label htmlFor="password">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">Combinatie van username en wachtwoord is onjuist</p>}

                <button
                    type="submit"
                    className="form-button"
                >
                    Inloggen
                </button>
            </form>
{/*            <Button className={`${styles.loginbutton} ${styles.cancelbutton}`} type="button">
                Cancel
            </Button>*/}
    <p>Heb je nog geen account? <Link to="/signup">Signup</Link> first</p>
        </div>
    );
}

export default Signin;