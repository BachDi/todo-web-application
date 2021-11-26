import { createProject, getProjects } from 'API/project'
import { useState } from 'react'
import TodoList from 'components/TodoList'
import { Button, Container, Row, Col, Form, Card, ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useStores } from 'stores'

const Project = () => {
  const [name, setName] = useState('')
  const [taskName, setTaskName] = useState('')
  const [seletedProject, chooseProject] = useState('')

  const { projectStore, taskStore } = useStores()
  const { projects } = projectStore
  const { tasks } = taskStore
  console.log('projects', seletedProject)
  console.log('tasks', tasks)

  function addProject() {
    console.log({ name })
    createProject({ name })
    setName('')
  }

  useEffect(() => {
    projectStore.getList()
  }, [])

  useEffect(() => {
    taskStore.getList(
      { where: { projectId: seletedProject, isDeleted: { neq: true } },
      include: [{ relation: 'project' }] })
  }, [seletedProject])

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
                  value={taskName}
                  className="form-control"
                  id="usr"
                  onChange={e => setTaskName(e.target.value)}
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
              onChange={event => chooseProject(event.target.value)}
            >
              <option>Select Project</option>
              {Array.isArray(projects) &&
                projects.map((project, index) => {
                  return (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  )
                })}
            </Form.Select>
            <Button variant="danger" className="mt-2">
              Delete
            </Button>
          </Card.Title>
          <Card.Body>
            <div className="todo-app">
              <TodoList projectId={seletedProject} />
            </div>
            {/* <Form>
              <Form.Group>
                <Form.Label>Task name:</Form.Label>
                <Form.Control type="text" value={name} className="form-control" id="usr" onChange={(e) => setName(e.target.value)}></Form.Control>
                {/* <Form.Select className="mt-2" aria-label="Default select example"> */}
            {/*
                  <option>Select Task</option>
                  {Array.isArray(tasks) && tasks.map((task, index) => {
                    return (<option key={task.id} value={task.id}>{task.name}</option>)
                  })} */}
            {/* <option value="1">Task 1</option>
                  <option value="2">Task 2</option>
                  <option value="3">Task 3</option> */}
            {/* </Form.Select> */}
            {/* </Form.Group> */}
            {/* <Button className="mt-2" variant="primary" onClick={addTask()}>Add Task</Button> */}
            {/* </Form> */}
            <Form>
              <Form.Group>
                <Form.Label>User name:</Form.Label>
                <Form.Select className="mt-2" aria-label="Default select example">
                  <option>Select User</option>
                  <option value="1">User 1</option>
                  <option value="2">User 2</option>
                  <option value="3">User 3</option>
                </Form.Select>
              </Form.Group>
              <Button className="mt-2" variant="primary" type="submit">
                Add User
              </Button>
            </Form>

            <ListGroup className="mt-2">
              {Array.from(Array(5), (_, i) => (
                <ListGroup.Item key={i} className="d-flex justify-content-sm-between">
                  <div>
                    <h5>Eat breakfast</h5>
                    <p>Go have some breakfast and coffee</p>
                    <small>John Lemon</small>
                  </div>
                  <div>
                    <Button variant="danger">Delete</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default observer(Project)
