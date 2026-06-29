import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${twilioPhone}`,
      to: `whatsapp:${phoneNumber}`,
    });
    console.log(`WhatsApp message sent to ${phoneNumber}`);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

export const sendAttendanceNotification = async (
  parentPhone: string,
  studentName: string
): Promise<void> => {
  const message = `نحيطكم علمًا أن الطالب ${studentName} كان غائبًا اليوم، يرجى تزويدنا بسبب الغياب.`;
  await sendWhatsAppMessage(parentPhone, message);
};

export const sendPaymentNotification = async (
  parentPhone: string,
  studentName: string,
  amount: number,
  date: string
): Promise<void> => {
  const message = `تم استلام دفعة مالية بقيمة ${amount} ل.س بتاريخ ${date} للطالب ${studentName}. شكرًا لتعاونكم.`;
  await sendWhatsAppMessage(parentPhone, message);
};

export const sendBehaviorNotification = async (
  parentPhone: string,
  studentName: string,
  note: string
): Promise<void> => {
  const message = `ملاحظة سلوكية للطالب ${studentName}: ${note}`;
  await sendWhatsAppMessage(parentPhone, message);
};

export const sendAnnualReportNotification = async (
  parentPhone: string,
  studentName: string,
  report: string
): Promise<void> => {
  const message = `تقرير سنوي للطالب ${studentName}:\n${report}`;
  await sendWhatsAppMessage(parentPhone, message);
};
