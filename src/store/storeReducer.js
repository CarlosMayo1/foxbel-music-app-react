import {
	FETCH_PLAYLISTS_FROM_API,
	FETCH_TRACKS_FROM_SELECTED_PLAYLIST,
	PREV_TRACK,
	PLAY_TRACK,
	NEXT_TRACK,
	PAUSE_TRACK,
} from '../constants/constants'

const initialStore = {
	playlists: [],
	album: [],
	tracks: [],
	trackIndex: 0,
	loading: false,
	isPlayed: false,
}

const storeReducer = (state, action) => {
	switch (action.type) {
		case FETCH_PLAYLISTS_FROM_API:
			return {
				...state,
				playlists: action.payload,
			}
		case FETCH_TRACKS_FROM_SELECTED_PLAYLIST:
			return {
				...state,
				tracks: action.payload,
			}
		// change this to use trackIndex: state.trackIndex + 1 in both cases, prev and next
		case PREV_TRACK:
			return {
				...state,
				trackIndex: action.payload,
			}

		case PLAY_TRACK:
			return {
				...state,
				isPlayed: true,
			}
		case PAUSE_TRACK:
			return {
				...state,
				isPlayed: false,
			}
		case NEXT_TRACK:
			return {
				...state,
				trackIndex: action.payload,
			}

		default:
			return state
	}
}

export { initialStore }
export default storeReducer
