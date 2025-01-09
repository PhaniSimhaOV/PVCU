import React from "react";

const CartItem = ({ image, title, price, discount, notes }) => {
    return (
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <img
                src={image}
                alt={title}
                className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-grow">
                <h3 className="font-semibold text-[#565656] font-mono text-xl">{title}</h3>
                <div className="flex items-center space-x-2">
                    <span className="font-normal text-sm">${price}</span>
                    {discount && (
                        <>
                            <span className="line-through text-gray-400">${discount.original}</span>
                            <div className="text-white  text-sm  rounded-full bg-[#E90000] px-4 my-2 py-0.5">50%</div>

                        </>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="mt-2 flex items-center border border-slate-500 w-fit  space-x-2">
                        
                            <button className="px-2 py-1  rounded">-</button>
                            <input
                                type="text"
                                value="1"
                                className="w-12 text-center border-none rounded"
                                readOnly
                            />
                            <button className="px-2 py-1  rounded">+</button>
                      


                    </div>
                    <div>
                        <button className="text-slate-400 hover:text-red-800">Delete</button>
                    </div>
                </div>
                <textarea
                    placeholder="Eg: Please double check before packing."
                    className="w-full my-2 border rounded-sm p-2 text-sm"
                />
            </div>
        </div>
    );
};

export default CartItem;
