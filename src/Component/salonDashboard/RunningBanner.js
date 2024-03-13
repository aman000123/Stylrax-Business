// import React from 'react'
// import styles from "../../assets/scss/pages/home/runningBanner.module.css";
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// function RunningBanner() {
//     return (
//         <div className={styles.banner}>
//             <div className={styles.text}>
//                 <div className={styles.title}>
//                     <p>Running Banner</p>
//                 </div>

//                 <div className={styles.icon}>
//                     <KeyboardArrowLeftIcon/>
//                     <KeyboardArrowRightIcon/>
//                 </div>
//             </div>

//             <div className={styles.runningBanner}>
//                 <div className={styles.offer}>
//                    <h3>20%</h3>
//                     <p>Flat off on any hair style</p>
//                 </div>
//                 <div className={styles.offerDetails}>
//                     <h3>Hair Clinic</h3>
//                     <p>Lorem ispum dolar dot<br/> huiinsuing gone<br/> ruling ispium</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RunningBanner


import React, { useState } from 'react';
import styles from "../../assets/scss/pages/home/runningBanner.module.css";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function RunningBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            background: 'url("../../assets/image/bgimage.png")',
            offer: '20%',
            offerDetails: 'HairClinic',
            description: <p>Lorem ispum dolar<br/> dot nhuiinsuing gone <br/>ruling ispium</p>
        },
        {
            background: 'url("../../assets/image/bgimage.png")',
            offer: '30%',
            offerDetails: 'Skin Care Clinic',
            description: <p>Another description for<br/> the second image.</p>
        },
        // Add more objects for additional banners
    ];

    const changeBanner = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
        } else {
            setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
        }
    };

    return (
        <div className={styles.banner} style={{ backgroundImage: banners[currentIndex].background }}>
            <div className={styles.text}>
                <div className={styles.title}>
                    <p>Running Banner</p>
                </div>

                <div className={styles.icon}>
                    <KeyboardArrowLeftIcon onClick={() => changeBanner('prev')} />
                    <KeyboardArrowRightIcon onClick={() => changeBanner('next')} />
                </div>
            </div>

            <div className={styles.runningBanner}>
                <div className={styles.offer}>
                   <h3>{banners[currentIndex].offer}</h3>
                    <p>Flat off on any hair style</p>
                </div>
                <div className={styles.offerDetails}>
                    <h3>{banners[currentIndex].offerDetails}</h3>
                    <p>{banners[currentIndex].description}</p>
                </div>
            </div>
        </div>
    );
}

export default RunningBanner;
