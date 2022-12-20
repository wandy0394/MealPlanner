import { instance } from "./axios-instance";

class MealService {
    async getMeals() {
        try {
            const resp = await instance.get(`/meals`)
            // console.log(resp)
            return resp.data
        }
        catch(e) {
            return {error:'Error'}
        }
    }
    async updateMeal(meals) {
        try {
            const resp =  await instance.put(`/meal/`, meals)
            return resp
        }
        catch (e) {
            return {error:'Error'}
        }        
    }
    async addMeal(meals) {
        try {
            const resp =  await instance.post(`/meal/`, meals)
            return resp
        }
        catch (e) {
            return {error:'Error'}
        }
    }
}

export default new MealService