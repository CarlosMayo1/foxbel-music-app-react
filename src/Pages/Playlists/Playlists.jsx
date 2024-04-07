import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore, useDispatch } from '../../store/StoreProvider'
import {
	IconPlayerPauseFilled,
	IconPlayerPlayFilled,
} from '@tabler/icons-react'
import {
	FETCH_PLAYLISTS_FROM_API,
	FETCH_TRACKS_FROM_SELECTED_PLAYLIST,
	PLAY_TRACK,
} from '../../constants/constants'

const Playlists = ({ audioRef }) => {
	const { playlists } = useStore()
	const dispatch = useDispatch()

	const onPlaySeletedPlaylist = playlist => {
		console.log(playlist)
		const url = playlist.tracklist
		fetch(url)
			.then(response => response.json())
			.then(response => {
				const { data } = response
				// filters only tracks that has a preview
				const filteredTracks = data.filter(playlist => playlist.preview !== '')

				console.log(filteredTracks)

				dispatch({
					type: FETCH_TRACKS_FROM_SELECTED_PLAYLIST,
					payload: filteredTracks,
				})
			})
		setTimeout(() => {
			dispatch({ type: PLAY_TRACK })
			audioRef.current.play()
		}, 500)
	}

	useEffect(() => {
		// fetch all the playlists of the user
		const url = 'https://api.deezer.com/user/2529/playlists'
		fetch(url)
			.then(playlists => playlists.json())
			.then(playlists => {
				const { data } = playlists
				console.log(data)
				// fetch tracks of the 1st playlist
				fetch(data[0].tracklist)
					.then(tracklist => tracklist.json())
					.then(tracklist => {
						const { data } = tracklist
						// filter tracks without preview
						const filteredTracks = data.filter(
							playlist => playlist.preview !== '',
						)
						dispatch({
							type: FETCH_TRACKS_FROM_SELECTED_PLAYLIST,
							payload: filteredTracks,
						})
					})
				dispatch({ type: FETCH_PLAYLISTS_FROM_API, payload: data })
			})
	}, [])

	return (
		<section>
			<div className='max-w-screen-lg m-auto'>
				<ul className='grid grid-cols-5 gap-8 '>
					{playlists.map(playlist => (
						<li key={playlist.id}>
							<div className='relative flex items-center justify-center'>
								<Link to={`/${playlist.id}`} state={playlist.picture_big}>
									<div className='mb-1'>
										<img
											src={playlist.picture_big}
											className='w-full h-full'
											alt={`Cover of the album ${playlist.title}`}
										></img>
									</div>
								</Link>
								<button
									className='absolute bg-red-principal text-white rounded-full p-2'
									onClick={() => onPlaySeletedPlaylist(playlist)}
								>
									<IconPlayerPlayFilled />
								</button>
							</div>

							<div>
								{playlist.title}
								<p className='text-gray-1 text-xs font-semibold'>
									Tracks: {playlist.nb_tracks}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Playlists

// <nav className='mb-4'>
// 				<ul className='max-w-screen-lg m-auto bg-white w-full flex'>
// 					<li className='py-4 mr-8'>
// 						{' '}
// 						<Link to='/profile' className='text-slate-400 hover:text-slate-700'>
// 							Perfil
// 						</Link>
// 					</li>
// 					<li className='py-4 mr-4'>
// 						{' '}
// 						<Link to='/' className='text-slate-400 hover:text-slate-700'>
// 							Playlist
// 						</Link>
// 					</li>

// 				</ul>
// 			</nav>
