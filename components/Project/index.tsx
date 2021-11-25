import Head from 'next/head'
import Image from 'next/image'
import { Button, Container, Row, Col, Form, Card, ListGroup } from 'react-bootstrap'

const Project = () => {
  return (
    <Container fluid className="w-50 mt-4">
        <Row>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Project name:</Form.Label>
                    <Form.Control type="text" className="form-control" id="usr"></Form.Control>
                  </Form.Group>
                  <Button className="mt-2" variant="primary" type="submit">Create new project</Button>
                </Form>
              </Card.Body>
            </Card>
        </Row>
        <Row className="mt-2">
          <Card>
            <Card.Title className="mt-2 d-flex justify-content-sm-between">
              <h5>Project Name</h5>
              <Button variant="danger" className="mt-2">
                Delete
              </Button>
            </Card.Title>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Task name:</Form.Label>
                  <Form.Control type="text" className="form-control" id="usr"></Form.Control>

                  <Form.Select className="mt-2" aria-label="Default select example">
                    <option>Select User</option>
                    <option value="1">User 1</option>
                    <option value="2">User 2</option>
                    <option value="3">User 3</option>
                  </Form.Select>

                  <Form.Check className="mt-2"
                    inline
                    label="Low"
                    name="group1"
                    type="radio"
                  />
                  <Form.Check
                    inline
                    label="Medium"
                    name="group1"
                    type="radio"
                  />
                  <Form.Check
                    inline
                    label="High"
                    name="group1"
                    type="radio"
                  />

                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">Create task</Button>
              </Form>


              <ListGroup className="mt-2">

              {Array.from(Array(5), (_, i) => <ListGroup.Item key={i} className="d-flex justify-content-sm-between">
                  <div>
                    <h5>Eat breakfast</h5>
                    <p>Go have some breakfast and coffee</p>
                    <small>John Lemon</small>
                  </div>
                  <div>
                    <Button variant="danger">
                        Delete
                    </Button>
                  </div>
                </ListGroup.Item>)}
              </ListGroup>

              </Card.Body>
          </Card>
        </Row>

    </Container>
  )
}

export default Project
