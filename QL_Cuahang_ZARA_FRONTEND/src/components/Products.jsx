import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';

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
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Mã SP</th>
                        <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
                        <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                        <th className="border border-gray-300 px-4 py-2">Giá (VNĐ)</th>
                        <th className="border border-gray-300 px-4 py-2">Số lượng tồn</th>
                        <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.maSanPham} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{p.maSanPham}</td>
                            <td className="border border-gray-300 px-4 py-2">{p.tenSanPham}</td>
                            <td className="border border-gray-300 px-4 py-2">{p.moTa}</td>
                            <td className="border border-gray-300 px-4 py-2">{p.gia.toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{p.soLuongTon}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img
                                    src={`http://localhost:8080/images/${p.hinhAnh}`}
                                    alt={p.tenSanPham}
                                    className="w-20 h-auto"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
