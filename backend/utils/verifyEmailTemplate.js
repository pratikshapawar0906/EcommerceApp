export const VerificationEmail = (name, otp) => {
  return `
  <div style="
    max-width: 500px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    font-family: Arial, Helvetica, sans-serif;
    border: 1px solid #eaeaea;
  ">
    
    <h2 style="
      color: #333333;
      margin-bottom: 8px;
    ">
      Hello ${name},
    </h2>

    <p style="
      color: #555555;
      font-size: 15px;
      line-height: 1.5;
    ">
      We received a request to verify your email address.  
      Please use the OTP below to complete your verification.
    </p>

    <div style="
      margin: 24px 0;
      padding: 16px;
      background-color: #f4f6f8;
      border-radius: 6px;
      text-align: center;
      letter-spacing: 4px;
    ">
      <span style="
        font-size: 28px;
        font-weight: bold;
        color: #ff5252;
      ">
        ${otp}
      </span>
    </div>

    <p style="
      color: #555555;
      font-size: 14px;
    ">
      ⏳ This OTP is valid for <strong>10 minutes</strong>.
    </p>

    <p style="
      color: #777777;
      font-size: 13px;
      margin-top: 20px;
    ">
      If you did not request this verification, please ignore this email.
    </p>

    <hr style="
      margin: 24px 0;
      border: none;
      border-top: 1px solid #eeeeee;
    " />

    <p style="
      color: #999999;
      font-size: 12px;
      text-align: center;
    ">
      © ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </p>
  </div>
  `;
};
