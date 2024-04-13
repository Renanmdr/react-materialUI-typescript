import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
//import { Home } from '../pages/Home'
import { Button } from '@mui/material'
import { useAppThemeContext } from '../shared/contexts'


export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext()

    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Button variant="contained" color="primary" onClick={toggleTheme}>Toggle theme</Button>} />
            <Route path='*' element={<Navigate to={'/'}/>} />
          </Routes>
        </BrowserRouter>
    )
}