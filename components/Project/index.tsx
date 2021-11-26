import React, { useState } from 'react'
import TodoList from 'components/TodoList'
import { Button, Container, Row, Form, Card } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useStores } from 'stores'
import { IProject } from 'interfaces/project'
import { IUser } from 'interfaces/user'
import uniqBy from 'lodash/uniqBy'
import { toast } from 'react-toastify'
import routes from 'routes'
import ButtonLink from 'components/ButtonLink'

const Project = () => {
  const [name, setName] = useState('')
  const [selectedProject, chooseProject] = useState('')
  const [selectedUser, chooseUser] = useState('')
  const [usersInProject, setUsers] = useState<IUser[]>([])
  console.log(usersInProject)
  const { projectStore, taskStore, userStore } = useStores()
  const { projects } = projectStore
  const { users } = userStore

  console.log(selectedUser)

  function addProject() {
    console.log({ name })
    projectStore.addProject({ name })
    setName('')
  }

  function handleAddUserToProject() {
    if (usersInProject.find((user) => user.id === selectedUser)) {
      toast.error('User already in project')
    } else {
      projectStore.addUserToProject(selectedProject, selectedUser)
    }
  }

  useEffect(() => {
    projectStore.getList()
  }, [])

  useEffect(() => {
    taskStore.getList({
      where: { projectId: selectedProject, isDeleted: { neq: true } },
      include: [{ relation: 'project' }]
    })
    const currentProject: IProject = (
      Array.isArray(projects)
        ? projects.find((project) => project.id === selectedProject) ?? { projectUsers: [] }
        : { projectUsers: [] }
    ) as IProject
    console.log(currentProject)
    const userList: (IUser | undefined)[] =
      (currentProject?.projectUsers ?? []).map((projectUser) => projectUser.user).filter((user) => user?.username) ?? []
    setUsers(uniqBy(userList, 'id') as IUser[])
  }, [selectedProject, projects])

  useEffect(() => {
    userStore.getList({
      where: { isDeleted: { neq: true } }
    })
  }, [selectedUser])

  return (
    <Container fluid className="w-50 mt-4">
      <Row>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Project name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  className="form-control"
                  id="usr"
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className="mt-2" variant="primary" onClick={addProject}>
                Create new project
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-2">
        <Card>
          <Card.Title className="mt-2 d-flex justify-content-sm-between">
            <h5>Project Name</h5>
            <Form.Select
              className="mt-2"
              aria-label="Default select example"
              onChange={(event) => chooseProject(event.target.value)}
            >
              <option>Select Project</option>
              {Array.isArray(projects) &&
                projects.map((project) => {
                  return (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  )
                })}
            </Form.Select>
          </Card.Title>
          <Card.Body>
            {selectedProject && (
              <div className="todo-app">
                <TodoList projectId={selectedProject} />
              </div>
            )}
            <Form>
              <Form.Group>
                <Form.Label>User name:</Form.Label>
                <Form.Select
                  className="mt-2"
                  aria-label="Default select example"
                  onChange={(event) => chooseUser(event.target.value)}
                >
                  <option>Select User</option>
                  {Array.isArray(users) &&
                    users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name ?? user.username}
                        </option>
                      )
                    })}
                </Form.Select>
              </Form.Group>
              <Button className="mt-2" variant="primary" onClick={handleAddUserToProject}>
                Add User
              </Button>
            </Form>

            {Array.isArray(usersInProject) &&
              usersInProject.map((user) => {
                return <div key={user.id}>{user?.name ?? user?.username ?? ''}</div>
              })}
          </Card.Body>
        </Card>
      </Row>
      <ButtonLink name="Go to task" link={routes.todo.value} />
    </Container>
  )
}

export default observer(Project)
