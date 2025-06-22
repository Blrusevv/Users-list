import React, { useEffect } from 'react'
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchTasksAsync } from '../store/slices/tasksSlice'
import TasksTable from '../components/Tasks/Table'
import TaskFilters from '../components/Tasks/Filters'

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector((state) => state.tasks)

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasksAsync())
    }
  }, [dispatch, tasks.length])

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading tasks...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="tasks-page">
      <Row>
        <Col>
          <div className="page-header">
            <h1 className="page-title">Task Management</h1>
          </div>

          <TaskFilters />
          <TasksTable />
        </Col>
      </Row>
    </Container>
  )
}

export default TasksPage
