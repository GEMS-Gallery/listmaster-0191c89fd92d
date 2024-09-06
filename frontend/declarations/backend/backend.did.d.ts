import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ShoppingItem {
  'id' : bigint,
  'completedAt' : [] | [Time],
  'text' : string,
  'completed' : boolean,
}
export type Time = bigint;
export interface _SERVICE {
  'addItem' : ActorMethod<[string], bigint>,
  'deleteItem' : ActorMethod<[bigint], undefined>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'markItemCompleted' : ActorMethod<[bigint, boolean], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
