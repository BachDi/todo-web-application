import { useRouter } from 'next/router'
import React from 'react'

const ButtonLink = (props) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(props.link)
  }
  return (
    <div>
      <button className="button-basic" onClick={handleClick}>
        {props.name}
      </button>
    </div>
  )
}

export default ButtonLink
