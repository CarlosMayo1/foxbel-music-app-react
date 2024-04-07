import { useEffect } from 'react'
import { useStore, useDispatch } from '../../store/StoreProvider'
import { Link, useParams, useLocation } from 'react-router-dom'
import { FETCH_TRACKS_FROM_SELECTED_PLAYLIST } from '../../constants/constants'

const Tracks = ({ cover }) => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const location = useLocation()
	console.log(location.state)

	useEffect(() => {
		const url = `https://api.deezer.com/playlist/${id}/tracks`
		fetch(url)
			.then(response => response.json())
			.then(tracks => {
				const { data } = tracks
				const filteredTracks = data.filter(track => track.preview !== '')

				console.log(filteredTracks)
				dispatch({
					type: FETCH_TRACKS_FROM_SELECTED_PLAYLIST,
					payload: filteredTracks,
				})
			})
	}, [])

	return (
		<div>
			<h1>Here are the tracks</h1>
			<img src={location.state} />
			{id}
			<Link to='/' className='text-blue-500'>
				Volver
			</Link>
		</div>
	)
}

export default Tracks
