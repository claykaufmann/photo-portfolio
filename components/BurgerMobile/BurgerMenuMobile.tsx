import * as React from 'react'
import { useState, useRef } from 'react'
import Burger from './BurgerMobile'
import Menu from './MenuMobile'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

interface props {
  textColor: string
}

const BurgerMenuMobile: React.VFC<props> = ({ textColor }) => {
  const [open, setOpen] = useState(false)
  const node = useRef<HTMLDivElement>(null)
  useOnClickOutside(node, () => setOpen(false))

  return (
    <div ref={node}>
      <Burger textColor={textColor} open={open} setOpen={setOpen} />
      <Menu open={open} setOpen={setOpen} />
    </div>
  )
}

export default BurgerMenuMobile
