import { emailLayout, fieldRowsHtml } from './layout';

type RefundConfirmationData = {
  orderId: string;
  refundTxnNo: string;
  hotelName: string;
  amount: string;
  guestName: string;
  guestEmail: string;
  status: 'SUCCESS' | 'FAILURE';
  txnID?: string | null;
  respDescription?: string | null;
};

function buildFields(data: RefundConfirmationData): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ['Hotel/Resort', data.hotelName],
    ['Original Transaction No.', data.orderId],
    ['Refund Reference No.', data.refundTxnNo],
    ['Refund Status', data.status === 'SUCCESS' ? 'Success' : 'Failure'],
    ['Amount', `INR ${data.amount}`],
    ['Name', data.guestName],
    ['Email', data.guestEmail],
  ];
  if (data.txnID) fields.push(['Gateway Txn ID', data.txnID]);
  if (data.status === 'FAILURE' && data.respDescription) {
    fields.push(['Reason', data.respDescription]);
  }
  return fields;
}

export function refundConfirmationHtml(data: RefundConfirmationData): string {
  const bodyHtml = `
    <p style="font-size:16px; margin:0 0 20px;">Refund ${data.status === 'SUCCESS' ? 'Processed' : 'Failed'}</p>
    <p style="font-size:14px; margin:0 0 20px;">
      ${
        data.status === 'SUCCESS'
          ? 'A refund has been processed against this transaction.'
          : 'A refund attempt against this transaction could not be completed.'
      }
    </p>
    ${fieldRowsHtml(buildFields(data))}
  `;

  return emailLayout({
    title: `i-Pay Refund [${data.status === 'SUCCESS' ? 'Success' : 'Failure'}]: ${data.orderId}`,
    bodyHtml,
  });
}
