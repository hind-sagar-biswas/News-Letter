"use client"

import { useDispatch } from "react-redux";
import {openModal} from "@/redux/slices/modalSlice"

const ButtonGroup = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="flex justify-end gap-4 my-4 lg:my-8  flex-wrap">
      <button className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer" onClick = {() => dispatch(openModal({modalName: "renewPackage"}))}>
        RENEW PACK
      </button>
      <button className="bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer" onClick = {() => dispatch(openModal({modalName: "changePackage"}))}>
        CHANGE PACK
      </button>
      <button type="button" className="bg-linear-to-r from-pink-600 to-purple-600 hover:opacity-90 transition px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer" onClick = {() => dispatch(openModal({modalName: "logout"}))}>
        LOG OUT
      </button>
    </div>
  );
};

export default ButtonGroup;
