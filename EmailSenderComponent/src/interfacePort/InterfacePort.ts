import { PortOutbox } from '../portOutbox/PortOutbox';

export abstract class InterfacePort {
  id: string;
  outbox: PortOutbox;

  constructor(id: string, outbox: PortOutbox) {
    this.id = id;
    this.outbox = outbox;
  }

  getId(): string {
    return this.id;
  }

  getOutbox(): PortOutbox {
    return this.outbox;
  }

  disconnect(): void {
    this.outbox.disconnect();
  }
}