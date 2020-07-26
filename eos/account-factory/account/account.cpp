#include "account.hpp"

using namespace eosio;

void account::ping()
{
  print("pong");
}

void account::ontransfer(
  const name&   from,
  const name&   to,
  const asset&  quantity,
  const string& memo
) {
  if (to != get_self()) {
    return;
  }

  print_f("from: %, to: %, quantity: %, memo: %\n", from, to, quantity, memo);
}
