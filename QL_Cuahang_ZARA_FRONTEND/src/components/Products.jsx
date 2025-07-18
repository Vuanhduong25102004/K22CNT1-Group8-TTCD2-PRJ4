import React, { useEffect, useState, useCallback } from 'react';
import productService from '../services/productService'; // Đảm bảo đường dẫn này đúng
import axios from 'axios'; // Cần axios cho các request POST/PUT

// Import các icon từ react-icons
import { CiEdit, CiTrash, CiCirclePlus } from "react-icons/ci"; // Thêm CiCirclePlus cho nút thêm mới

// Giá trị khởi tạo cho sản phẩm mới/đang chỉnh sửa
const initialProductState = {
    maSanPham: null,
    tenSanPham: '',
    moTa: '',
    gia: 0,
    soLuongTon: 0,
    hinhAnh: '', // Tên file ảnh (string)
    maDanhMuc: '' // Chỉ cần mã danh mục để gửi lên backend
};

export default function ProductManagementPage() {
    console.log('ProductManagementPage re-rendered'); // LOG: Theo dõi mỗi khi component render

    // --- State quản lý dữ liệu và trạng thái UI ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Lưu trữ đối tượng File đã chọn
    const [showForm, setShowForm] = useState(false); // NEW: State để kiểm soát hiển thị form

    // --- Hàm tải danh sách sản phẩm (sử dụng useCallback để tránh re-render không cần thiết) ---
    const fetchProducts = useCallback(async () => {
        console.log('fetchProducts called'); // LOG: Theo dõi mỗi khi hàm fetchProducts được gọi
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAllProducts();
            console.log('Data fetched from API:', data); // LOG: Kiểm tra dữ liệu trả về từ API

            // So sánh dữ liệu cũ và mới để tránh re-render không cần thiết
            // Mặc dù setProducts sẽ tự kiểm tra, nhưng logging giúp debug sự thay đổi
            if (JSON.stringify(products) !== JSON.stringify(data)) {
                console.log('Products state is updated.'); // LOG: Chỉ khi dữ liệu thực sự khác
                setProducts(data);
            } else {
                console.log('Products data is the same, no state update.'); // LOG: Nếu dữ liệu không đổi
            }

        } catch (err) {
            setError(err.message || 'Lỗi tải dữ liệu sản phẩm.');
            console.error('Error fetching product list:', err); // LOG lỗi chi tiết
        } finally {
            setLoading(false);
        }
    }, [products]); // Thêm `products` vào dependency để so sánh state cũ và mới.

    // --- useEffect để tải sản phẩm khi component được render lần đầu ---
    // Hoặc khi `fetchProducts` thay đổi (nhưng với useCallback rỗng thì nó chỉ tạo 1 lần)
    useEffect(() => {
        console.log('useEffect (fetchProducts) ran'); // LOG: Theo dõi useEffect chạy
        fetchProducts();
    }, [fetchProducts]); // Thêm fetchProducts vào dependency array của useEffect

    // --- Xử lý thay đổi input trong form ---
    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []); // useCallback vì hàm này không phụ thuộc vào props/state ngoài

    // --- Xử lý chọn file ảnh ---
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        // Cập nhật tên file (tạm thời) vào currentProduct để hiển thị preview
        // Nếu không có file nào được chọn, đặt hinhAnh về rỗng
        setCurrentProduct(prev => ({ ...prev, hinhAnh: file ? file.name : '' }));
    }, []);

    // --- Hàm reset form về trạng thái ban đầu ---
    const resetForm = useCallback(() => {
        setCurrentProduct(initialProductState);
        setIsEditing(false);
        setSelectedFile(null);
        setShowForm(false); // NEW: Ẩn form khi reset
    }, []);

    // NEW: Hàm để hiển thị form thêm sản phẩm
    const handleAddProductClick = useCallback(() => {
        resetForm(); // Đảm bảo form sạch sẽ và ở chế độ thêm mới
        setShowForm(true); // Hiển thị form
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    }, [resetForm]);


    // --- Xử lý gửi form (Thêm mới hoặc Cập nhật) ---
    const handleFormSubmit = useCallback(async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn cần đăng nhập để thực hiện thao tác này.');
            return;
        }

        const formData = new FormData();
        let productDataForJson = { ...currentProduct };

        // Xóa maSanPham nếu là thêm mới để backend tự sinh
        if (!isEditing) {
            delete productDataForJson.maSanPham;
        }

        // Nếu có file mới được chọn, không gửi hinhAnh trong JSON
        // Backend sẽ tự cập nhật hinhAnh dựa trên file được upload
        if (selectedFile) {
            delete productDataForJson.hinhAnh;
        } else if (isEditing && currentProduct.hinhAnh === '') {
            // Trường hợp đang sửa, không có file mới, và hinhAnh trong state là rỗng
            // Điều này báo hiệu người dùng muốn xóa ảnh hiện tại
            // Backend sẽ nhận hinhAnh là rỗng và xử lý xóa file vật lý (nếu có logic đó)
            console.log("Updating product: No new file, current image set to empty string (user wants to remove existing image).");
        }


        // Thêm dữ liệu sản phẩm dưới dạng JSON Blob
        formData.append('sanPham', new Blob([JSON.stringify(productDataForJson)], { type: 'application/json' }));

        // Thêm file ảnh nếu có
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const apiUrl = isEditing ?
                `http://localhost:8080/products/${currentProduct.maSanPham}` :
                'http://localhost:8080/products';
            const method = isEditing ? axios.put : axios.post;

            await method(apiUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Quan trọng cho FormData
                }
            });

            alert(`${isEditing ? 'Cập nhật' : 'Thêm'} sản phẩm thành công!`);
            resetForm(); // Reset form sau khi thành công (và ẩn form)
            fetchProducts(); // Tải lại danh sách sản phẩm để cập nhật UI
        } catch (err) {
            console.error(`Lỗi khi ${isEditing ? 'cập nhật' : 'thêm'} sản phẩm:`, err.response || err.message);
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    alert(`Lỗi: Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.`);
                } else if (err.response.status === 404) {
                    alert(`Lỗi 404: Không tìm thấy API. Vui lòng kiểm tra lại URL API trong code. Có thể backend chưa được chạy hoặc endpoint không đúng.`);
                } else if (err.response.data && err.response.data.message) {
                    alert(`Đã xảy ra lỗi khi ${isEditing ? 'cập nhật' : 'thêm'} sản phẩm: ${err.response.data.message}`);
                } else {
                    alert(`Đã xảy ra lỗi khi ${isEditing ? 'cập nhật' : 'thêm'} sản phẩm: ${err.message}`);
                }
            } else {
                alert(`Đã xảy ra lỗi khi ${isEditing ? 'cập nhật' : 'thêm'} sản phẩm: ${err.message || 'Lỗi không xác định'}`);
            }
        }
    }, [isEditing, currentProduct, selectedFile, fetchProducts, resetForm]); // Thêm các dependencies

    // --- Xử lý click nút Sửa ---
    const handleEditClick = useCallback((product) => {
        setCurrentProduct({
            ...product,
            // Đảm bảo maDanhMuc được gán đúng nếu nó là một nested object
            maDanhMuc: product.danhMuc ? product.danhMuc.maDanhMuc : ''
        });
        setSelectedFile(null); // Reset file đã chọn khi bắt đầu chỉnh sửa
        setIsEditing(true);
        setShowForm(true); // NEW: Hiển thị form khi chỉnh sửa
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    }, []);

    // --- Xử lý click nút Xóa ---
    const handleDeleteClick = useCallback(async (productId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Bạn cần đăng nhập để thực hiện thao tác này.');
                return;
            }
            await productService.deleteProduct(productId, token);
            alert('Xóa sản phẩm thành công!');
            fetchProducts(); // Tải lại danh sách sau khi xóa
        } catch (err) {
            console.error('Lỗi khi xóa sản phẩm:', err);
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                alert(`Lỗi: Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.`);
            } else if (err.response && err.response.data && err.response.data.message) {
                alert(`Không thể xóa sản phẩm: ${err.response.data.message}`);
            }
            else {
                alert(`Không thể xóa sản phẩm: ${err.message || 'Lỗi không xác định'}`);
            }
        }
    }, [fetchProducts]);

    // --- Hiển thị trạng thái tải hoặc lỗi ---
    if (loading) return <p className="p-4 text-center text-gray-700">Đang tải sản phẩm...</p>;
    if (error) return <p className="p-4 text-red-600 text-center font-medium">Lỗi: {error}</p>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full mx-auto my-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b-2 pb-4">Quản lý Sản phẩm</h2>

            {/* NEW: Nút để thêm sản phẩm mới (chỉ hiện khi form đang ẩn) */}
            {!showForm && (
                <div className="text-center mb-8">
                    <button
                        onClick={handleAddProductClick}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                        <CiCirclePlus className="mr-2 -ml-1" size={20} />
                        Thêm Sản phẩm Mới
                    </button>
                </div>
            )}

            {/* --- Form Thêm/Sửa Sản phẩm (hiển thị có điều kiện) --- */}
            {showForm && ( // NEW: Chỉ render form khi showForm là true
                <div className="mb-10 p-7 bg-blue-50 rounded-xl shadow-inner">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
                        {isEditing ? 'Cập nhật Sản phẩm Hiện có' : 'Thêm Sản phẩm Mới'}
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="tenSanPham" className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm:</label>
                            <input
                                type="text"
                                id="tenSanPham"
                                name="tenSanPham"
                                value={currentProduct.tenSanPham}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                placeholder="Nhập tên sản phẩm"
                            />
                        </div>
                        <div>
                            <label htmlFor="moTa" className="block text-sm font-medium text-gray-700 mb-1">Mô tả:</label>
                            <textarea
                                id="moTa"
                                name="moTa"
                                value={currentProduct.moTa}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                rows="4"
                                placeholder="Nhập mô tả sản phẩm"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="gia" className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ):</label>
                                <input
                                    type="number"
                                    id="gia"
                                    name="gia"
                                    value={currentProduct.gia}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label htmlFor="soLuongTon" className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn:</label>
                                <input
                                    type="number"
                                    id="soLuongTon"
                                    name="soLuongTon"
                                    value={currentProduct.soLuongTon}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="maDanhMuc" className="block text-sm font-medium text-gray-700 mb-1">Mã danh mục:</label>
                            <input
                                type="text"
                                id="maDanhMuc"
                                name="maDanhMuc"
                                value={currentProduct.maDanhMuc}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                placeholder="Nhập mã danh mục"
                            />
                        </div>
                        <div>
                            <label htmlFor="hinhAnhFile" className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh:</label>
                            <input
                                type="file"
                                id="hinhAnhFile"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-colors duration-200 cursor-pointer"
                            />
                            {/* Hiển thị thông tin ảnh và preview */}
                            {(selectedFile || currentProduct.hinhAnh) ? (
                                <div className="mt-2 flex items-center space-x-3">
                                    <p className="text-xs text-gray-500">
                                        {selectedFile ? `Đã chọn: ${selectedFile.name}` : `Ảnh hiện tại: ${currentProduct.hinhAnh}`}
                                    </p>
                                    {isEditing && !selectedFile && currentProduct.hinhAnh && ( // Chỉ hiển thị khi đang sửa, chưa chọn file mới và có ảnh cũ
                                        <span
                                            className="text-red-500 hover:text-red-700 cursor-pointer text-xs underline"
                                            onClick={() => {
                                                setCurrentProduct(prev => ({ ...prev, hinhAnh: '' })); // Xóa tên ảnh trong state
                                                setSelectedFile(null); // Đảm bảo không có file nào được chọn
                                            }}
                                        >
                                            (Xóa ảnh hiện tại)
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 mt-2">Chưa có ảnh được chọn.</p>
                            )}
                            {/* Preview ảnh */}
                            {(selectedFile || (currentProduct.hinhAnh && typeof currentProduct.hinhAnh === 'string')) && (
                                <img
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : `http://localhost:8080/images/${currentProduct.hinhAnh}`}
                                    alt="Xem trước ảnh"
                                    className="mt-3 w-32 h-32 object-cover rounded-md border border-gray-200 shadow-sm"
                                />
                            )}
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm'}
                            </button>
                            {/* Nút hủy luôn hiển thị khi form đang mở */}
                            <button
                                type="button"
                                onClick={resetForm} // resetForm sẽ ẩn form
                                className="inline-flex items-center px-6 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* --- Bảng hiển thị danh sách sản phẩm --- */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Danh sách Sản phẩm hiện có</h3>
            {products.length === 0 && !loading ? ( // Chỉ hiển thị khi không có sản phẩm và đã tải xong
                <p className="text-center text-gray-600 italic py-10 border border-dashed rounded-lg bg-gray-50">
                    Không có sản phẩm nào để hiển thị.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mã SP</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mô tả</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Giá (VNĐ)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tồn kho</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hình ảnh</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Danh mục</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider" colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(p => (
                                <tr key={p.maSanPham} className="hover:bg-blue-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.maSanPham}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.tenSanPham}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                        {p.moTa?.length > 70 ? p.moTa.substring(0, 67) + '...' : p.moTa}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.gia?.toLocaleString('vi-VN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.soLuongTon}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {(p.hinhAnh && typeof p.hinhAnh === 'string' && p.hinhAnh !== '') ? (
                                            <img
                                                src={`http://localhost:8080/images/${p.hinhAnh}`}
                                                alt={p.tenSanPham}
                                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/no-image-placeholder.png";
                                                    console.warn(`Lỗi tải ảnh sản phẩm: ${p.hinhAnh}. Hiển thị ảnh placeholder.`);
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src="/no-image-placeholder.png"
                                                alt="Không có ảnh"
                                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    console.error("Không thể tải ảnh placeholder. Vui lòng kiểm tra lại đường dẫn /public/no-image-placeholder.png.");
                                                    e.target.style.display = 'none';
                                                    const parentTd = e.target.closest('td');
                                                    if (parentTd) {
                                                        parentTd.innerHTML = '<span class="text-red-500 text-xs">Lỗi ảnh</span>';
                                                    }
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {p.danhMuc ? p.danhMuc.tenDanhMuc : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(p)}
                                            className="text-blue-600 hover:text-blue-900 mr-3 p-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                                            title="Sửa sản phẩm"
                                        >
                                            <CiEdit size={24} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteClick(p.maSanPham)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                            title="Xóa sản phẩm"
                                        >
                                            <CiTrash size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}