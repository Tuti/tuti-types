import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/navbar';
import { auth } from '../firebase/firebase';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [createUsername, setCreateUsername] = useState('');
  const [createEmail, setCreateEmail] = useState({email: '', confirmEmail: ''});
  const [createPassword, setCreatePassword] = useState({password: '', confirmpass: ''});
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('msg');

  const router = useRouter();

  function handleSignUp() {
    if(createEmail.email !== createEmail.confirmEmail) {
      setMessage('Email does not match');
      return;
    }

    if(createPassword.password !== createPassword.confirmpass) {
      setMessage('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, createEmail.email, createPassword.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {displayName: createUsername})
      })
      .then(router.push('/account'))
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        if(errorCode === 'auth/email-already-in-use') {
          setMessage('This account already exists');
          return;
        }
        if(errorCode === 'auth/invalid-email') {
          setMessage('Invalid email');
          return;
        }
        if(errorCode === 'auth/weak-password') {
          setMessage('Password is weak, try again');
          return;
        }
        if(errorCode === 'auth/operation-not-allowed') {
          setMessage('Operation not allowed');
          return;
        }
        setMessage(errorCode);
      }); 
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(console.log('logged in'))
      .then(router.push('/account'))
      .catch((error) => {
        setMessage(error.code);
      });
  }

  return(
    <div className={styles['container']}>
      <Navbar />
      <div className={styles['login-wrapper']}>
        <div className={styles['create-account']}>
          <div className={styles['create-login-form']}>
            <h2 className={styles['header']}>Create Account</h2>
            <input 
              placeholder='username' 
              value={createUsername} 
              onChange={(e) => setCreateUsername(e.target.value)}
            />
            <input 
              placeholder='email' 
              value={createEmail.email} 
              onChange={(e) => setCreateEmail({...createEmail, email: e.target.value})}
            />
            <input 
              placeholder='verify email' 
              value={createEmail.confirmEmail} 
              onChange={(e) => setCreateEmail({...createEmail, confirmEmail: e.target.value})}
            />
            <input 
              placeholder='password'
              type={'password'}
              value={createPassword.password} 
              onChange={(e) => {setCreatePassword({...createPassword, password: e.target.value})}}
            />
            <input 
              placeholder='verify password'
              type={'password'}
              value={createPassword.confirmpass} 
              onChange={(e) => {setCreatePassword({...createPassword, confirmpass: e.target.value})}}
            />
            <button onClick={handleSignUp}>sign up</button>
          </div>
        </div>
        <div className={styles['login-account']}>
          <div className={styles['create-login-form']}>
            <h2 className={styles['header']}>Login</h2>
            <input 
              placeholder='email' 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input 
              placeholder='password'
              type={'password'}
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>log in</button>
          </div>
        </div>
      </div>
      <div className={message === 'msg' ? `${styles['hidden']} ${styles['message']}` : styles['message']}>{message}</div>
    </div>
  )
}