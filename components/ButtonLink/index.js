import { useRouter } from 'next/dist/client/router';
import React from 'react'

const ButtonLink = (props) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(props.link);
  }
  return (
    <div>
      <button onClick={handleClick}>{props.name}</button>
    </div>
  )
}

export default ButtonLink
