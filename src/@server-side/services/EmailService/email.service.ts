import type { Attachment } from 'nodemailer/lib/mailer'

import { smtpConfig } from '~/config'

import { type EmailServiceSender, type SendPayloadDto } from './send.dto'
import { createTransporterSMTP } from './smtp.provider'

export class MailService {
  public sender: EmailServiceSender

  constructor() {
    const sender = createTransporterSMTP(smtpConfig)
    if (!sender) throw new Error('invalid_smtp_config')
    this.sender = sender
    return this
  }

  async send(payload: SendPayloadDto, attachments?: Attachment[]) {
    const from = payload?.from || smtpConfig?.auth?.user
    if (!from) throw new Error('invalid_mail_from')
    const response = await this.sender({ from, ...payload }, attachments)
    return response
  }
}

// export const mailService = new MailService()

export function createEmailService() {
  return new MailService()
}
