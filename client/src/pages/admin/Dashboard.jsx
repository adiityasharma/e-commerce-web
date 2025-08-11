import ProductImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatureImages,
  deleteFeatureImage,
  getFeatureImages,
} from "../../features/common-slice/featureSlice.js";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image uploaded successfully");
        setImageFile("");
        dispatch(getFeatureImages());
      } else {
        toast.info("Something went wrong! try again later.");
      }
    });
  };

  const handleDeleteFeatureImage = (id) => {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image deleted successfully.");
        dispatch(getFeatureImages());
      } else {
        toast.info("Failed to delete image.");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCutomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        disabled={uploadedImageUrl !== null ? false : true}
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full md:w-fit "
      >
        Upload
      </Button>

      {featureImageList?.length ? (
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Recently added images:</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
            {featureImageList && featureImageList.length > 0
              ? featureImageList.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex h-50 overflow-hidden rounded-2xl relative"
                  >
                    <img src={item.image} alt="" className="object-cover object-center" />
                    <Button
                      onClick={() => handleDeleteFeatureImage(item?._id)}
                      className={`absolute rounded-full bottom-2 right-2 bg-red-500 hover:bg-red-600 cursor-pointer`}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
