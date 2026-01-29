import { sendEmail } from "./emailService.js"

export const sendEmailFun = async ({ sendTo, subject,text, html }) => {
    await sendEmail({sendTo, subject , text, html});
    
        return true;
   
     
}

