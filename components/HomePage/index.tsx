import ButtonLink from 'components/ButtonLink'
import { observer } from 'mobx-react'
import React from 'react'
import routes from 'routes'

const HomePage = () => {
  return (
    <div>
      <ButtonLink name="Admin" link={routes.project.value} />
      <ButtonLink name="Task" link={routes.todo.value} />
      <ButtonLink name="Sign up" link={routes.signup.value} />
      <ButtonLink name="Log in" link={routes.login.value} />
    </div>
  )
}

export default observer(HomePage)
