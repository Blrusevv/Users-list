import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Row, Col } from 'react-bootstrap'
import { Filter } from 'lucide-react'
import { RootState, AppDispatch } from '../../store/store'
import { setFilter } from '../../store/slices/tasksSlice'

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filters } = useSelector((state: RootState) => state.tasks)

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    dispatch(setFilter({ key, value }))
  }

  return (
    <Card className="task-filters-card">
      <Card.Header>
        <h5 className="filter-title">
          <Filter size={20} className="me-2" />
          Filters
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Search Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title..."
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID..."
                value={filters.user}
                onChange={(e) => handleFilterChange('user', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default TaskFilters
