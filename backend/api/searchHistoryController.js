import SearchHistory from "../data/searchHistory.js"

const DUMMY_EMAIL = 'dev@email.com'

export default class SearchHistoryController {
    //methods go here

    static apiGetSearchHistory(req, res, next) {
        SearchHistory.getRecipeSearchHistory(DUMMY_EMAIL)
            .then((resp)=> {
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                res.json(output)
            })
            .catch((resp)=> {
                return resp
            })
    }
    static apiGetSearchHistoryByType(req, res, next) {
        const type = req.params.type
        SearchHistory.getRecipeSearchHistoryByType(DUMMY_EMAIL, type)
            .then((resp)=> {
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                res.json(output)
            })
            .catch((resp)=> {
                return resp
            })
    }
    static apiRemoveSearchQuery(req, res, next) {
        const params = req.body
        SearchHistory.removeSearchQuery(req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not delete query from database'})
            })       

        return        
    }



}