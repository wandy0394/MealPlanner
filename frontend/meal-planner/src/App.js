import { Box } from '@mui/material'
import './App.css'
import MenuBar from './components/Menu'
import { useState } from 'react'
import AppRoutes from './AppRoutes'

export default function App() {

  const [open, setOpen] = useState(true)

  return (
    <Box>
      {/* <MenuBar open={open} setOpen={setOpen}/> */}
      <AppRoutes/>
    </Box>

  )
}