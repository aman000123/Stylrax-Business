import React from 'react'
import styles from "../ManageStaff/ManageStaff.module.css";
import stylistimg1 from "../../../assets/image/stylistimg1.png"
import { Paper } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddStaff from '../AddStaff';
import ViewAllAddService from '../ViewAllAddService';




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





function ManageStaff() {

    // Popup one code
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Popup two code
    const [isOpen, isSetOpen] = React.useState(false);
    const ishandleOpen = () => isSetOpen(true);
    const ishandleClose = () => isSetOpen(false);


    return (
        <>
            <div className={styles.mainDiv}>
                {
                    data.map((value) => (
                        <Paper className={styles.paper}>
                            <div className={styles.imgDiv}>
                                <img src={value.img} alt='' />
                            </div>

                            <div className={styles.text}>
                                <p>{value.textOne}<br />
                                    <span className={styles.spanOne}>{value.textTwo}</span><br />
                                    <span className={styles.spanOne}>{value.textThree}</span><br />
                                    <span className={styles.spanOne}>{value.textFour}</span><br />
                                    <span className={styles.spanThree}><button type="button" onClick={handleOpen}>{value.textFive}</button></span>
                                </p>
                            </div>
                        </Paper>
                    ))
                }

                <div className={styles.iconDiv}>
                    <button onClick={ishandleOpen} className={styles.staffbtn}><IoMdAddCircle className={styles.icon} /></button>
                    <p>Add Staff</p>

                    {
                        isOpen && (<Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={isOpen}
                            onClose={ishandleClose}
                            slots={{ backdrop: StyledBackdrop }}
                        >
                            <ModalContent>
                                <AddStaff />
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
                                <ViewAllAddService/>
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
    ({ theme }) => css`
      display: flex;
      flex-direction: row;
      gap:5px;
      overfloe:hidden;
    `,
);

