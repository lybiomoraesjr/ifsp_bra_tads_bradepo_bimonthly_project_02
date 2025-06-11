import { InterfacePort } from '../interfacePort/InterfacePort';

export abstract class ComponentInterface {
  protected ports: InterfacePort[] = [];
  abstract init(): void;
}