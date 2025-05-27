import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { CiEdit, CiTrash } from "react-icons/ci";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Lỗi tải dữ liệu');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div className="p-4 bg-[#ffffff] rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
            <table className="min-w-full rounded-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-300">Mã SP</th>
                        <th className="px-4 py-2 border-b border-gray-300">Tên sản phẩm</th>
                        <th className="px-4 py-2 border-b border-gray-300">Mô tả</th>
                        <th className="px-4 py-2 border-b border-gray-300">Giá (VNĐ)</th>
                        <th className="px-4 py-2 border-b border-gray-300">Số lượng tồn</th>
                        <th className="px-4 py-2 border-b border-gray-300">Hình ảnh</th>
                        <th className="px-4 py-2 border-b border-gray-300">Sửa</th>
                        <th className="px-4 py-2 border-b border-gray-300">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.maSanPham} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b border-gray-300">{p.maSanPham}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{p.tenSanPham}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{p.moTa}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{p.gia.toLocaleString()}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{p.soLuongTon}</td>
                            <td className="px-4 py-2 border-b border-gray-300">
                                <img
                                    src={`http://localhost:8080/images/${p.hinhAnh}`}
                                    alt={p.tenSanPham}
                                    className="w-20 h-auto"
                                />
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300"><button><CiEdit size={30} /></button></td>
                            <td className="px-4 py-2 border-b border-gray-300"><button><CiTrash size={30} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
