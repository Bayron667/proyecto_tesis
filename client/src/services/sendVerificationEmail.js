import Resend from 'resend';

const resend = new Resend('re_fuGRdwVQ_DELdoABgJBZoCc5T9KAAFTY3');

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await resend.send({
      from: 'tu-email@example.com', // Cambia esto por tu dirección de remitente
      to: email,
      subject: 'Verificación de correo electrónico',
      text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: http://localhost:3000/verify?token=${verificationToken}`,
    });
    return response;
  } catch (error) {
    console.error('Error al enviar correo de verificación:', error);
  }
};