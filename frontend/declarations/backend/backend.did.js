export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'completedAt' : IDL.Opt(Time),
    'text' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'deleteItem' : IDL.Func([IDL.Nat], [], []),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'markItemCompleted' : IDL.Func([IDL.Nat, IDL.Bool], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
