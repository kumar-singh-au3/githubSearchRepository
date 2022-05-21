const searchResults = (state=[], action={}) =>{
    switch (action.type){
        case 'searched':
            return action?.payload || []
        default:
            return state    
    }
}
export default searchResults