import React, { useState, useEffect } from 'react';
import userService from '../services/userforadmin';
// Không cần import { useNavigate } vì chúng ta sẽ xử lý form/modal tại chỗ

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho form thêm/sửa người dùng
  const [showForm, setShowForm] = useState(false); // Để ẩn/hiện form
  const [currentUser, setCurrentUser] = useState(null); // Người dùng đang được chỉnh sửa (null nếu là thêm mới)
  const [formData, setFormData] = useState({ // Dữ liệu của form
    maNguoiDung: '', // Có thể không cần cho thêm mới, nhưng hữu ích cho sửa
    hoTen: '',
    email: '',
    matKhau: '' // Cần thiết khi tạo mới. Khi sửa có thể không yêu cầu nhập lại nếu không muốn đổi.
  });
  const [formError, setFormError] = useState(null); // Lỗi từ form submit

  // Hàm để lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err);
      console.error('Lỗi khi tải danh sách người dùng:', err);
      // Xử lý lỗi 401 nếu cần, ví dụ chuyển hướng đến trang đăng nhập
      if (err.response && err.response.status === 401) {
        // Có thể navigate('/login') ở đây nếu bạn đã import useNavigate
        // hoặc dispatch một sự kiện để global state biết người dùng cần đăng nhập lại
        setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm xử lý khi bấm nút "Thêm người dùng mới"
  const handleAdd = () => {
    setCurrentUser(null); // Đặt null để biết là đang thêm mới
    setFormData({ // Xóa dữ liệu cũ trong form
      maNguoiDung: '',
      hoTen: '',
      email: '',
      matKhau: ''
    });
    setFormError(null);
    setShowForm(true); // Hiển thị form
  };

  // Hàm xử lý khi bấm nút "Sửa"
  const handleEdit = (user) => {
    setCurrentUser(user); // Đặt người dùng hiện tại để biết đang sửa
    setFormData({ // Điền dữ liệu của người dùng vào form
      maNguoiDung: user.maNguoiDung,
      hoTen: user.hoTen,
      email: user.email,
      matKhau: '' // Không điền mật khẩu cũ vào form vì lý do bảo mật. Người dùng sẽ nhập mật khẩu mới nếu muốn đổi.
    });
    setFormError(null);
    setShowForm(true); // Hiển thị form
  };

  // Hàm xử lý khi nhập liệu vào form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Hàm xử lý khi submit form (Thêm hoặc Sửa)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      if (currentUser) {
        // Sửa người dùng hiện có
        // Lưu ý: backend của bạn có thể yêu cầu gửi cả mật khẩu khi cập nhật hoặc có endpoint riêng để đổi mật khẩu.
        // Hiện tại, chúng ta gửi email và hoTen. Nếu muốn đổi mật khẩu, cần thêm logic.
        await userService.updateUser(formData.maNguoiDung, {
          hoTen: formData.hoTen,
          email: formData.email,
          // matKhau: formData.matKhau // Chỉ gửi nếu người dùng có nhập mật khẩu mới
        });
        alert('Cập nhật người dùng thành công!');
      } else {
        // Tạo người dùng mới
        await userService.createUser({
          hoTen: formData.hoTen,
          email: formData.email,
          matKhau: formData.matKhau // Mật khẩu là bắt buộc khi tạo mới
        });
        alert('Thêm người dùng mới thành công!');
      }

      setShowForm(false); // Đóng form
      fetchUsers(); // Tải lại danh sách người dùng để thấy thay đổi
    } catch (err) {
      console.error('Lỗi khi lưu người dùng:', err);
      setFormError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi lưu người dùng.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.maNguoiDung !== id));
        alert('Xóa người dùng thành công!');
      } catch (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        setFormError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi xóa người dùng.');
        // alert('Có lỗi xảy ra khi xóa người dùng. Vui lòng kiểm tra console.');
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải danh sách người dùng...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
      Lỗi: {error.message}. Vui lòng thử lại sau.
    </div>;
  }

  if (users.length === 0 && !loading && !error) { // Chỉ hiển thị khi không có lỗi và không đang tải
    return <div style={{ textAlign: 'center', padding: '20px' }}>Không có người dùng nào để hiển thị.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý người dùng</h1>
      <button
        onClick={handleAdd} // Gán sự kiện cho nút Thêm
        style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Thêm người dùng mới
      </button>

      {/* Form thêm/sửa người dùng */}
      {showForm && (
        <div style={formContainerStyle}>
          <h2>{currentUser ? 'Sửa Người dùng' : 'Thêm Người dùng mới'}</h2>
          <form onSubmit={handleFormSubmit}>
            {currentUser && ( // Chỉ hiển thị ID khi sửa
              <div style={formGroupStyle}>
                <label>ID:</label>
                <input type="text" name="maNguoiDung" value={formData.maNguoiDung} disabled style={inputStyle} />
              </div>
            )}
            <div style={formGroupStyle}>
              <label>Tên người dùng:</label>
              <input
                type="text"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleFormChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={inputStyle}
              />
            </div>
            {/* Chỉ yêu cầu mật khẩu khi thêm mới hoặc người dùng muốn đổi mật khẩu khi sửa */}
            {!currentUser || (currentUser && formData.matKhau) ? ( // Hoặc bạn có thể thêm checkbox "đổi mật khẩu"
              <div style={formGroupStyle}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  name="matKhau"
                  value={formData.matKhau}
                  onChange={handleFormChange}
                  {...(!currentUser && { required: true })} // Bắt buộc khi thêm mới
                  style={inputStyle}
                />
              </div>
            ) : null}

            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            <div style={buttonGroupStyle}>
              <button type="submit" style={submitButtonStyle}>Lưu</button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelButtonStyle}>Hủy</button>
            </div>
          </form>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Tên người dùng</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.maNguoiDung}>
              <td style={tableCellStyle}>{user.maNguoiDung}</td>
              <td style={tableCellStyle}>{user.hoTen}</td> {/* Đảm bảo sử dụng 'hoTen' thay vì 'HoTen' nếu backend trả về camelCase */}
              <td style={tableCellStyle}>{user.email}</td> {/* Đảm bảo sử dụng 'email' thay vì 'Email' nếu backend trả về camelCase */}
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleEdit(user)} // Truyền toàn bộ đối tượng user cho hàm sửa
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.maNguoiDung)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles cho bảng (giữ nguyên)
const tableHeaderStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tableCellStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

// Styles mới cho form/modal
const formContainerStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  maxWidth: '500px',
  margin: '20px auto',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  marginTop: '5px',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Users;