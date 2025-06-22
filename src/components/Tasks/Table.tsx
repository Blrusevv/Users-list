import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Badge, Button, Pagination, Alert } from 'react-bootstrap'
import { CheckCircle, Circle, User } from 'lucide-react'
import { RootState, AppDispatch } from '../../store/store'
import { toggleTaskAsync, setCurrentPage } from '../../store/slices/tasksSlice'

const TasksTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, filters, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.tasks
  )

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'completed' && task.completed) ||
        (filters.status === 'incomplete' && !task.completed)

      const matchesTitle =
        filters.title === '' || task.title.toLowerCase().includes(filters.title.toLowerCase())

      const matchesUser = filters.user === '' || task.userId.toString().includes(filters.user)

      return matchesStatus && matchesTitle && matchesUser
    })
  }, [tasks, filters])

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTasks.slice(startIndex, endIndex)
  }, [filteredTasks, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)

  const handleToggleTask = (task: any) => {
    dispatch(toggleTaskAsync(task))
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  if (filteredTasks.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No Tasks Found</Alert.Heading>
        <p>No tasks match your current filters. Try adjusting your search criteria.</p>
      </Alert>
    )
  }

  return (
    <Card className="tasks-table-card">
      <Card.Header>
        <div className="table-header">
          <h5 className="table-title">Tasks ({filteredTasks.length})</h5>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <div className="table-responsive">
          <table className="table table-hover tasks-table mb-0">
            <thead>
              <tr>
                <th>Status</th>
                <th>User</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <Badge bg={task.completed ? 'success' : 'warning'} className="status-badge">
                      {task.completed ? (
                        <CheckCircle size={14} className="me-1" />
                      ) : (
                        <Circle size={14} className="me-1" />
                      )}
                      {task.completed ? 'Done' : 'Todo'}
                    </Badge>
                  </td>
                  <td>
                    <div className="user-cell">
                      <User size={16} className="me-1" />
                      {task.userId}
                    </div>
                  </td>
                  <td>
                    <div className="task-title">{task.title}</div>
                  </td>
                  <td>
                    <Button
                      variant={task.completed ? 'outline-warning' : 'outline-success'}
                      size="sm"
                      onClick={() => handleToggleTask(task)}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>

      {totalPages > 1 && (
        <Card.Footer className="d-flex justify-content-center">
          <Pagination className="mb-0">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              )
            })}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Card.Footer>
      )}
    </Card>
  )
}

export default TasksTable
