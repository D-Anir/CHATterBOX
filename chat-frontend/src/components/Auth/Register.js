import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/auth'
import './Auth.scss'

const Register = ({ history }) => {

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Prefer Not to Say')
    const [password, setPassword] = useState('')
    // const [avatar, setAvatar] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(register({ firstName, lastName, email, gender, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section-register'>
                        <img src={require('../../assets/images/image.png')} alt='Register' />
                    </div>

                    <div id='form-section'>
                        <h2>Create an account</h2>

                        <div className='form-div'>
                            <form onSubmit={submitForm}>
                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setFirstName(e.target.value)}
                                        value={firstName}
                                        required='required'
                                        type='text'
                                        placeholder='First name' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        required='required'
                                        type='text'
                                        placeholder='Last name' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        required='required'
                                        type='text'
                                        placeholder='Email' />
                                </div>

                                <div className='input-field mb-1'>
                                    <select
                                        onChange={e => setGender(e.target.value)}
                                        value={gender}
                                        required='required'
                                    >
                                        <option value="" disabled selected hidden>Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                        <option value='prefer not to say'>Prefer Not to Say</option>
                                    </select>
                                </div>

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        required='required'
                                        type='password'
                                        placeholder='Password' />
                                </div>

                                {/* <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setAvatar(e.target.files[0])}
                                        type='file' />
                                </div> */}

                                <button>REGISTER</button>
                            </form>
                        </div>

                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register