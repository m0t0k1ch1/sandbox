#include "factory.hpp"

using namespace eosio;

void factory::create(
  const name& account,
  const authority& auth_owner,
  const authority& auth_active,
  uint32_t ram_bytes
) {
  require_auth(get_self());

  action(
    permission_level{get_self(), name("active")},
    name("eosio"),
    name("newaccount"),
    std::make_tuple(get_self(), account, auth_owner, auth_active)
  ).send();

  action(
    permission_level{get_self(), name("active")},
    name("eosio"),
    name("buyrambytes"),
    std::make_tuple(get_self(), account, ram_bytes)
  ).send();
}
