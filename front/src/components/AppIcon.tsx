import { makeStyles } from '@material-ui/core'
import React from 'react'
import logo from '../logo.svg'

const useStyles = makeStyles({
  img: {
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
  },
})

export default function AppIcon() {
  const styles = useStyles()
  return <img src={logo} className={styles.img} alt="Home icon" />
}
