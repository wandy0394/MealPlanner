import { instance } from "./axios-instance"

class IngredientService {
    async getIngredients() {
        try {
            const resp = await instance.get(`/ingredient/all`)
            return resp.data
        }
        catch (e) {
            return {error:'error'}
        }
    }
    async getIngredient(id) {
        try {
            const resp = await instance.get(`/ingredient/${id}`)
            return resp.data
        }
        catch (e) {
            return {error:'Error'}
        }
    }
    async addIngredient(params) {
        try {
            const resp =  await instance.post('/ingredient', params)
            return resp
        }
        catch (e) {
            return {error:'Could not add ingredient'}
        }
    }
    async updateIngredient(params) {
        try {
            const resp =  await instance.put(`/ingredient/${params.id}`, params)
            return resp
        }
        catch (e) {
            return {error:'Could not update ingredient'}
        }
    }
    async removeIngredient(id) {
        try {
            const resp =  await instance.delete(`/ingredient/${id}`)
            return resp
        }
        catch (e) {
            return {error:'Could not delete ingredient'}
        }
    }
}

export default new IngredientService