import React, { useEffect, useState } from "react";
import { CartItems } from "../../Components/CartItems/CartItems";
import axios from "axios";

export const Cart = () => {

  return (
    <div>
      <CartItems />
    </div>
  );
};
