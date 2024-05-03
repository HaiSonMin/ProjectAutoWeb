import * as winston from 'winston';

const today: Date = new Date();
const dd: string = String(today.getDate()).padStart(2, '0');
const mm: string = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy: number = today.getFullYear();

// Define the Winston logger configuration
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  defaultMeta: { service: 'Mails Logs Service' }, // Replace 'your-service-name' with your actual service name
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname: `logs-mail`,
      filename: `${dd}-${mm}-${yyyy}-mails.log`,
    }),
  ],
});
