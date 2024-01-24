const SUBJECT = 'Sea Dragon Company';

export const htmlResetPassword = (OTPCode: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${SUBJECT} Login OTP</title>
    </head>
    <body>
        <p>Xin chào,</p>
        <p>Bạn đang đăng nhập vào hệ thống của <strong>${SUBJECT}</strong>. Sử dụng mã OTP bên dưới để hoàn tất quá trình đặt lại mật khẩu. Mã OTP chỉ có hiệu lực trong 2 phút.</p>
        <p><strong style="font-size: 24px;">${OTPCode}</strong></p>
        <p>Mọi thắc mắc, Quý khách vui lòng liên hệ tổng đài hỗ trợ <strong>0345.299.087</strong> từ 8:00 - 22:00.</p>
        <p>Trân trọng,</p>
        <p>${SUBJECT}</p>
    </body>
    </html>
  `;
};

export const htmlRegister = (OTPCode: string) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${SUBJECT} Login OTP</title>
      </head>
      <body>
          <p>Xin chào,</p>
          <p>Bạn đang đăng nhập vào hệ thống của <strong>${SUBJECT}</strong>. Sử dụng mã OTP bên dưới để hoàn tất quá trình đăng kí. Mã OTP chỉ có hiệu lực trong 2 phút.</p>
          <p><strong style="font-size: 24px;">${OTPCode}</strong></p>
          <p>Mọi thắc mắc, Quý khách vui lòng liên hệ tổng đài hỗ trợ <strong>0345.299.087</strong> từ 8:00 - 22:00.</p>
          <p>Trân trọng,</p>
          <p>${SUBJECT}</p>
      </body>
      </html>
    `;
};
