function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{note.title}</h3>
      <p style={styles.content}>
        {note.content.length > 150
          ? note.content.substring(0, 150) + '...'
          : note.content}
      </p>
      <div style={styles.footer}>
        <span style={styles.date}>{formatDate(note.created_at)}</span>
        <div style={styles.buttons}>
          <button
            onClick={() => onEdit(note)}
            style={{ ...styles.button, ...styles.editButton }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            style={{ ...styles.button, ...styles.deleteButton }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  content: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #eee',
  },
  date: {
    fontSize: '12px',
    color: '#999',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
};

export default NoteCard;