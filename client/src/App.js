import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [error, setError] = useState('');
	const [fName, setfName] = useState('');
	const [lName, setlName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!loginEmail) {
			setLoginError('email is required');
		}
	};

	var domains = ['gmail', 'rediffmail', 'yahoo'];
	function validateDomain(me) {
		let evalidate = me.split('@');
		let emailValidate = evalidate[1].split('.');

		return domains.filter((item) => {
			if (item === emailValidate[0]) {
				domains.pop(item);
			}
			return true;
		});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();

		setError('');
		if (!fName) {
			setError('Please Check The First Name');
			return;
		}
		if (!lName) {
			setError('Please Check The Last Name');
			return;
		}

		if (!email) {
			setError('email is required');
		} else {
			if (password === cPassword) {
				const emailconfirm = validateDomain(email);
				if (emailconfirm.length === 3) {
					setError('you are verifeid');
					const data = {
						fName,
						lName,
						email,
						password,
					};
					const domain = `http://localhost:3001/api/user`;
					axios.post(domain, data).then((res) => {
						setError(res.message);
						console.log(res);
					});
				} else {
					setError('Please use Professional Email');
				}
			} else {
				setError("Password and Confirm Password Don't Match");
			}
		}
	};

	return (
		<div className='container'>
			<div className='card my-5'>
				<div className='row py-auto mx-auto py-5'>
					<div className='col-md-6'>
						<h3 className='mb-3'>Login</h3>
						<div className='form-group'>
							{loginError && (
								<div
									className='alert alert-danger'
									role='alert'>
									{loginError}

									<button
										type='button'
										className='close'
										data-dismiss='alert'
										aria-label='Close'>
										<span aria-hidden='true'>&times;</span>
									</button>
								</div>
							)}
						</div>
						<form>
							<div className='form-group'>
								<input
									type='email'
									className='form-control shadow'
									placeholder='Enter Your Email*'
									name='loginEmail'
									value={loginEmail}
									onChange={(e) =>
										setLoginEmail(e.target.value)
									}
								/>
							</div>
							<div className='form-group'>
								<input
									type='password'
									className='form-control shadow'
									placeholder='Enter Your Password'
									name='loginPassword'
									value={loginPassword}
									onChange={(e) =>
										setLoginPassword(e.target.value)
									}
								/>
							</div>

							<button
								className='btn-outline-info btn shadow mt-2'
								onClick={handleLogin}
								type='submit'
								name='submit'>
								Login{' '}
							</button>
						</form>
					</div>
					<div className='col-md-6'>
						<h3 className='mb-3'>Register</h3>
						<div className='form-group'>
							{error && (
								<div
									className='alert alert-danger'
									role='alert'>
									{error}

									<button
										type='button'
										className='close'
										data-dismiss='alert'
										aria-label='Close'>
										<span aria-hidden='true'>&times;</span>
									</button>
								</div>
							)}
						</div>
						<form method='post' autoComplete='off'>
							<div className='row'>
								<div className='col-md-6'>
									<div className='form-group mt-2'>
										<input
											type='text'
											className='form-control'
											name='name'
											required=''
											value={fName}
											onChange={(e) =>
												setfName(e.target.value)
											}
											placeholder='Enter Your First Name*'
										/>
									</div>
								</div>
								<div className='col-md-6'>
									<div className='form-group mt-2'>
										<input
											type='text'
											className='form-control'
											name='name'
											required=''
											value={lName}
											onChange={(e) =>
												setlName(e.target.value)
											}
											placeholder='Enter Your Last Name*'
										/>
									</div>
								</div>
								<div className='col-md-12'>
									<div className='form-group mt-2'>
										<input
											type='email'
											className='form-control'
											name='email'
											required={true}
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											placeholder='Enter Your Email*'
										/>
									</div>
								</div>
								<div className='col-md-12'>
									<div className='form-group mt-2'>
										<input
											type='password'
											className='form-control'
											name='password'
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											required=''
											placeholder='Enter Your Password'
										/>
									</div>
								</div>
								<div className='col-md-12'>
									<div className='form-group mt-2'>
										<input
											type='password'
											className='form-control'
											name='cpassword'
											value={cPassword}
											onChange={(e) =>
												setCPassword(e.target.value)
											}
											required=''
											placeholder='Enter Your Confirm Password'
										/>
									</div>
								</div>
							</div>

							<div className='form-submit'>
								<button
									className='btn-outline-info btn shadow mt-4'
									onClick={handleSubmit}
									type='submit'
									name='submit'>
									Send Message{' '}
									<i className='fas fa-long-arrow-alt-right'></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
