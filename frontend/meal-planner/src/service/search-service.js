import { instance } from "./axios-instance";

class SearchService {
    async searchIngredients(text, page, doStoreSearch) {
        try {
            const resp = await instance.get(`ingredient/search/${text}/${page}`, {params:{doStoreSearch:doStoreSearch}})
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }
        
    }
    async searchRecipes(data) {
        try {
            const text = data.searchText
            const resp = await instance.get(`recipe/search/${text}`, { params:{...data}})
            let retval = resp.data
            return retval
        }
        catch(e) {
            return {error:'Error'}
        }
    }
    async getSearchHistory(type) {
        try {
            const resp = await instance.get(`searchHistory/query/${type}`)
            return resp.data
        }
        catch (e) {
            return {error:'Could not get history'}
        }
        
    }
    async removeSearchQuery(id) {
        try {
            const resp = await instance.delete(`searchHistory/${id}`)
            return resp.data
        }
        catch (e) {
            return {error:'Could not get history'}
        }
        
    }
}

export default new SearchService