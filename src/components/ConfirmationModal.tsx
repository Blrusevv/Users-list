import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Post } from '../types/post'

interface ConfirmationModalProps {
  show: boolean
  onCancel: () => void
  onConfirm: () => void
  post?: Post | null
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onCancel,
  onConfirm,
  post,
}) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this post? This action cannot be undone.
        {post && (
          <div className="mt-3 p-3 bg-light rounded">
            <strong>{post.title}</strong>
            <p className="mb-0 mt-1 text-muted">{post.body.substring(0, 100)}...</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Post
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
