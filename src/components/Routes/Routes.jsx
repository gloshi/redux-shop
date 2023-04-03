import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'

import { ROUTES } from "../../utils/routes";
import SingleProduct from '../Products/SingleProduct';
import Profile from '../Profile/Profile';
import SingleCategory from '../Categories/SingleCategory';

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PRODUCT}  element={<SingleProduct />} />
        <Route path={ROUTES.PROFILE}  element={<Profile />} />
        <Route path={ROUTES.CATEGORY}  element={<SingleCategory />} />

    </Routes>

)




export default AppRoutes