import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrdersDetailsView from "./OrdersDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/features/shop/orderSlice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.user?.id));
  }, [dispatch]);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetails(id));
  };

  useEffect(() => {
    if(orderDetails !== null) setOpenDetailsDialog(true)
  },[orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList?.map((order) => (
              <TableRow key={order?._id}>
                <TableCell>{order?._id}</TableCell>
                <TableCell>
                  {new Date(order?.orderDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      order?.orderStatus == "confirmed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } capitalize py-1 rounded-full `}
                  >
                    {order?.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>${order?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails())
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleFetchOrderDetails(order?._id);
                      }}
                    >
                      View Details
                    </Button>
                    <ShoppingOrdersDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
