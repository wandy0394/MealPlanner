import { Box } from '@mui/material'
import './App.css'
import MenuBar from './components/Menu'
import { useState } from 'react'


export default function App() {

  const [open, setOpen] = useState(true)

  return (
    <Box>
      <Box>
        <MenuBar open={open} setOpen={setOpen}/>
      </Box>
    </Box>
  )
}