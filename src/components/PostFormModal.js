import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PostFormModal = ({ onClose, onSubmit,  existingPosts }) => {
  const [formData, setFormData] = useState({ title: '', body: '', userId: 1, });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const isTitleExists = existingPosts.some(post => post.title === formData.title);
      if (isTitleExists) {
        alert('Já existe uma postagem com esse título. Escolha um título diferente.');
        return;
      }
      if (formData.title.trim() === '' || formData.body.trim() === '') {
        alert('Preencha os campos título e conteúdo');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const newPostData = await response.json();
      const newPostId = newPostData.id;

      onSubmit({ ...formData, id: newPostId });      
    } catch (error) {
      console.error('Erro ao cadastrar nova postagem:', error);
    }
  };

  return (      
    <div className="modal show"style={{  width: '100%', height: '100%', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Modal.Dialog style={{ zIndex: 'inherit', width: '50%', minWidth: '300px', maxWidth: '600px' }}>
        <Modal.Header>
          <Modal.Title>
            Nova Postagem
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-1">Título:</p> 
          <input className="mb-3" type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
          <p className="mb-1">Conteúdo:</p>
          <textarea id="body" name="body" value={formData.body} onChange={handleInputChange} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} variant="secondary">Fechar</Button>
          <Button onClick={handleSubmit} variant="primary">Cadastrar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>    
  );
};

export default PostFormModal;
