import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../app/features/counter/counterSlice";
import { RootState } from "../app/store";
import { Button, Space, DatePicker } from "antd";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-semibold text-blue-500 text-3xl ">{count}</h2>

      <div className="flex gap-5 mt-5 w-fit">
        <button
          className="bg-gray-400 px-5 py-2 rounded-md"
          onClick={() => dispatch(increment())}
        >
          Plus
        </button>
        <button
          className="bg-gray-400 px-5 py-2 rounded-md"
          onClick={() => dispatch(decrement())}
        >
          Minus
        </button>
      </div>

      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
    </div>
  );
};

export default Counter;
