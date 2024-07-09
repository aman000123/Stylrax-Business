import { endpoint } from '../constants';

//Account Management APIs
export const __endpoint_doLogin = endpoint + "b2b/account/otp/login";
export const __endpoint_verifyOtp = endpoint + "b2b/account/otp/verify";
export const __endpoint_resendOtp = endpoint + "b2b/account/otp/resend";
export const __endpoint_profile = endpoint + "b2b/account/profile";
export const __endpoint_verifyEmail = endpoint + "b2b/account/email/otp/send";
export const __endpoint_verifyEmailOtp = endpoint + "b2b/account/email/otp/verify";

//User Management APIs

export const __endpoint_userProfile= endpoint + "b2b/user/profile";



//Salon Management APIs
export const __endpoint_salons = endpoint + "b2b/salons";
export const __endpoint_singleSalon = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}`};
export const __endpoint_salonGallery = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}/galleries`};

export const __endpoint_addStaff = (id)=>{return ` ${endpoint}b2b/salons/${id}/employees`};

export const __endpoint_getStaff = (salonId,id)=>{return ` ${endpoint}b2b/salons/${salonId}/employees/${id}`};

export const __endpoint_removeStaff = (salonId,id) => {
    return `${endpoint}b2b/salons/${salonId}/employees/${id}`;
  };
  
export const __endpoint_getSalonSingleService = (salonId,id) => {
  return `${endpoint}b2b/salons/${salonId}/services/${id}`;
};
export const __endpoint_salonService = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}/services`};
export const __endpoint_salonBusinessTime = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}/businessHours`};
export const __endpoint_addSalonService = (salonId)=>{return ` ${endpoint}b2b/salons/${salonId}/services`};
export const __endpoint_serviceCategory = endpoint + "b2b/services/categories";
export const __endpoint_salonAddress =(id)=>{return ` ${endpoint}b2b/salons/${id}`};

//File Management APIs
export const __endpoint_files = endpoint + "b2b/file/presignedUrl";

//Bank Details APIs
export const __endpoint_bankDetails = (id)=>{return ` ${endpoint}b2b/salons/${id}/bank`};


//Appointments APIs
export const __endpoint_completedAppointments = (id)=>{return ` ${endpoint}b2b/salons/${id}/appointments?status=completed`};
export const __endpoint_pendingAppointments = (id)=>{return ` ${endpoint}b2b/salons/${id}/appointments?status=pending`};
export const __endpoint_ongoingAppointments = (id)=>{return ` ${endpoint}b2b/salons/${id}/appointments`};

// Static Page APIs
export const __endpoint_staticPageUrl = endpoint + "b2b/file/doc/";

export const __endpoint_cancelledAppointments = (id)=>{return ` ${endpoint}b2b/salons/${id}/appointments?status=cancelled`};
export const __endpoint_detailsAppointments = (id)=>{return ` ${endpoint}b2b/appointments/${id}`};
export const __endpoint_myQr = (id)=>{return ` ${endpoint}b2b/salons/${id}/qrcode`};
export const __endpoint_acceptAppointment = (id)=>{return ` ${endpoint}b2b/appointments/${id}/accept`};
export const __endpoint_rejectAppointment = (id)=>{return ` ${endpoint}b2b/appointments/${id}/reject`};
export const __endpoint_startAppointment = (id)=>{return ` ${endpoint}b2b/appointments/${id}/start`};
export const __endpoint_completeAppointment = (id)=>{return ` ${endpoint}b2b/appointments/${id}/complete`};

export const __endpoint_getInvoice = endpoint + "b2b/appointments";


