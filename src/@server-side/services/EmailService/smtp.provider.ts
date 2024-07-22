import { createTransport, type Transporter } from 'nodemailer'
import { type Attachment } from 'nodemailer/lib/mailer'

import type { EmailServiceResponse, EmailServiceSender } from './send.dto'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

export interface ISmtpConfig {
  host: string
  port: number
  secure?: boolean
  auth: {
    user: string
    pass: string
  }
}

export function createTransporterSMTP(config: ISmtpConfig): EmailServiceSender | null {
  if (!config?.auth?.user || !config?.auth?.pass || !config?.host) {
    throw new Error('invalid_smtp_config')
  }
  const sender: EmailServiceSender = async ({ from, html, subject, to }, attachments?: Attachment[]) => {
    try {
      let transporter: Transporter<SMTPTransport.SentMessageInfo> | null = createTransport(config) || null
      const response = await transporter.sendMail({ from, to, subject, html, attachments })
      transporter = null
      return { ...response, method: 'smtp' } as EmailServiceResponse
    } catch (error: Error | any) {
      // eslint-disable-next-line no-console
      console.error('createTransporterSMTP', error?.message, error)
      return null
    }
  }
  return sender
}
