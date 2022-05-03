import { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    // <div>
    // <div style={hideWhenVisible}>
    //   <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    // </div>
    // <div style={showWhenVisible} className="togglableContent">
    //   {props.children}
    //   <button onClick={toggleVisibility} id="cancel">
    //     cancel
    //   </button>
    // </div>
    // </div>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > :not(style)': { m: 1 },
      }}
    >
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <Box
        style={showWhenVisible}
        className="togglableContent"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& > :not(style)': { m: 1 },
        }}
      >
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </Box>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable
