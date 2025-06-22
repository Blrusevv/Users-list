import React, { useState } from 'react'
import { Card, Button, Alert, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Edit3, Trash2, FileText } from 'lucide-react'
import { Post } from '../../types/post'
import { deletePostAsync, updatePostAsync } from '../../store/slices/postsSlice'
import { useAppDispatch } from '../../hooks'
import { postsSchema } from '../../utils/validations'
import { PostFormData, PostsListProps } from './inetrfaces'

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: yupResolver(postsSchema),
  })

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    reset({ title: post.title, body: post.body })
  }

  const handleSavePost = async (data: PostFormData) => {
    if (editingPost) {
      const updatedPost = { ...editingPost, ...data }
      await dispatch(updatePostAsync(updatedPost))
      setEditingPost(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    reset()
  }

  const handleDeletePost = (post: Post) => {
    setPostToDelete(post)
    setShowDeleteModal(true)
  }

  const confirmDeletePost = async () => {
    if (postToDelete) {
      await dispatch(deletePostAsync(postToDelete.id))
      setShowDeleteModal(false)
      setPostToDelete(null)
    }
  }

  const cancelDeletePost = () => {
    setShowDeleteModal(false)
    setPostToDelete(null)
  }

  if (posts.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No Posts Found</Alert.Heading>
        <p>This user hasn't created any posts yet.</p>
      </Alert>
    )
  }

  return (
    <>
      <div className="posts-section">
        <div className="section-header">
          <h3 className="section-title">
            <FileText size={24} className="me-2" />
            User Posts ({posts.length})
          </h3>
        </div>

        <div className="posts-list">
          {posts.map((post) => (
            <Card key={post.id} className="post-card">
              <Card.Body>
                {editingPost?.id === post.id ? (
                  <Form onSubmit={handleSubmit(handleSavePost)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" {...register('title')} isInvalid={!!errors.title} />
                      <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Body</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        {...register('body')}
                        isInvalid={!!errors.body}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.body?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="secondary" onClick={handleCancelEdit} size="sm">
                        Cancel
                      </Button>
                      <Button variant="success" type="submit" size="sm">
                        Save
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <div className="post-header">
                      <h5 className="post-title">{post.title}</h5>
                      <div className="post-actions">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit3 size={14} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeletePost(post)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="post-body">{post.body}</p>
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={cancelDeletePost}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be undone.
          {postToDelete && (
            <div className="mt-3 p-3 bg-light rounded">
              <strong>{postToDelete.title}</strong>
              <p className="mb-0 mt-1 text-muted">{postToDelete.body.substring(0, 100)}...</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeletePost}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeletePost}>
            Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PostsList
