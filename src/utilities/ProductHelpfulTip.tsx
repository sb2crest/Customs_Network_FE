import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HelpFulTips from "../../src/assets/images/helpfultip.png";

interface ModalProps {
    tipOpen: boolean;
    handleClose: () => void;
    selectedOption:string | null;
  }

export const Option1Modal: React.FC<ModalProps> = ({ tipOpen, handleClose,selectedOption }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "0.5px solid #000",
      boxShadow: 24,
      p: 4,
      borderRadius: "5px",
    };
  
    return (
        <Modal
        open={tipOpen && selectedOption === "Option 1"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">Helpful Tips</Typography>
          <p className="tip_heading">Option 1 - Search Industry</p>
          <p style={{ fontSize: "14px" }}>
            Scroll through the list of industries and select the one
            that is most closely related to the product you are
            coding. You may select more than one industry by holding
            down the CTRL key as you make your selections. When you're
            ready, click the NEXT button. The drop down lists on the
            next screen will be limited to those that match the
            Industry you entered.
          </p>
          <p style={{ fontSize: "14px" }}>
            Multiple adjacent industries may be selected by holding
            the mouse down and dragging it over industries or by
            holding down the SHIFT key while using the arrows to
            select them.
          </p>
          <p style={{ fontSize: "14px" }}>
            Non-adjacent industries may be selected by holding down
            the CTRL while clicking on the industries using the mouse.
          </p>
        </Box>
      </Modal>
    );
  };

  export const Option2Modal: React.FC<ModalProps>  = ({ tipOpen, handleClose,selectedOption }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "0.5px solid #000",
      boxShadow: 24,
      p: 4,
      borderRadius: "5px",
    };
  
    return (
        <Modal
        open={tipOpen && selectedOption === "Option 2"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">Helpful Tips</Typography>
          <p className="tip_heading">
            Option 2 - Verify Product Code
          </p>
          <p style={{ fontSize: "14px" }}>
            If you have a product code, and want to know if it is
            still a valid code or if you are not sure what product it
            represents, you can enter the code in the appropriate
            fields. Click NEXT. If the product code is valid, the name
            of the product will appear on the next screen.
          </p>
          <p style={{ fontSize: "14px" }}>
            The Application returns the primary product for the
            product code entered. There may be secondary products with
            this product code. To view primary and secondary products
            for this product code, use Option 2.
          </p>
          <p style={{ fontSize: "14px" }}>For example:</p>
          <img src={HelpFulTips} alt="" width={300} />
        </Box>
      </Modal>
      );
  };