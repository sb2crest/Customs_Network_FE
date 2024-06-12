import React, { useEffect, useState } from "react";
import { MdOutlineWorkHistory } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { axiosPrivate } from "../../services/apiService";
import { IoEye } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IProductField from "../../types/UserProductFields.types";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/UpdateProductContext";
import { Stack, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';

const UserProductHistory: React.FC = () => {
  const uniqueUserIdentifier = localStorage.getItem("uniqueUserIdentifier") || '';
  const [productDetails, setProductDetails] = useState<IProductField[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProductField | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Product Details");
  const navigate = useNavigate();
  const { setSelectedProduct: setSharedProduct } = useProduct();
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setModalContent(null);
    setModalTitle("Product Details");
  };

  const deleteProduct = async (productCode: string) => {
    try {
      await axiosPrivate.delete(`/products/delete?code=${productCode}&uniqueUserIdentifier=${uniqueUserIdentifier}`);
      setProductDetails(productDetails.filter((product) => product.productCodeNumber !== productCode));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const viewPartyDetails = (product: IProductField) => {
    setModalTitle("Party Details");
    setModalContent(
      <Typography id="modal-modal-description">
        <pre style={{ margin: 0 }}>
          <code style={{ fontSize: "12px", lineHeight: "1.2", margin: 0 }}>
            {JSON.stringify(product.partyDetails, null, 2)}
          </code>
        </pre>
      </Typography>
    );
    setModalOpen(true);
  };

  const viewFullProductDetails = (product: IProductField) => {
    setModalTitle("Product Details");
    setModalContent(
      <Typography id="modal-modal-description">
        <pre style={{ margin: 0 }}>
          <code style={{ fontSize: "12px", lineHeight: "1", margin: 0 }}>
            {JSON.stringify(product, null, 2)}
          </code>
        </pre>
      </Typography>
    );
    setModalOpen(true);
  };

  const getProductByProductCode = async (productCode: string) => {
    try {
      const response = await axiosPrivate.get(`/products/get?code=${productCode}&uniqueUserIdentifier=${uniqueUserIdentifier}`);
      const product = response.data.productInfo;
      setSharedProduct(product);
      navigate("/user-page/user-product");
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const fetchData = async (page: number) => {
    try {
      const response = await axiosPrivate.get(`/products/list-all-codes?uniqueUserIdentifier=${uniqueUserIdentifier}`);
      const listOfProductCode = response.data;
      const requestBody = {
        productCodeList: listOfProductCode,
        uniqueUserIdentifier: uniqueUserIdentifier,
        pageSize: 10,
        pageNumber: page - 1,
      };
      const productResponse = await axiosPrivate.post(`/products/list-all-user-products`, requestBody);
      setProductDetails(productResponse.data.data);
      setTotalRecords(productResponse.data.totalRecords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="product_history">
      <div className="product_history_container">
        <div className="product_history_heading">
          <h2>
            Product History &nbsp;
            <MdOutlineWorkHistory className="sidebar_icon" />
          </h2>
        </div>
        <div className="product_history_container_section">
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>User Identifier</th>
                <th>Commercial Description</th>
                <th>Parties</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.productCodeNumber}</td>
                  <td>{uniqueUserIdentifier}</td>
                  <td>{item.commercialDesc || "-"}</td>
                  <td className="eyeicon">
                    <button onClick={() => viewPartyDetails(item)}>
                      <IoEye style={{ cursor: "pointer" }} className="eye" />
                    </button>
                  </td>
                  <td>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => getProductByProductCode(item.productCodeNumber)}>
                        <EditIcon sx={{fontSize:"18px"}} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => deleteProduct(item.productCodeNumber)}>
                        <DeleteIcon sx={{fontSize:"18px"}}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => viewFullProductDetails(item)}>
                        <IoEye fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <Stack spacing={1}>
              <Pagination
                count={Math.ceil(totalRecords / 10) || 1}
                page={currentPage}
                shape="rounded"
                onChange={(event, page) => handlePageChange(page)}
              />
            </Stack>
          </div>
        </div>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 350,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              maxHeight: '75vh',
              overflowY: 'auto',
              borderRadius: "5px",
              overflowX: 'hidden',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
              {modalTitle}
            </Typography>
            {modalContent}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserProductHistory;
