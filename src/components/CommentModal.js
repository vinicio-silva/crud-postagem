import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const CommentModal = ({ onClose, postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', body: '', email: '' });

  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [postId, loadComments]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId,
          name: newComment.name,
          body: newComment.body,
          email: newComment.email
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        const updateComments = [...comments, newCommentData];
        setComments(updateComments);
        setNewComment({ name: '', body: '', email: '' });
      } else {
        console.error('Erro ao adicionar comentário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  return (
    <div className="modal show" style={{ width: '100%', height: '100%', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Modal.Dialog style={{ zIndex: 'inherit', width: '50%', minWidth: '300px', maxWidth: '1000px' }}>
        <Modal.Header>
          <Modal.Title>Comentários</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Título</th>
                  <th scope="col">Comentário</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <th>{comment.id}</th>
                    <td>{comment.name}</td>
                    <td>{comment.body}</td>
                    <td>{comment.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="name">Título do Comentário:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={newComment.name}
              onChange={handleInputChange}
            />
            <label htmlFor="body">Conteúdo do Comentário:</label>
            <textarea
              value={newComment.body}
              id="body"
              name="body"
              className="form-control"
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              value={newComment.email}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddComment}>
            Comentar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CommentModal;