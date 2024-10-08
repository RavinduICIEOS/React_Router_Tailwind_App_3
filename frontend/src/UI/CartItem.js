import { currencyFormatter } from "../util/formatting";
import Button from "./Button";

export default function CartItem({
  name,
  description,
  image,
  quantity,
  price,
  color,
  onIncrease,
  onDecrease,
  remove
}) {

  console.log("Color prop:", color);

  return (
    <li className="flex justify-between items-center py-4 border-none ">

    <div >
      <div className="flex items-center ">
        
        <img src={image} alt={name} className="w-40 h-40 object-cover mr-4 relative top-14"/>
  
     <div className="mr-4 flex justify-center "> 
        <p className="text-[18px] font-semibold text-gray-900">{description}</p>
        
        <p className="text-[20px] font-bold text-gray-900 ml-24">
          {quantity} x {currencyFormatter.format(price)}
        </p>   
      </div>
    </div>

    <div className=" flex items-center text-base -mt-14 relative left-[178px]">
              <p className=" text-gray-600">Color </p>
              <p className="px-2 py-1 font-semibold text-gray-900"> {color}</p>
      </div>

      <div className=" space-x-2 pt-6 flex items-center relative left-44 ">
        <Button
        className="px-2 py-0"
        textOnly
          onClick={onDecrease}
        >
          -
        </Button>

        <span className="text-lg font-semibold text-gray-700">{quantity}</span>
        <Button
        className="px-2 py-0"
        textOnly
          onClick={onIncrease}
        >
          +
        </Button>
        <Button
        className="px-2 py-0 border-0 font-['Josefin_Sans'] text-red-800"
        textOnly
          onClick={remove}
        >
          Remove
        </Button>
       </div>
      </div>
      
  </li>
  
  );
}