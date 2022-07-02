import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <>
      <Backdrop open>
      <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
