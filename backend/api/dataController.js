import SearchHistory from "../data/searchHistory.js"

const DUMMY_EMAIL = 'dev@email.com'

export default class DataController {
    //methods go here

    static apiGetSearchHistory(req, res, next) {
        SearchHistory.getRecipeSearchHistory(DUMMY_EMAIL)
            .then((resp)=> {
                console.log('resolved')
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                console.log(output)
                res.json(output)
            })
            .catch((resp)=> {
                //console.log('caught')
                //console.log(resp)
                return resp
            })
    }
    static apiGetSearchHistoryByType(req, res, next) {
        const type = req.params.type
        console.log(type)
        SearchHistory.getRecipeSearchHistoryByType(DUMMY_EMAIL, type)
            .then((resp)=> {
                console.log('resolved')
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                console.log(output)
                res.json(output)
            })
            .catch((resp)=> {
                console.log('caught')
                console.log(resp)
                //console.log(resp)
                return resp
            })
    }
    static apiRemoveSearchQuery(req, res, next) {
        const params = req.body
        console.log(req.params)
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