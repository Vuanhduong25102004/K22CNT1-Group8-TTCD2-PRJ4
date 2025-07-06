-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ql_cuahangzara
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `MaChiTiet` int NOT NULL AUTO_INCREMENT,
  `MaDonHang` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `DonGia` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`MaChiTiet`),
  KEY `MaDonHang` (`MaDonHang`),
  KEY `MaSanPham` (`MaSanPham`),
  CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`MaDonHang`) REFERENCES `donhang` (`MaDonHang`),
  CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietgiohang`
--

DROP TABLE IF EXISTS `chitietgiohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietgiohang` (
  `MaChiTietGioHang` int NOT NULL AUTO_INCREMENT,
  `MaGioHang` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  PRIMARY KEY (`MaChiTietGioHang`),
  KEY `MaGioHang` (`MaGioHang`),
  KEY `MaSanPham` (`MaSanPham`),
  CONSTRAINT `chitietgiohang_ibfk_1` FOREIGN KEY (`MaGioHang`) REFERENCES `giohang` (`MaGioHang`),
  CONSTRAINT `chitietgiohang_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietgiohang`
--

LOCK TABLES `chitietgiohang` WRITE;
/*!40000 ALTER TABLE `chitietgiohang` DISABLE KEYS */;
INSERT INTO `chitietgiohang` VALUES (1,1,102,1),(2,1,101,5),(3,1,105,1),(4,2,101,7),(5,2,102,2),(6,2,104,1),(7,2,105,3);
/*!40000 ALTER TABLE `chitietgiohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmuc` (
  `MaDanhMuc` varchar(50) NOT NULL,
  `TenDanhMuc` varchar(100) NOT NULL,
  PRIMARY KEY (`MaDanhMuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuc`
--

LOCK TABLES `danhmuc` WRITE;
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` VALUES ('DMNAM','Danh mục nam'),('DMNU','Danh mục nữ'),('DMTREEM','Danh mục trẻ em');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MaDonHang` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int DEFAULT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `MaPhuongThuc` int DEFAULT NULL,
  `TrangThaiThanhToan` enum('Chưa thanh toán','Đã thanh toán') NOT NULL DEFAULT 'Chưa thanh toán',
  `TrangThaiDonHang` enum('Chờ xác nhận','Đang giao','Đã giao') NOT NULL DEFAULT 'Chờ xác nhận',
  `NgayDat` date DEFAULT NULL,
  PRIMARY KEY (`MaDonHang`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  KEY `MaPhuongThuc` (`MaPhuongThuc`),
  CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`),
  CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`MaPhuongThuc`) REFERENCES `phuongthucthanhtoan` (`MaPhuongThuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `MaGioHang` int NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` int DEFAULT NULL,
  `NgayTao` date NOT NULL,
  `NgayCapNhat` date DEFAULT NULL,
  PRIMARY KEY (`MaGioHang`),
  KEY `MaNguoiDung` (`MaNguoiDung`),
  CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES (1,1,'2025-06-14','2025-06-14'),(2,2,'2025-06-28','2025-06-28');
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `MaNguoiDung` int NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `Role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `NgayTao` date NOT NULL,
  PRIMARY KEY (`MaNguoiDung`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'Vũ Dương','vuduong@gmail.com','$2a$10$DgpzuFFBrYEYIy2Dgp1ok.oWm6tijFPWL4QamNwCO8gt.adnVijdG','ADMIN','2025-06-06'),(2,'Vũ Dương','vuanhduong251020042@gmail.com','$2a$10$1.2KTvXodSz1bp582fki/.V5wEJosJHz72J1lvCrL.GB4kcjE9is6','USER','2025-06-28'),(3,'duong1','duong1@gmail.com','$2a$10$2rFFkOd13TazPe6aPSFyMOstv93e8bFvu8WVPiPB9D6QFPMktnpb2','USER','2025-07-04'),(4,'duong','duong@gmail.com','$2a$10$354WE.TWMVZ3xibalZ.JYeetcJF3mjgMO/pziyDSiG5SOiRjNxVWO','USER','2025-07-04');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuongthucthanhtoan`
--

DROP TABLE IF EXISTS `phuongthucthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuongthucthanhtoan` (
  `MaPhuongThuc` int NOT NULL AUTO_INCREMENT,
  `TenPhuongThuc` varchar(50) NOT NULL,
  PRIMARY KEY (`MaPhuongThuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuongthucthanhtoan`
--

LOCK TABLES `phuongthucthanhtoan` WRITE;
/*!40000 ALTER TABLE `phuongthucthanhtoan` DISABLE KEYS */;
/*!40000 ALTER TABLE `phuongthucthanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MaSanPham` int NOT NULL AUTO_INCREMENT,
  `TenSanPham` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `MoTa` text,
  `Gia` decimal(10,2) DEFAULT NULL,
  `SoLuongTon` int DEFAULT NULL,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `MaDanhMuc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaSanPham`),
  KEY `MaDanhMuc` (`MaDanhMuc`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaDanhMuc`) REFERENCES `danhmuc` (`MaDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (101,'ÁO PHÔNG HEAVY WEIGHT KIỂU CƠ BẢN','Áo phông dáng relaxed fit, chất liệu vải cotton compact. Cổ tròn, cộc tay.',649000.00,100,'aonam1.jpg','DMNAM'),(102,'ÁO PHÔNG KIỂU CƠ BẢN MEDIUM WEIGHT','Áo phông dáng regular fit. Cổ tròn, cộc tay.',549000.00,100,'aonam2.jpg','DMNAM'),(103,'ÁO PHÔNG CỔ CHỮ V KIỂU CƠ BẢN','Áo phông vải cotton co giãn, dáng slim fit. Cổ chữ V, cộc tay.',429000.00,100,'aonam3.jpg','DMNAM'),(104,'ÁO PHÔNG VẢI GÂN DÁNG CƠ BẢN PHỐI MÀU','Áo phông dáng regular fit. Cổ tròn, cộc tay. Có viền khác màu.',649000.00,100,'aonam4.jpg','DMNAM'),(105,'ÁO NỈ IN HỌA TIẾT','Áo nỉ dáng relaxed fit, chất liệu vải cotton, bên trong lót vải lông xoăn. Cổ tròn, dài tay. In họa tiết khác màu phía trước và sau lưng. Kiểu bạc màu. Bo viền bằng vải gân không đều và khác màu. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.',1299000.00,100,'aonam5.jpg','DMNAM'),(106,'ÁO PHÔNG HỌA TIẾT BẠC MÀU','Áo phông dáng relaxed fit. Cổ tròn, cộc tay. In họa tiết khác màu phía trước và sau lưng. Kiểu bạc màu. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.',799000.00,100,'aonam6.jpg','DMNAM'),(107,'ÁO TANK TOP VẢI BẠC MÀU IN HỌA TIẾT','Áo tank top relaxed fit dáng crop. Cổ tròn, tay sát nách. Kiểu bạc màu. In họa tiết khác màu ở phía trước và sau lưng. Viền cắt lệch. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.',799000.00,100,'aonam7.jpg','DMNAM'),(108,'ÁO PHÔNG BO VIỀN VẢI GÂN NỔI KHÁC MÀU','Áo phông dáng regular fit. Cổ tròn, cộc tay. Phía trước in chữ nổi khác màu. Có viền khác màu.',799000.00,100,'aonam8.jpg','DMNAM'),(109,'ÁO PHÔNG BÓNG ĐÁ VẢI KỸ THUẬT PHONG CÁCH RETRO','Áo phông dáng boxy fit, chất liệu vải kỹ thuật. Cổ tròn, cộc tay. In họa tiết chữ khác màu phía trước.',999000.00,100,'aonam9.jpg','DMNAM'),(110,'ÁO PHÔNG VẢI JACQUARD HỌA TIẾT KẺ NGANG','Áo phông dáng relaxed fit. Cổ tròn, cộc tay.',799000.00,100,'aonam10.jpg','DMNAM'),(111,'ÁO PHÔNG I LOVE NEW YORK','Áo phông dáng relaxed fit. Cổ tròn, cộc tay. In họa tiết I love New York ® NYSDED phía trước và sau lưng. Kiểu bạc màu.',999000.00,100,'aonam11.jpg','DMNAM'),(112,'ÁO PHÔNG VẢI GÂN DỆT KIM KẺ NGANG','Áo phông vải compact dệt kim pha sợi cotton, dáng relaxed fit. Cổ tròn, cài khuy phía trước. Cộc tay.',1299000.00,100,'aonam12.jpg','DMNAM'),(113,'ÁO SƠ MI IN HỌA TIẾT','Áo sơ mi vải pha sợi viscose, dáng relaxed fit. Cổ ve lật, cộc tay. Gấu xẻ hai bên. Cài phía trước bằng hàng khuy cài.',1799000.00,100,'aonam13.jpg','DMNAM'),(114,'ÁO PHÔNG KẺ NGANG VIỀN KHÁC MÀU','Áo phông dáng regular fit. Cổ tròn, cộc tay. Có viền khác màu.',799000.00,100,'aonam14.jpg','DMNAM'),(115,'ÁO SƠ MI VẢI COTTON - VISCOSE KẺ CA RÔ','Áo sơ mi vải pha sợi cotton và sợi viscose, dáng relaxed fit. Cổ ve lật trải rộng, dài tay, cổ tay bo và cài khuy. Gấu xẻ hai bên. Cài khuy phía trước.',1799000.00,100,'aonam15.jpg','DMNAM'),(116,'ÁO SƠ MI VẢI DỆT HỌA TIẾT KẺ CA RÔ','Áo sơ mi vải dệt hoa văn không đều, dáng relaxed fit. Cổ ve lật, dài tay, cổ tay bo và cài khuy. Cài phía trước bằng hàng khuy cài.',1599000.00,100,'aonam16.jpg','DMNAM'),(117,'ÁO PHÔNG HỌA TIẾT BẠC MÀU','Áo phông dáng relaxed fit. Cổ tròn, cộc tay. In họa tiết hiệu ứng bạc màu và khác màu ở phía trước.',799000.00,100,'aonam17.jpg','DMNAM'),(118,'ÁO PHÔNG KIỂU BẠC MÀU IN HỌA TIẾT','Áo phông dáng relaxed fit. Cổ tròn, cộc tay. Phía trước in họa tiết khác màu. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.',799000.00,100,'aonam18.jpg','DMNAM'),(119,'ÁO PHÔNG VẢI BẠC MÀU THÊU HỌA TIẾT','Áo phông dáng relaxed fit. Cổ tròn, cộc tay. In, thêu và có các miếng đáp khác màu phía trước. Kiểu bạc màu. Sản phẩm này có vẻ ngoài độc đáo nhờ vào quá trình giặt đặc biệt. Do đó, màu sắc thực tế của sản phẩm có thể có khác biệt nhỏ so với hình ảnh.',799000.00,100,'aonam19.jpg','DMNAM'),(120,'ÁO PHÔNG DỆT KIM HỌA TIẾT KIỂU BẠC MÀU','Áo phông vải cotton dệt kim, dáng boxy fit. Cổ tròn, cộc tay. In họa tiết hiệu ứng bạc màu và khác màu ở phía trước.',999000.00,100,'aonam20.jpg','DMNAM'),(121,'ĐẦM NGẮN CỔ LỆCH','Đầm ngắn, cổ xếp nếp, tay lệch. Phối các chi tiết xếp nếp. Có vải lót bên trong.',1099000.00,100,'donu1.jpg','DMNU'),(122,'ĐẦM NGẮN CỔ YẾM DÁNG GODET','Đầm dáng ngắn, cổ yếm buộc dây. Có túi ẩn ở đường may hai bên. Bên trong lót vải khác chất liệu. Cài phía sau bằng khóa kéo ẩn ở đường may.',1299000.00,100,'donu2.jpg','DMNU'),(123,'ĐẦM MIDI VẢI PHA LINEN CÓ KHÓA CÀI','Đầm vải pha linen. Cổ tròn, tay sát nách. Kèm thắt lưng giả và đính khuy giả phía trước. Phía trước có hai túi đáp có nắp. Cài khóa kéo ẩn ở đường may phía sau.',1799000.00,100,'donu3.jpg','DMNU'),(124,'ĐẦM LEN MÓC HỌA TIẾT HOA','Đầm ngắn cổ tròn, tay sát nách. Dáng xòe. Xẻ và cài khuy sau cổ',1799000.00,100,'donu4.jpg','DMNU'),(125,'ĐẦM VẢI JACQUARD CỔ LỆCH','Đầm midi cổ lệch, tay ngắn bồng, có viền bo thun co giãn. Vải dệt jacquard họa tiết hoa, xếp nếp hai bên.',1099000.00,100,'donu5.jpg','DMNU'),(126,'PLAYSUIT 100% VẢI LINEN ZW COLLECTION','ZARA WOMAN COLLECTION Playsuit chất liệu 100% vải linen. Cổ thuyền, tay sát nách. Hở lưng. Có túi ẩn ở đường may hai bên.',1899000.00,100,'donu6.jpg','DMNU'),(127,'ĐẦM MIDI THÊU HOA','Đầm midi cổ ngang, có hai dây đeo vai mảnh điều chỉnh được. Có túi ẩn ở đường may hai bên. Phối vải xếp nếp co giãn kiểu tổ ong và thêu họa tiết hoa. Có lớp lót bên trong.',1799000.00,100,'donu7.jpg','DMNU'),(128,'ĐẦM MIDI VẢI PHA LINEN HỌA TIẾT PATCHWORK','Đầm vải pha linen. Cổ tròn, có hai dây đeo vai bản nhỏ. Đính các khuy giả và xẻ gấu ở phía trước. Lưng xẻ kèm dây buộc. Dáng xòe. Cài khóa kéo ẩn ở đường may bên thân.',1799000.00,100,'donu8.jpg','DMNU'),(129,'ĐẦM CORSET MIDI VẢI PHA LINEN','Đầm vải pha linen. Ngực xếp nếp, có gọng bên trong. Có hai dây đeo vai mảnh có thể điều chỉnh. Dáng xòe, xẻ phía trước. Cài khóa kéo ẩn ở đường may phía sau.',1799000.00,100,'donu9.jpg','DMNU'),(130,'ĐẦM DÀI VẢI PHA SỢI GAI ZW COLLECTION','ZARA WOMAN COLLECTION Đầm dài vải pha sợi gai. Cổ ngang, có hai dây đeo vai mảnh. Vải nhăn, phối chi tiết xếp nếp co giãn kiểu tổ ong. Gấu kiểu xổ chỉ.',2499000.00,100,'donu10.jpg','DMNU'),(131,'ĐẦM MIDI ZW COLLECTION','ZARA WOMAN COLLECTION Đầm dài cổ vuông, tay sát nách. Dáng xòe. Cài khóa kéo ẩn ở đường may.',1999000.00,100,'donu11.jpg','DMNU'),(132,'ĐẦM MIDI KÈM THẮT LƯNG ZW COLLECTION','ZARA WOMAN COLLECTION Đầm midi cổ tròn, dài tay, cổ tay xẻ và cài khuy. Có hai túi đáp trước ngực và túi ẩn ở đường may hai bên. Kèm thắt lưng cùng chất liệu, có khóa cài kim loại để điều chỉnh. Cài khuy ẩn phía trước.',2499000.00,100,'donu12.jpg','DMNU'),(133,'ĐẦM MIDI VẢI THÔ','Đầm midi vải dệt kim. Cổ chữ V, tay sát nách. Dáng xòe.',1299000.00,100,'donu13.jpg','DMNU'),(134,'ĐẦM DÁNG NGẮN TAY CÓ VIỀN KHÁC MÀU','Đầm dáng ngắn, chất liệu vải co giãn. Cổ tim, có các dây đeo vai mảnh buộc nơ để điều chỉnh. Bên trong lót vải khác chất liệu. Cài sau lưng bằng khóa kéo và móc cài kim loại.',1299000.00,100,'donu14.jpg','DMNU'),(135,'ĐẦM MIDI IN HỌA TIẾT ZW COLLECTION','ZARA WOMAN COLLECTION Đầm midi vải sợi viscose. Cổ chữ V, có hai dây đeo vai mảnh. Dáng xòe. Có lớp lót bên trong. Cài phía sau bằng khóa kéo ẩn ở đường may.',3299000.00,100,'donu15.jpg','DMNU'),(136,'ĐẦM DÀI IN HỌA TIẾT ZW COLLECTION','ZARA WOMAN COLLECTION Đầm dài vải viscose. Cổ chữ V, có hai dây đeo vai mảnh bắt chéo sau lưng. Có lớp lót bên trong. Dáng xòe.',3299000.00,100,'donu16.jpg','DMNU'),(137,'ĐẦM VẢI RŨ BÓNG DÁNG DÀI ZW COLLECTION','ZARA WOMAN COLLECTION Đầm dáng dài, cổ chữ V dáng đổ, có hai quai đeo vai bản to. Gấu bất đối xứng, dáng xòe. Lưng hở và có dây buộc để điều chỉnh.',1999000.00,100,'donu17.jpg','DMNU'),(138,'ĐẦM MIDI PHỐI VẢI','Đầm midi cổ chữ V xẻ sâu. Có hai dây đeo vai bắt chéo sau lưng. Gấu phối vải cùng màu.',1299000.00,100,'donu18.jpg','DMNU'),(139,'ĐẦM MIDI CO GIÃN','Đầm midi may chiết eo, cổ ngang. Có hai dây đeo vai mảnh co giãn.',1099000.00,100,'donu19.jpg','DMNU'),(140,'ĐẦM DÁNG NGẮN TAY CÓ VIỀN KHÁC MÀU','Đầm ngắn cổ chữ V, tay sát nách. Đính nơ cùng chất liệu ở hai bên vai.',1599000.00,100,'donu20.jpg','DMNU'),(141,'BỘ LIỀN DỆT KIM THÊU HỌA TIẾT CÂY CỌ','Áo liền quần dệt kim cổ ngang, có hai dây đeo vai bắt chéo và cài khuy sau lưng. Cài khuy ở đáy. Thêu họa tiết cây cọ phía trước.',799000.00,100,'dotreem1.jpg','DMTREEM'),(142,'QUẦN YẾM DÀI VẢI NHUNG LÔNG HỌA TIẾT KẺ','Quần yếm dài cổ ngang, có hai dây đeo vai cài khuy. Có một túi vuông đính nhãn trang trí phía trước. Họa tiết kẻ. Chất liệu 100% cotton.',649000.00,100,'dotreem2.jpg','DMTREEM'),(143,'ÁO PHÔNG TAY RAGLAN','Áo phông cổ tròn, tay ngắn kiểu raglan. Cài khuy bấm sau lưng. Chất liệu 100% cotton.',229000.00,100,'dotreem3.jpg','DMTREEM'),(144,'BỘ LIỀN SƠ SINH DỆT KIM KIỂU LEN MÓC','Bộ liền trẻ em dệt kim cổ tròn, tay sát nách. Có hàng khuy cài phía trước. Có các chi tiết viền khác màu.',899000.00,100,'dotreem4.jpg','DMTREEM'),(145,'SET ÁO PHÔNG VÀ QUẦN SHORT BERMUDA VẢI WAFFLE HỌA TIẾT KẺ','Bộ quần áo gồm hai chi tiết. Áo phông cổ tròn, tay ngắn có viền lật. Cài khuy một bên vai. Quần short bermuda có cạp co giãn. Chất liệu 100% cotton.',549000.00,100,'dotreem5.jpg','DMTREEM'),(146,'ĐẦM VẢI TULLE ĐÍNH NƠ NHỎ','Đầm vải tulle cổ tròn, có hai dây đeo vai đính nơ nhỏ trang trí. Bên trong lót vải cùng màu.',649000.00,100,'dotreem6.jpg','DMTREEM'),(147,'ÁO LIỀN QUẦN NGẮN HỌA TIẾT HOA','Playsuit cổ ngang, có hai dây đeo vai. Ráp bèo phối ren lụa thêu họa tiết. Họa tiết hoa.',799000.00,100,'dotreem7.jpg','DMTREEM'),(148,'ĐẦM VẢI SẦN THÊU HỌA TIẾT HOA','Đầm vải sần cổ ngang, có hai dây đeo vai ráp bèo. Thêu họa tiết hoa. Bên trong lót vải cùng màu.',899000.00,100,'dotreem8.jpg','DMTREEM'),(149,'ÁO MĂNG TÔ MAY CHẦN BÔNG KÈM THẮT LƯNG','Áo măng tô cổ ve lật, dài tay. Có hai hàng khuy cài phía trước. Kèm thắt lưng để điều chỉnh ở eo. Có hai túi may viền phía trước.',999000.00,100,'dotreem9.jpg','DMTREEM'),(150,'ĐẦM DENIM THẮT NƠ','Đầm denim cổ tròn, tay sát nách. Cài khuy bấm sau lưng. buộc thắt nơ trang trí trước ngực.',799000.00,100,'dotreem10.jpg','DMTREEM'),(151,'ĐẦM IN HỌA TIẾT RÁP BÈO','Đầm cổ ngang, tay ngắn nhún bèo. Trang trí họa tiết khác nhau. Chất liệu 96% là sợi cotton.',629000.00,100,'dotreem11.jpg','DMTREEM'),(152,'ĐẦM VẢI DỆT CHÉO THÊU HOA','Đầm cổ cánh sen, tay sát nách. Cài phía trước bằng khuy bấm. Thêu họa tiết hoa cùng màu trang trí.',729000.00,100,'dotreem12.jpg','DMTREEM'),(153,'ĐẦM VẢI SẦN IN HỌA TIẾT VÀ BUỘC NƠ','Đầm cổ ngang, có hai dây đeo vai. Xẻ và có dây buộc thắt nơ sau lưng. In họa tiết toàn thân. Chất liệu 96% cotton.',629000.00,100,'dotreem13.jpg','DMTREEM'),(154,'ĐẦM VẢI POPLIN BUỘC NƠ','Đầm cổ tròn, sát nách. Xẻ hình giọt lệ và cài khuy sau cổ. Phối các chi tiết buộc thắt nơ trang trí. Bên trong lót vải cùng màu.',999000.00,100,'dotreem14.jpg','DMTREEM'),(155,'ĐẦM HOA MAY RÁP','Đầm cổ tròn, tay ngắn có viền bo thun co giãn. Xẻ hình giọt lệ và cài khuy sau cổ, khoét lưng. Bên trong lót vải cùng màu.',999000.00,100,'dotreem15.jpg','DMTREEM'),(156,'ĐẦM VẢI DỆT BO THUN CO GIÃN','Đầm cổ chữ V, tay sát nách. Xẻ hình giọt lệ và cài khuy sau cổ. Bo thun co giãn trước ngực và sau lưng.',899000.00,100,'dotreem16.jpg','DMTREEM'),(157,'ÁO PHÔNG HỌA TIẾT SURF','Áo phông cổ tròn, cộc tay. In họa tiết surf phía trước và sau lưng. Chất liệu 100% cotton.',369000.00,100,'dotreem17.jpg','DMTREEM'),(158,'ÁO NỈ HỌA TIẾT SPIDER-MAN © MARVEL','Áo nỉ cổ tròn, dài tay. Bo viền bằng vải gân. In họa tiết hình nhân vật SPIDER-MAN © MARVEL ở phía trước và phía sau.',649000.00,100,'dotreem18.jpg','DMTREEM'),(159,'ÁO LEN DỆT KIM CÓ MŨ','Áo len dệt kim có mũ trùm đầu, dài tay. Có một túi kangaroo ở phía trước.',649000.00,100,'dotreem19.jpg','DMTREEM'),(160,'SET ÁO PHÔNG VÀ QUẦN SHORT BERMUDA THE AVENGERS © MARVEL','Set gồm hai chi tiết. Áo phông cổ tròn, cộc tay. Quần short bermuda có cạp co giãn. Họa tiết THE AVENGERS © MARVEL.',729000.00,100,'dotreem20.jpg','DMTREEM');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanhtoan`
--

DROP TABLE IF EXISTS `thanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanhtoan` (
  `MaThanhToan` int NOT NULL AUTO_INCREMENT,
  `MaDonHang` int DEFAULT NULL,
  `MaPhuongThuc` int DEFAULT NULL,
  `NgayThanhToan` date DEFAULT NULL,
  `MaQR` varchar(100) DEFAULT NULL,
  `TrangThai` enum('Thành công','Thất bại','Đang xử lý') NOT NULL DEFAULT 'Đang xử lý',
  PRIMARY KEY (`MaThanhToan`),
  KEY `MaDonHang` (`MaDonHang`),
  KEY `MaPhuongThuc` (`MaPhuongThuc`),
  CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`MaDonHang`) REFERENCES `donhang` (`MaDonHang`),
  CONSTRAINT `thanhtoan_ibfk_2` FOREIGN KEY (`MaPhuongThuc`) REFERENCES `phuongthucthanhtoan` (`MaPhuongThuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanhtoan`
--

LOCK TABLES `thanhtoan` WRITE;
/*!40000 ALTER TABLE `thanhtoan` DISABLE KEYS */;
/*!40000 ALTER TABLE `thanhtoan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-06 11:38:58
