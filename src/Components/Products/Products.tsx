import { Table, Space, Spin, message } from "antd";
import type { TableColumnsType } from "antd";
import { useDeleteProductMutation, useGetAllProductQuery } from "../../app/services/productsData";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { ProductType } from "../../types/productType";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";


const Products = () => {
  const navigate = useNavigate();
    const [messageApi] = message.useMessage();
  const { data, isError, isLoading } = useGetAllProductQuery({ limit: 0 });
    const [deleteProduct] =useDeleteProductMutation();
  
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
  if (isError) return <div>Error loading products</div>;

  const columns: TableColumnsType<ProductType> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: Array.from(new Set(data?.products.map((p) => p.brand))).map(
        (brand) => ({
          text: brand,
          value: brand,
        })
      ),
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: Array.from(new Set(data?.products.map((p) => p.category))).map(
        (category) => ({
          text: category,
          value: category,
        })
      ),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="bg-gray-200 text-white rounded-md px-2 py-2"
            onClick={() => navigate(`/products/${record.id}`)}
          >
            <GrView className="text-blue-700" />
          </button>
          <button
            className="bg-green-100 text-white rounded-md px-2 py-2"
            onClick={() => navigate(`/products/edit/${record.id}`)}
          >
            <CiEdit className="text-green-700 " />
          </button>
          <button
            className="bg-red-100 text-white rounded-md px-2 py-2"
            onClick={() => handleDeleteProduct(record.id)}
          >
            <RiDeleteBin6Line className="text-red-700 " />
          </button>
        </Space>
      ),
    },
  ];


   const handleDeleteProduct = async (productId:number) => {
     try {
       const response = await deleteProduct(productId).unwrap();
        messageApi.success("Product deleted successfully");
       console.log(response);
     } catch (err) {
      const error = () => {
        messageApi.error("Failed to delete product");
      };
      error()
     }
   };

  return (
    <div style={{ padding: '20px' }}>
      <Table 
        columns={columns} 
        dataSource={data?.products} 
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          // showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        style={{ 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default Products;
