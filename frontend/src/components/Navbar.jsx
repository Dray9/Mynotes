function Navbar({ user, onLogout }) {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h2 style={styles.logo}>📝 Notes App</h2>
        <div style={styles.userSection}>
          {user && (
            <>
              <span style={styles.username}>Hello, {user.username}!</span>
              <button onClick={onLogout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  username: {
    fontSize: '16px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#007bff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default Navbar;