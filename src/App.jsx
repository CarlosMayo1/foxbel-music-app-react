import { Routes, Route } from 'react-router-dom'
import { useRef } from 'react'
import Content from './Pages/Content/Content'
import Playlists from './Pages/Playlists/Playlists'
import Tracks from './Pages/Tracks/Tracks'

function App() {
	const audioRef = useRef(null)
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Content audioRef={audioRef} />}>
					<Route index element={<Playlists audioRef={audioRef} />} />
					<Route path='/:id' element={<Tracks />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
