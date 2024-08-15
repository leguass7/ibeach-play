import type { Attachment } from 'nodemailer/lib/mailer'

export type MailServiceProvider = 'smtp' | 'sendgrid'

export interface SenderPayload {
  from: string
  to: string
  subject: string
  html: string
}

export interface SendPayloadDto extends Omit<SenderPayload, 'from'> {
  from?: string
}

export interface EmailServiceResponse extends AnyObject {
  method: 'smtp'
  accepted: string[]
}
export type EmailServiceSender = (payload: SenderPayload, attachments?: Attachment[]) => Promise<EmailServiceResponse | null>
