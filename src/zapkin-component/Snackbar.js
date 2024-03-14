import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ClickAwayListener from '@mui/material/ClickAwayListener'

export default function AlertSnackbar({ message, error, serError }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    serError('')
  }

  return (
    <>
      {error && (
        <ClickAwayListener onClickAway={handleClose}>
          <Snackbar
            open={error}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        </ClickAwayListener>
      )}
    </>
  )
}
