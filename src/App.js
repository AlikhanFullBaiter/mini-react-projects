import React from 'react'
import { useState, useEffect } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [invites, setInvites] = useState([])
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		fetch('https://reqres.in/api/users')
			.then(res => res.json())
			.then(json => {
				setUsers(json.data)
			})
			.catch(e => {
				console.warn(e)
			})
			.finally(() => setLoading(false))
	})

	const onChangeSearchVAlue = event => {
		setSearchValue(event.target.value)
	}

	const onClickInvite = id => {
		if (invites.includes(id)) {
			setInvites(prev => prev.filter(_id => _id !== id))
		} else {
			setInvites(prev => [...prev, id])
		}
	}

	const onClickSetInvites = () => {
		setSuccess(true)
	}

	return (
		<div className='App'>
			{success ? (
				<Success count={invites.length} />
			) : (
				<Users
					searchValue={searchValue}
					onChangeSearchValue={onChangeSearchVAlue}
					items={users}
					isLoading={isLoading}
					invites={invites}
					onClickInvite={onClickInvite}
					onClickSetInvites={onClickSetInvites}
				/>
			)}
		</div>
	)
}

export default App
