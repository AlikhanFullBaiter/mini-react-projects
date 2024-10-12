import React, { useEffect } from 'react'
import './index.scss'
import Collection from './Collection'
import { useState } from 'react'

const cats = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' },
]

function App() {
	const [categoryId, setCategoryId] = useState(0)
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [collections, setCollections] = useState([])

	React.useEffect(() => {
		setIsLoading(true)

		const category = categoryId ? `category=${categoryId}` : ''

		fetch(
			`https://670aac53ac6860a6c2ca2e70.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
		)
			.then(res => res.json())
			.then(json => {
				setCollections(json)
			})
			.catch(e => {
				console.warn(e)
			})
			.finally(() => setIsLoading(false))
	}, [categoryId, page])

	console.log(collections)

	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{cats.map((obj, i) => (
						<li
							onClick={() => setCategoryId(i)}
							className={categoryId === i ? 'active' : ''}
							key={obj.name}
						>
							{obj.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='content'>
				{isLoading ? (
					<h2>Loading ...</h2>
				) : (
					collections
						.filter(obj => {
							return obj.name.toLowerCase().includes(searchValue.toLowerCase())
						})
						.map(obj => (
							<Collection key={obj.index} name={obj.name} images={obj.photos} />
						))
				)}
			</div>
			<ul className='pagination'>
				{[...Array(3)].map((_, i) => (
					<li
						onClick={() => setPage(i + 1)}
						className={page === i + 1 ? 'active' : ''}
					>
						{i + 1}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
