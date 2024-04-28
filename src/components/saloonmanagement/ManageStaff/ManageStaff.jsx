import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styles from "../ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png"
import { Paper } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";

import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddStaff from '../AddStaff/AddStaff';
import ViewAllAddService from '../viewalladdservice/ViewAllAddService';
const data = [
    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

    {
        img: stylistimg1,
        textOne: "Debhasis",
        textTwo: "HairStylist And ",
        textThree: "HairArtist",
        textFour: "4.2(1.2k) rating",
        textFive: "View More",
    },

]




import { salonStaff } from "../../../api/salon.management";




function ManageStaff() {
  // Popup one code
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  console.log("staff::>", staff);
  const handleOpen = () => setAddStaffOpen(true);
  const handleClose = () => setOpen(false);


    // Popup one code
  

    //Popup two code
    const [isOpen, isSetOpen] = useState(false);
    const ishandleOpen = (id) =>  {setOpen(true)
        handleViewMore(id);

    };
    const ishandleClose = () => isSetOpen(false);
    
    const handleViewMore = (id) => {
        console.log("View more clicked for staff ID:", id);
        setSelectedStaffId(id);
        setOpen(true); 
    };
    //GET API
    
useEffect(()=>{
const getStaff = async()=>{
const res = await salonStaff()
const staff = res.data;
setStaff(staff)
setAddStaffOpen(false)
}
getStaff();
},[])

    return (
        <>
            <div className={styles.mainDiv}>
                {
                    staff?.map((value) => (
                        <Paper key={value.id} className={styles.paper}>
                            <div className={styles.imgDiv}>
                                {/* <img src={value.profileImageUrl} alt='' /> */}
                                <img src={stylistimg1} alt='' />
                            </div>

                            <div className={styles.text}>
                                <p>{value.firstName}<br />
                                    <span className={styles.spanOne}>{value.specialization}</span><br />
                                    <span className={styles.spanOne}>{value.role}</span><br />
                                    {/* <span className={styles.spanOne}>{value.textFour}</span><br /> */}
                                    <span className={styles.spanThree}>  <button type="button" onClick={() => ishandleOpen(value.id)}>view more</button></span>
                                </p>
                            </div>
                        </Paper>
                    ))
                }

                <div className={styles.iconDiv}>
                    <button onClick={handleOpen} className={styles.staffbtn}><IoMdAddCircle className={styles.icon} /></button>
                    <p>Add Staff</p>

                    {
                        addStaffOpen && (<Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                             open={addStaffOpen}
                           // open = {open}
                            onClose={ishandleClose}
                            slots={{ backdrop: StyledBackdrop }}
                        >
                            <ModalContent>
                                <AddStaff onClose={()=> setAddStaffOpen(false)} />
                            </ModalContent>
                        </Modal>)
                    }

                    {

                        open && (<Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={open}
                            onClose={handleClose}
                            slots={{ backdrop: StyledBackdrop }}
                        >
                            <ModalContent>
                                <ViewAllAddService  id={selectedStaffId} onViewMore={handleViewMore} onClose={handleClose}/>
                            </ModalContent>
                        </Modal>)

                    }


                </div>
            </div>
        </>
    )
}


export default ManageStaff;



// Popup one styling
const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});
Backdrop.propTypes = {
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

// Add a display name
Backdrop.displayName = 'Backdrop';

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(255 255 255 / 0.8);
    -webkit-tap-highlight-color: transparent;
  `;

const ModalContent = styled('div')(
    () => css`
      display: flex;
      flex-direction: row;
      gap:5px;
      overfloe:hidden;
    `,
);

