import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

const questions = [
	{
		title: 'Что такое Virtual DOM?',
		variants: [
			'Настоящий DOM',
			'Виртуальное представление DOM для оптимизации',
			'Система управления файлами',
		],
		correct: 1,
	},
	{
		title: 'useState в React используется для ... ?',
		variants: [
			'создания компонентов',
			'управления состоянием компонентов',
			'подключения стилей',
		],
		correct: 1,
	},
	{
		title: 'Что такое props в React?',
		variants: [
			'данные, передаваемые в компонент',
			'функция для создания компонентов',
			'часть CSS',
		],
		correct: 0,
	},
	{
		title: 'Какой hook используется для сайд-эффектов в React?',
		variants: ['useEffect', 'useContext', 'useReducer'],
		correct: 0,
	},
	{
		title: 'React-компоненты могут быть ... ?',
		variants: [
			'функциональными и классовыми',
			'только классовыми',
			'только функциональными',
		],
		correct: 0,
	},
	{
		title: 'Что такое ключи (keys) в списках React?',
		variants: [
			'уникальные идентификаторы элементов списка',
			'параметры для props',
			'методы для работы с состоянием',
		],
		correct: 0,
	},
	{
		title: 'useContext позволяет ... ?',
		variants: [
			'работать с контекстом внутри компонента',
			'обновлять DOM',
			'подключать стили',
		],
		correct: 0,
	},
	{
		title: 'Что такое React Router?',
		variants: [
			'библиотека для управления состоянием',
			'библиотека для работы с маршрутизацией',
			'библиотека для работы с API',
		],
		correct: 1,
	},
	{
		title: 'Как обновить состояние в React?',
		variants: [
			'через setState или useState',
			'изменить напрямую',
			'перезапустить приложение',
		],
		correct: 0,
	},
	{
		title: 'Что такое HOC (Higher-Order Component)?',
		variants: [
			'компонент, который возвращает другой компонент',
			'библиотека для работы с формами',
			'модуль для работы с состоянием',
		],
		correct: 0,
	},
]

function Result({ correct }) {
	return (
		<div className='result'>
			<img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
			<h2>
				Вы отгадали {correct} ответа из {questions.length}
			</h2>
			<a href='/'>
				<button>Попробовать снова</button>
			</a>
		</div>
	)
}

function Game({ step, question, onClickVariant }) {
	const percentage = Math.round((step / questions.length) * 100)

	console.log(percentage)
	return (
		<>
			<div className='progress'>
				<div
					style={{ width: `${percentage}%` }}
					className='progress__inner'
				></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((text, index) => (
					<li onClick={() => onClickVariant(index)} key={text}>
						{text}
					</li>
				))}
			</ul>
		</>
	)
}

function App() {
	const [step, setStep] = React.useState(0)
	const [correct, setCorrect] = React.useState(0)
	const question = questions[step]

	const onClickVariant = index => {
		console.log(step, index)
		setStep(step + 1)

		if (index === question.correct) {
			setCorrect(correct + 1)
		}
	}

	return (
		<div className='App'>
			{step != questions.length ? (
				<Game step={step} question={question} onClickVariant={onClickVariant} />
			) : (
				<Result correct={correct} />
			)}
		</div>
	)
}

export default App
