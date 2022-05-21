export const searchedRepos = (items=[]) =>{
    return {
        type:'searched',
        payload:items
    }
}

export const makeFavourite = (repoDetails={}) =>{ 
    return {
        type:'add_favourites',
        payload:repoDetails
    }
}

export const removeFavourite = (repoId=[]) =>{
    return {
        type:'remove_favourites',
        payload:repoId
    }
}

export const importFavourite = (favArr=[]) => {
    return {
        type:'import_favourites',
        payload: favArr
    }
}

