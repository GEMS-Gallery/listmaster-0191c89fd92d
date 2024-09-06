import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type ShoppingItem = {
    id: Nat;
    text: Text;
    completed: Bool;
    completedAt: ?Time.Time;
  };

  stable var nextId : Nat = 0;
  stable var items : [ShoppingItem] = [];

  public func addItem(text: Text) : async Nat {
    let newItem : ShoppingItem = {
      id = nextId;
      text = text;
      completed = false;
      completedAt = null;
    };
    items := Array.append(items, [newItem]);
    nextId += 1;
    nextId - 1
  };

  public query func getItems() : async [ShoppingItem] {
    items
  };

  public func markItemCompleted(id: Nat, completed: Bool) : async () {
    items := Array.map(items, func (item: ShoppingItem) : ShoppingItem {
      if (item.id == id) {
        {
          id = item.id;
          text = item.text;
          completed = completed;
          completedAt = if (completed) ?Time.now() else null;
        }
      } else {
        item
      }
    });
  };

  public func deleteItem(id: Nat) : async () {
    items := Array.filter(items, func (item: ShoppingItem) : Bool { item.id != id });
  };
}
