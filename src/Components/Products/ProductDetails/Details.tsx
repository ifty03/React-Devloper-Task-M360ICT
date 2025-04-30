import StarRating from "./StarRating";

import { Card, Typography, Divider, Descriptions, Collapse } from "antd";
import { ProductType } from "../../../types/productType";
import StockIndicator from "./StockIndicator";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface ProductDetailsProps {
  product: ProductType;
}

const Details = ({ product }: ProductDetailsProps) => {
  //   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <Card bordered={false} className="h-full">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Text className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {product.category}
          </Text>
          <Text className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {product.brand}
          </Text>
        </div>

        <Title level={2} className="!mt-0">
          {product.title}
        </Title>

        <div className="flex items-center">
          <StarRating rating={product.rating} />
        </div>

        <Title level={2} className="!mt-4">
          {product?.price}
        </Title>

        <StockIndicator stock={product.stock} />

        <Divider />

        <Collapse bordered={false} className="bg-transparent">
          <Panel header="Product Description" key="1">
            <Text className="text-gray-700">{product.description}</Text>
          </Panel>
        </Collapse>

        <Divider />

        <div>
          <Title level={4} className="!mt-0 mb-4">
            Specifications
          </Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
            <Descriptions.Item label="Category">
              {product.category}
            </Descriptions.Item>
            <Descriptions.Item label="In Stock">
              {product.stock}
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              {product.rating} out of 5
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Card>
  );
};

export default Details;
