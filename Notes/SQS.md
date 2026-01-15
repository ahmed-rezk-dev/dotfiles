> [!IMPORTANT]
>
> - Many threads / processes can poll a queue at once.
> - Only a single thread / processes can processs a messsage at onc.
> - Long Polling is supported and encouraged.
> - Support for cross account publishing / processing.
> - 256 KB maximum payload size per message.
> - Dead Letter Queues (DLQ) can help store failed messages for later.

## Search

- [ ] Long Polling.
- [ ] Delete a queue.
- [ ] Take a look at SQS Consumer npm packages.
