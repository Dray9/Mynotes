import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, createNote, updateNote, deleteNote, logout, getCurrentUser } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getAllNotes();
      console.log('Notes fetched:', response);
      setNotes(response || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    try {
      await createNote(formData.title, formData.content);
      setShowForm(false);
      setFormData({ title: '', content: '' });
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    }
  };

  const handleUpdateNote = async () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    try {
      await updateNote(editingNote.id, formData.title, formData.content);
      setShowForm(false);
      setEditingNote(null);
      setFormData({ title: '', content: '' });
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content || '' });
    setShowForm(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '' });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
    setFormData({ title: '', content: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#E9F5DB' }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#718355',
        color: 'white',
        padding: '15px 30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold' }}>📝 MyNotes</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '16px' }}>Hello, {user.username}!</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                backgroundColor: '#E9F5DB',
                color: '#718355',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ width: '100%', padding: '30px', boxSizing: 'border-box' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#718355' }}>Notes</h1>
          <button
            onClick={handleNewNote}
            style={{
              padding: '14px 28px',
              backgroundColor: '#87986A',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            + New Note
          </button>
        </div>

        {/* Note Form Modal */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              backgroundColor: '#E9F5DB',
              padding: '35px',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}>
              <h2 style={{ marginBottom: '25px', color: '#718355', fontSize: '24px' }}>
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#718355' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #B5C99A',
                    borderRadius: '6px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    color: '#718355',
                  }}
                  placeholder="Enter note title"
                  autoFocus
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#718355' }}>
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #B5C99A',
                    borderRadius: '6px',
                    fontSize: '16px',
                    minHeight: '200px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    color: '#718355',
                  }}
                  placeholder="Enter note content"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={editingNote ? handleUpdateNote : handleCreateNote}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#87986A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  {editingNote ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={handleCloseForm}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#97A97C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#718355', fontSize: '18px' }}>Loading notes...</p>
        ) : notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '50px',
            backgroundColor: '#CFE1B9',
            borderRadius: '12px',
            color: '#718355',
          }}>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {notes.map((note) => (
              <div
                key={note.id}
                style={{
                  backgroundColor: '#CFE1B9',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  border: '2px solid #B5C99A',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: '#718355' }}>
                  {note.title}
                </h3>
                <p style={{ color: '#87986A', marginBottom: '16px', lineHeight: '1.6', fontSize: '15px' }}>
                  {note.content && note.content.length > 150
                    ? note.content.substring(0, 150) + '...'
                    : note.content || 'No content'}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '2px solid #B5C99A',
                }}>
                  <span style={{ fontSize: '13px', color: '#97A97C', fontWeight: '500' }}>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEditClick(note)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#87986A',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#718355',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;