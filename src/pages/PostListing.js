import React, { useState, useEffect } from 'react';
import PostFormModal from '../components/PostFormModal';
import PostDeleteModal from '../components/PostDeleteModal';
import CommentModal from '../components/CommentModal';
import Table from 'react-bootstrap/Table';
import { TrashFill, PlusLg } from 'react-bootstrap-icons';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleCreatePost = (postData) => {
    const updatedPosts = [...posts, postData];
    updatedPosts.sort((a, b) => a.title.localeCompare(b.title));
    setPosts(updatedPosts);
    setShowFormModal(false);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}posts`);
        const data = await response.json();
        data.sort((a, b) => a.title.localeCompare(b.title));
        setPosts(data);
      } catch (error) {
        console.error('Erro ao obter postagens:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <button className="btn btn-dark m-3" onClick={() => setShowFormModal(true)}>
        <PlusLg color="white" size={25} />
        <span className="p-2"> Nova Postagem</span>
      </button>
      {showFormModal && (
        <PostFormModal onClose={() => setShowFormModal(false)} onSubmit={handleCreatePost} existingPosts={posts} />
      )}
      {showDeleteModal && (
        <PostDeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDeletePost} postId={postIdToDelete} />
      )}
      {showCommentModal && (
        <CommentModal onClose={() => setShowCommentModal(false)} postId={selectedPostId} />
      )}
      <h2 className="text-center p-2">Lista de Postagens</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Conteúdo</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} onClick={() => {
              setSelectedPostId(post.id);
              setShowCommentModal(true);
            }}>
              <th scope="row">{post.id}</th>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td className="text-center">
                <button
                  className="btn btn-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                    setPostIdToDelete(post.id);
                  }}>
                  <TrashFill color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostList;