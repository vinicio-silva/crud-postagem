import React from 'react';
import { Modal, Button } from 'react-bootstrap';



const PostDeleteModal = ({ onClose, onConfirm, postId }) => {

    const handleDelete = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}posts/${postId}`, {
                method: 'DELETE',
            });

            onConfirm(postId);
        } catch (error) {
            console.error('Erro ao excluir postagem:', error);
        }
    };

    return (
        <div className="modal show"style={{  width: '100%', height: '100%', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Modal.Dialog style={{ zIndex: 'inherit', width: '50%', minWidth: '300px', maxWidth: '600px' }}>
            <Modal.Header closeButton>
                <Modal.Title>Excluir Postagem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Atenção! Ao excluir esta postagem os comentários também serão excluídos.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                Excluir
                </Button>
            </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default PostDeleteModal;