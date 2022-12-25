import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Ingredients from './pages/Ingredients'
import MealPlans from './pages/MealPlan'
import Recipes from './pages/Recipes'
import Search from './pages/Search'
import ShoppingList from './pages/ShoppingList'
import SearchDetails from './pages/SearchDetails'
import Dashboard from './pages/Dashboard'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/Dashboard" element={<Dashboard/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/search/details/:id" element={<SearchDetails />} />
                <Route path="/ingredients" element={<Ingredients/>} />
                <Route path="/recipes" element={<Recipes/>} />
                <Route path="/meal-plans" element={<MealPlans/>} />
                <Route path="/shopping-list" element={<ShoppingList/>} />
            </Route>
        </Routes>

    )
}