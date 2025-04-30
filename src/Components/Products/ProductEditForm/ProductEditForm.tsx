import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Rate,
  Space,
  Card,
  Typography,
  Spin,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  useGetAllCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../app/services/productsData";
import { useParams } from "react-router-dom";
import { CategoriesType, ProductType } from "../../../types/productType";

const { Title } = Typography;
const { TextArea } = Input;

const ProductEditForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, isError, isLoading } = useGetProductByIdQuery(id);
  const { data: categories } = useGetAllCategoriesQuery({ limit: 0 });
  const [updateProduct, { data: updateData }] = useUpdateProductMutation();

  const onFinish = async (values: ProductType) => {
    try {
      await updateProduct({
        id: id,
        updatedProduct: values,
      });
    } catch (err) {
      console.error("Error updating product:", err);
    }
    console.log("Updated Product:", values);
  };

  if (isError) {
    return <h1>OOOh No we got an error</h1>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto my-8">
      <Title level={2} className="mb-6">
        Edit Product
      </Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...data,
          reviews: [{ rating: 5, comment: "Great product!" }], // Mock initial review
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Product Title"
          rules={[{ required: true, message: "Please enter product title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Space size="large" className="w-full">
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber prefix="$" min={0} className="w-[200px]" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber min={0} className="w-[200px]" />
          </Form.Item>
        </Space>

        <Space size="large" className="w-full">
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input className="w-[200px]" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              className="w-[200px]"
              options={categories?.map((cat: CategoriesType) => ({
                label: cat.name,
                value: cat.name,
              }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")===input
              }
            />
          </Form.Item>
        </Space>

        <Title level={4} className="mt-8 mb-4">
          Product Reviews
        </Title>
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Review
              </Button>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} className="bg-gray-50">
                  <Space direction="vertical" className="w-full">
                    <Form.Item
                      {...restField}
                      name={[name, "rating"]}
                      label="Rating"
                      rules={[{ required: true, message: "Please rate" }]}
                    >
                      <Rate />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "comment"]}
                      label="Comment"
                      rules={[
                        { required: true, message: "Please enter comment" },
                      ]}
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove Review
                    </Button>
                  </Space>
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Form.Item className="mt-8">
          <button
            type="submit"
            className="bg-blue-700 text-white px-5 py-2.5 rounded-md hover:scale-105 duration-500"
          >
            Update Product
          </button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductEditForm;
