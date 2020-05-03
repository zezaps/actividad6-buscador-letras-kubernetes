import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

/* const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS':
            return{
                ...state,
                track_list: action.payload,
                heading: 'Resultados de búsqueda'
            };
        default:
                return state;
    }
} */

export function ContextController({ children }) {
	let initialState = {
		track_list: [],
		heading: "",
		//  dispatch: action => this.setState(state=> reducer(state,action))
	};

	const [state, setState] = useState(initialState);

	useEffect(() => {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=ES&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then(res => {
				// console.log(res.data)
				setState({
					track_list: res.data.message.body.track_list,
					heading: "Top Canciones del Momento",
				});
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Context.Provider value={[state, setState]}>{children}</Context.Provider>
	);
}
