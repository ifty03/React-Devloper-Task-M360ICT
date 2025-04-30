import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../app/services/productsData";
import Details from "./Details";
import { Spin } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetProductByIdQuery(id);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">Product Details</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Product images section - 60% on desktop */}
            <div className="md:w-3/5 p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Main image */}
                <div className="w-full md:w-3/4 bg-white rounded-xl overflow-hidden">
                  <img
                    src={data?.thumbnail}
                    alt={data?.title}
                    className="w-full h-96 md:h-[500px] object-cover object-center transition-all duration-500 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-2/5 p-6 border-t md:border-t-0 md:border-l border-gray-200 relative">
              <Details product={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
