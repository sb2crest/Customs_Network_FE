import React, { useEffect, useState } from "react";
import { MdOutlineWorkHistory } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { axiosPrivate } from "../../services/apiService";
import { IoEye } from "react-icons/io5";

const options = ["Update", "Delete"];
const ITEM_HEIGHT = 48;

const UserProductHistory = () => {
  const uniqueUserIdentifier = localStorage.getItem("uniqueUserIdentifier");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, productCode: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(productCode);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const deleteProduct = async (productCode: string) => {
    try {
      await axiosPrivate.delete(`/products/delete?code=${productCode}&uniqueUserIdentifier=${uniqueUserIdentifier}`);
      setProductDetails(productDetails.filter((product) => product.productCodeNumber !== productCode));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/products/list-all-codes?uniqueUserIdentifier=${uniqueUserIdentifier}`);
        const listOfProductCode = response.data;
        const requestBody = {
          productCodeList: listOfProductCode,
          uniqueUserIdentifier: uniqueUserIdentifier,
          pageSize: 10,
        };
        const productResponse = await axiosPrivate.post(`/products/list-all-user-products`,requestBody);
        setProductDetails(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uniqueUserIdentifier]);

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
                    <button>
                      <IoEye
                        style={{ cursor: "pointer"}}
                        className="eye"
                      />
                    </button>
                  </td>
                  <td>
                    <div>
                      <IconButton
                        aria-label="more"
                        id={`long-button-${index}`}
                        aria-controls={
                          anchorEl ? `long-menu-${index}` : undefined
                        }
                        aria-expanded={Boolean(anchorEl)}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, item.productCodeNumber)}
                        size="small"
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        id={`long-menu-${index}`}
                        MenuListProps={{
                          "aria-labelledby": `long-button-${index}`,
                        }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedProduct === item.productCodeNumber}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "10ch",
                          },
                        }}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={() => {
                              if (option === "Delete")
                                deleteProduct(item.productCodeNumber);
                              handleClose();
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProductHistory;
