export const initialState = {
    discoverMovie:[],
    discoverTv:[],
    trending:[],
    playing:false,
    selectedMovie:null,
    id:"772071"
   
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_DISCOVER_MOVIE":
            return {
                ...state,
                discoverMovie: action.discoverMovie,
            };
            case "SET_DISCOVER_TV":
                return {
                    ...state,
                    discoverTv: action.discoverTv,
                }; 
                case "SET_ID":
                    return {
                        ...state,
                        id: action.id,
                    };          
        case "SET_TRENDING":
            return{
                ...state,
                trending:action.trending,
            };
            case "SET_PLAYING":
                return{
                    ...state,
                    playing:action.playing,
                };
                case "SET_SELECTED_MOVIE":
                    return{
                        ...state,
                        selectedMovie:action.selectedMovie,
                    };        
        default:
            return state;
    }
}

export default reducer;
