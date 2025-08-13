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
import AdminOrdersDetailsView from "./OrdersDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/features/admin/orderSlice.js";
import { Badge } from "../ui/badge";
import ShoppingOrdersDetailsView from "../shopping/OrdersDetails.jsx";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetailsForAdmin(id));
  };

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>

      <CardContent className={`overflow-auto w-[90vw] sm:w-full `}>
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
                        : order?.orderStatus == "rejected"
                        ? "bg-red-500"
                        : order?.orderStatus == "delivered"
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
                      dispatch(resetOrderDetails());
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleFetchOrderDetails(order?._id);
                      }}
                    >
                      View Details
                    </Button>
                    <AdminOrdersDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;
