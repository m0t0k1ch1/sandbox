#include "proxy.hpp"

using namespace eosio;

void proxy::increment(name me)
{
  require_auth(me);

  action(
    permission_level{me, name("active")},
    name("countertest1"),
    name("increment"),
    std::make_tuple(me)
  ).send();
}
