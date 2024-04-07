import { useState, useEffect } from 'react'
import { useStore, useDispatch } from '../../store/StoreProvider'
import {
	IconPlayerSkipBackFilled,
	IconPlayerPlayFilled,
	IconPlayerPauseFilled,
	IconPlayerSkipForwardFilled,
	IconVolume,
	IconVolume2,
	IconVolume3,
} from '@tabler/icons-react'
import {
	PREV_TRACK,
	PLAY_TRACK,
	PAUSE_TRACK,
	NEXT_TRACK,
} from '../../constants/constants'

const Footer = ({ audioRef }) => {
	const { isPlayed, tracks, trackIndex } = useStore()
	const [volume, setVolume] = useState(0.5)
	const dispatch = useDispatch()

	const onPlayHandler = () => {
		// if it is playing, then stop it
		if (isPlayed) {
			audioRef.current.pause()
			dispatch({ type: PAUSE_TRACK })
			return
		}
		// otherwise, play it
		dispatch({ type: PLAY_TRACK })

		setTimeout(() => {
			audioRef.current.play()
		}, 500)
	}

	const onPrevTrackHandler = () => {
		if (trackIndex === 0) {
			dispatch({ type: PREV_TRACK, payload: tracks.length - 1 })
		} else {
			dispatch({ type: PREV_TRACK, payload: trackIndex - 1 })
		}
		setTimeout(() => {
			dispatch({ type: PLAY_TRACK })
			audioRef.current.play()
		}, 500)
	}

	const onNextTrackHandler = () => {
		if (trackIndex === tracks.length - 1) {
			dispatch({ type: NEXT_TRACK, payload: 0 })
		} else {
			dispatch({ type: NEXT_TRACK, payload: trackIndex + 1 })
		}
		setTimeout(() => {
			dispatch({ type: PLAY_TRACK })
			audioRef.current.play()
		}, 500)
	}

	const onChangeVolumeHandler = e => {
		const volumeVal = e.target.value / 100
		setVolume(volumeVal)
		// mute music if necessary
		if (volumeVal === 0) {
			audioRef.current.muted = true
		} else {
			audioRef.current.muted = false
			audioRef.current.volume = volume
		}
	}

	const onEndedTrackHandler = () => {
		if (trackIndex === tracks.length - 1) {
			dispatch({ type: NEXT_TRACK, payload: 0 })
		} else {
			dispatch({ type: NEXT_TRACK, payload: trackIndex + 1 })
		}
		// reproduces the audio
		setTimeout(() => {
			audioRef.current.play()
		}, 500)
	}

	const volumeFnc = () => {
		if (volume === 0) {
			return <IconVolume3 />
		}

		if (volume > 0.5) {
			return <IconVolume />
		} else {
			return <IconVolume2 />
		}
	}

	return (
		<footer className='bg-red-secondary'>
			<div className='grid grid-cols-[330px,1fr,200px] items-center'>
				<div className='flex items-center'>
					<img
						className='w-[100px] h-[100px] mr-2'
						src={tracks[trackIndex]?.album.cover_medium}
						alt={`Cover of the selected album ${tracks[trackIndex]?.album.title}`}
					/>
					<div className='text-white'>
						<p className='font-bold mb-1'>{tracks[trackIndex]?.album.title}</p>
						<p className='font-semibold text-sm'>{tracks[trackIndex]?.title}</p>
					</div>
				</div>
				<div className='flex justify-center items-center'>
					<button id='prevBtn' name='prevBtn' onClick={onPrevTrackHandler}>
						<IconPlayerSkipBackFilled className='text-white' />
					</button>
					<div>
						<audio
							src={tracks.length > 0 ? tracks[trackIndex]?.preview : null}
							ref={audioRef}
							onEnded={onEndedTrackHandler}
						/>
						<button
							type='button'
							className=' bg-light-red rounded-full p-2 mx-4 text-white'
							id='play'
							name='play'
							onClick={onPlayHandler}
						>
							{isPlayed ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
						</button>
					</div>
					<button id='NextBtn' name='NextBtn' onClick={onNextTrackHandler}>
						<IconPlayerSkipForwardFilled className='text-white' />
					</button>
				</div>
				<div className='flex items-center text-white'>
					<input
						type='range'
						name='volume-audio'
						id='volume-audio'
						min={0}
						max={100}
						className=' h-1 bg-white rounded-lg appearance-none cursor-pointer mr-2'
						onChange={e => onChangeVolumeHandler(e)}
					/>
					{volumeFnc()}
				</div>
			</div>
		</footer>
	)
}

export default Footer
